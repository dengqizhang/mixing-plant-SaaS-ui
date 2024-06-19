<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="配合比名称" prop="mixproportionName" label-width="110px">
              <el-input v-model="queryParams.mixproportionName" placeholder="请输入配合比名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="混合料名称" prop="hybridmateriaName" label-width="100px">
              <el-select v-model="queryParams.hybridmateriaName" placeholder="请选择混合料" value-key="label" clearable>
                <el-option v-for="item in hybridmateriaSelectList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="施工部位" prop="constructionAddress">
              <el-select v-model="queryParams.constructionAddress" placeholder="请选择施工部位" value-key="label" clearable>
                <el-option v-for="item in constructionSite" :key="item.label" :label="item.label" :value="item.label"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备" prop="facility">
              <el-select v-model="queryParams.facility" placeholder="请选择设备" value-key="label" clearable>
                <el-option v-for="item in FacilitySelectList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['mixproportion:mixproportion:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['mixproportion:mixproportion:edit']"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="Delete"
              :disabled="multiple"
              @click="handleDelete()"
              v-hasPermi="['mixproportion:mixproportion:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['mixproportion:mixproportion:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="mixproportionList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="生产配合比表主键" align="center" prop="id" v-if="false" />
        <el-table-column label="配合比名称" align="center" prop="mixproportionName" />
        <el-table-column label="混合料名称" align="center" prop="hybridmateriaName" />
        <el-table-column label="施工部位" align="center" prop="constructionAddress" />
        <el-table-column label="设备" align="center" prop="facility" />
        <!-- <el-table-column label="胶凝1仓材料" align="center" prop="jnMaterialsOne" /> -->
        <el-table-column label="胶凝1仓配合比" align="center" prop="jnWeightOne" />
        <!-- <el-table-column label="胶凝2仓材料" align="center" prop="jnMaterialsTwo" /> -->
        <el-table-column label="胶凝2仓配合比" align="center" prop="jnWeightTwo" />
        <!-- <el-table-column label="胶凝3仓材料" align="center" prop="jnMaterialsThree" /> -->
        <el-table-column label="胶凝3仓配合比" align="center" prop="jnWeightThree" />
        <!-- <el-table-column label="胶凝4仓材料" align="center" prop="jnMaterialsFour" /> -->
        <el-table-column label="胶凝4仓配合比" align="center" prop="jnWeightFour" />
        <!-- <el-table-column label="胶凝5仓材料" align="center" prop="jnMaterialsFive" /> -->
        <el-table-column label="胶凝5仓配合比" align="center" prop="jnWeightFive" />
        <!-- <el-table-column label="胶凝6仓材料" align="center" prop="jnMaterialsSix" /> -->
        <el-table-column label="胶凝6仓配合比" align="center" prop="jnWeightSix" />
        <!-- <el-table-column label="胶凝7仓材料" align="center" prop="jnMaterialsSeven" /> -->
        <el-table-column label="胶凝7仓配合比" align="center" prop="jnWeightSeven" />
        <!-- <el-table-column label="胶凝8仓材料" align="center" prop="jnMaterialsEight" /> -->
        <el-table-column label="胶凝8仓配合比" align="center" prop="jnWeightEight" />
        <!-- <el-table-column label="骨料1仓材料" align="center" prop="glMaterialsOne" /> -->
        <el-table-column label="骨料1仓配合比" align="center" prop="glWeightOne" />
        <!-- <el-table-column label="骨料2仓材料" align="center" prop="glMaterialsTwo" /> -->
        <el-table-column label="骨料2仓配合比" align="center" prop="glWeightTwo" />
        <!-- <el-table-column label="骨料3仓材料" align="center" prop="glMaterialsThree" /> -->
        <el-table-column label="骨料3仓配合比" align="center" prop="glWeightThree" />
        <!-- <el-table-column label="骨料4仓材料" align="center" prop="glMaterialsFour" /> -->
        <el-table-column label="骨料4仓配合比" align="center" prop="glWeightFour" />
        <!-- <el-table-column label="骨料5仓材料" align="center" prop="glMaterialsFive" /> -->
        <el-table-column label="骨料5仓配合比" align="center" prop="glWeightFive" />
        <!-- <el-table-column label="骨料6仓材料" align="center" prop="glMaterialsSix" /> -->
        <el-table-column label="骨料6仓配合比" align="center" prop="glWeightSix" />
        <!-- <el-table-column label="外加剂1仓材料" align="center" prop="wjjMaterialsOne" /> -->
        <el-table-column label="外加剂1仓配合比" align="center" prop="wjjWeightOne" />
        <!-- <el-table-column label="外加剂2仓材料" align="center" prop="wjjMaterialsTwo" /> -->
        <el-table-column label="外加剂2仓配合比" align="center" prop="wjjWeightTwo" />
        <!-- <el-table-column label="水1仓材料" align="center" prop="waterMaterialsOne" /> -->
        <el-table-column label="水1仓配合比" align="center" prop="waterWeightOne" />
        <!-- <el-table-column label="水2仓材料" align="center" prop="waterMaterialsTwo" /> -->
        <el-table-column label="水2仓配合比" align="center" prop="waterWeightTwo" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button
                link
                type="primary"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['mixproportion:mixproportion:edit']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['mixproportion:mixproportion:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改生产配合比对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="1200px" append-to-body>
      <el-form ref="mixproportionFormRef" :model="form" :rules="rules" label-width="80px">
        <h2 style="text-align: center; font-weight: 550">基本信息</h2>
        <div style="display: flex; justify-content: center">
          <div>
            <div>
              <el-form-item label="配合比名称" prop="mixproportionName" label-width="120px">
                <el-input v-model="form.mixproportionName" placeholder="请输入配合比名称" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="混合料名称" prop="hybridmateriaName" label-width="120px">
                <el-select style="width: 190px" v-model="form.hybridmateriaName" placeholder="请选择混合料" value-key="label" clearable>
                  <el-option v-for="item in hybridmateriaSelectList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div>
            <div>
              <el-form-item label="施工部位" prop="constructionAddress" label-width="120px">
                <el-select style="width: 190px" v-model="form.constructionAddress" placeholder="请选择施工部位" value-key="label" clearable>
                  <el-option v-for="item in constructionSite" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="设备" prop="facility" label-width="120px">
                <el-select style="width: 190px" v-model="form.facility" placeholder="请选择设备" value-key="label" clearable>
                  <el-option v-for="item in FacilitySelectList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <!-- 胶凝仓 -->
          <div>
            <h2 style="text-align: center; font-weight: 550">凝胶仓设置</h2>
            <div style="display: flex">
              <el-form-item label="胶凝1仓材料" prop="jnMaterialsOne" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsOne" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝1仓重量" prop="jnWeightOne" label-width="120px">
                <el-input-number v-model="form.jnWeightOne" controls-position="right" min="0" placeholder="请输入胶凝1仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝2仓材料" prop="jnMaterialsTwo" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsTwo" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝2仓重量" prop="jnWeightTwo" label-width="120px">
                <el-input-number v-model="form.jnWeightTwo" controls-position="right" min="0" placeholder="请输入胶凝2仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝3仓材料" prop="jnMaterialsThree" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsThree" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝3仓重量" prop="jnWeightThree" label-width="120px">
                <el-input-number v-model="form.jnWeightThree" controls-position="right" min="0" placeholder="请输入胶凝3仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝4仓材料" prop="jnMaterialsFour" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsFour" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝4仓重量" prop="jnWeightFour" label-width="120px">
                <el-input-number v-model="form.jnWeightFour" controls-position="right" min="0" placeholder="请输入胶凝4仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝5仓材料" prop="jnMaterialsFive" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsFive" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝5仓重量" prop="jnWeightFive" label-width="120px">
                <el-input-number v-model="form.jnWeightFive" controls-position="right" min="0" placeholder="请输入胶凝5仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝6仓材料" prop="jnMaterialsSix" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsSix" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝6仓重量" prop="jnWeightSix" label-width="120px">
                <el-input-number v-model="form.jnWeightSix" controls-position="right" min="0" placeholder="请输入胶凝6仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝7仓材料" prop="jnMaterialsSeven" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsSeven" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝7仓重量" prop="jnWeightSeven" label-width="120px">
                <el-input-number v-model="form.jnWeightSeven" controls-position="right" min="0" placeholder="请输入胶凝7仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="胶凝8仓材料" prop="jnMaterialsEight" label-width="120px">
                <el-select style="width: 150px" v-model="form.jnMaterialsEight" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalJnList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胶凝8仓重量" prop="jnWeightEight" label-width="120px">
                <el-input-number v-model="form.jnWeightEight" controls-position="right" min="0" placeholder="请输入胶凝8仓重量" precision="2" />
              </el-form-item>
            </div>
          </div>
          <!-- 骨料仓 -->
          <div>
            <h2 style="text-align: center; font-weight: 550">骨料仓设置</h2>
            <div style="display: flex">
              <el-form-item label="骨料1仓材料" prop="glMaterialsOne" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsOne" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料1仓重量" prop="glWeightOne" label-width="120px">
                <el-input-number v-model="form.glWeightOne" controls-position="right" min="0" placeholder="请输入骨料1仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="骨料2仓材料" prop="glMaterialsTwo" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsTwo" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料2仓重量" prop="glWeightTwo" label-width="120px">
                <el-input-number v-model="form.glWeightTwo" controls-position="right" min="0" placeholder="请输入骨料2仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="骨料3仓材料" prop="glMaterialsThree" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsThree" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料3仓重量" prop="glWeightThree" label-width="120px">
                <el-input-number v-model="form.glWeightThree" controls-position="right" min="0" placeholder="请输入骨料3仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="骨料4仓材料" prop="glMaterialsFour" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsFour" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料4仓重量" prop="glWeightFour" label-width="120px">
                <el-input-number v-model="form.glWeightFour" controls-position="right" min="0" placeholder="请输入骨料4仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="骨料5仓材料" prop="glMaterialsFive" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsFive" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料5仓重量" prop="glWeightFive" label-width="120px">
                <el-input-number v-model="form.glWeightFive" controls-position="right" min="0" placeholder="请输入骨料5仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="骨料6仓材料" prop="glMaterialsSix" label-width="120px">
                <el-select style="width: 150px" v-model="form.glMaterialsSix" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalGlList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="骨料6仓重量" prop="glWeightSix" label-width="120px">
                <el-input-number v-model="form.glWeightSix" controls-position="right" min="0" placeholder="请输入骨料6仓重量" precision="2" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <!-- 外加剂仓 -->
          <div>
            <h2 style="text-align: center; font-weight: 550">外加剂仓设置</h2>
            <div style="display: flex">
              <el-form-item label="外加剂1仓材料" prop="wjjMaterialsOne" label-width="120px">
                <el-select style="width: 150px" v-model="form.wjjMaterialsOne" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalWjjList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外加剂1仓重量" prop="wjjWeightOne" label-width="120px">
                <el-input-number v-model="form.wjjWeightOne" controls-position="right" min="0" placeholder="请输入外加剂1仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="外加剂2仓材料" prop="wjjMaterialsTwo" label-width="120px">
                <el-select style="width: 150px" v-model="form.wjjMaterialsTwo" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalWjjList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外加剂2仓重量" prop="wjjWeightTwo" label-width="120px">
                <el-input-number v-model="form.wjjWeightTwo" controls-position="right" min="0" placeholder="请输入外加剂2仓重量" precision="2" />
              </el-form-item>
            </div>
          </div>
          <!-- 水仓 -->
          <div>
            <h2 style="text-align: center; font-weight: 550">水仓设置</h2>
            <div style="display: flex">
              <el-form-item label="水1仓材料" prop="waterMaterialsOne" label-width="120px">
                <el-select style="width: 150px" v-model="form.waterMaterialsOne" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalWaterList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="水1仓重量" prop="waterWeightOne" label-width="120px">
                <el-input-number v-model="form.waterWeightOne" controls-position="right" min="0" placeholder="请输入水1仓重量" precision="2" />
              </el-form-item>
            </div>
            <div style="display: flex">
              <el-form-item label="水2仓材料" prop="waterMaterialsTwo" label-width="120px">
                <el-select style="width: 150px" v-model="form.waterMaterialsTwo" placeholder="选择材料" value-key="label" clearable>
                  <el-option v-for="item in globalWaterList" :key="item.label" :label="item.label" :value="item.label"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="水2仓重量" prop="waterWeightTwo" label-width="120px">
                <el-input-number v-model="form.waterWeightTwo" controls-position="right" min="0" placeholder="请输入水2仓重量" precision="2" />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Mixproportion" lang="ts">
import { listMixproportion, getMixproportion, delMixproportion, addMixproportion, updateMixproportion } from '@/api/stirstation/mixproportion';
import { MixproportionVO, MixproportionQuery, MixproportionForm } from '@/api/stirstation/mixproportion/types';
import { listHybridmateria } from '@/api/stirstation/hybridmateria';
import { listMaterials } from '@/api/stirstation/materials';
import { listFacility } from '@/api/stirstation/facility';
import { getDicts } from '@/api/system/dict/data';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const mixproportionList = ref<MixproportionVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const hybridmateriaSelectValue = ref(''); //混合料多选框值
const hybridmateriaSelectList = ref([]); //混合料多选框列表
const FacilitySelectValue = ref(''); //设备多选框值
const FacilitySelectList = ref([]); //设备多选框列表
const constructionSite = ref([]); // 施工部位字典列表
const globalGlList = ref([]); //骨料列表
const globalWjjList = ref([]); //外加剂材料列表
const globalWaterList = ref([]); //水材料列表
const globalJnList = ref([]); //胶凝材料列表
const queryFormRef = ref<ElFormInstance>();
const mixproportionFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MixproportionForm = {
  id: undefined,
  mixproportionName: undefined,
  hybridmateriaName: undefined,
  constructionAddress: undefined,
  facility: undefined,
  jnMaterialsOne: undefined,
  jnWeightOne: undefined,
  jnMaterialsTwo: undefined,
  jnWeightTwo: undefined,
  jnMaterialsThree: undefined,
  jnWeightThree: undefined,
  jnMaterialsFour: undefined,
  jnWeightFour: undefined,
  jnMaterialsFive: undefined,
  jnWeightFive: undefined,
  jnMaterialsSix: undefined,
  jnWeightSix: undefined,
  jnMaterialsSeven: undefined,
  jnWeightSeven: undefined,
  jnMaterialsEight: undefined,
  jnWeightEight: undefined,
  glMaterialsOne: undefined,
  glWeightOne: undefined,
  glMaterialsTwo: undefined,
  glWeightTwo: undefined,
  glMaterialsThree: undefined,
  glWeightThree: undefined,
  glMaterialsFour: undefined,
  glWeightFour: undefined,
  glMaterialsFive: undefined,
  glWeightFive: undefined,
  glMaterialsSix: undefined,
  glWeightSix: undefined,
  wjjMaterialsOne: undefined,
  wjjWeightOne: undefined,
  wjjMaterialsTwo: undefined,
  wjjWeightTwo: undefined,
  waterMaterialsOne: undefined,
  waterWeightOne: undefined,
  waterMaterialsTwo: undefined,
  waterWeightTwo: undefined
};
const data = reactive<PageData<MixproportionForm, MixproportionQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    mixproportionName: undefined,
    hybridmateriaName: undefined,
    constructionAddress: undefined,
    facility: undefined,
    jnMaterialsOne: undefined,
    jnWeightOne: undefined,
    jnMaterialsTwo: undefined,
    jnWeightTwo: undefined,
    jnMaterialsThree: undefined,
    jnWeightThree: undefined,
    jnMaterialsFour: undefined,
    jnWeightFour: undefined,
    jnMaterialsFive: undefined,
    jnWeightFive: undefined,
    jnMaterialsSix: undefined,
    jnWeightSix: undefined,
    jnMaterialsSeven: undefined,
    jnWeightSeven: undefined,
    jnMaterialsEight: undefined,
    jnWeightEight: undefined,
    glMaterialsOne: undefined,
    glWeightOne: undefined,
    glMaterialsTwo: undefined,
    glWeightTwo: undefined,
    glMaterialsThree: undefined,
    glWeightThree: undefined,
    glMaterialsFour: undefined,
    glWeightFour: undefined,
    glMaterialsFive: undefined,
    glWeightFive: undefined,
    glMaterialsSix: undefined,
    glWeightSix: undefined,
    wjjMaterialsOne: undefined,
    wjjWeightOne: undefined,
    wjjMaterialsTwo: undefined,
    wjjWeightTwo: undefined,
    waterMaterialsOne: undefined,
    waterWeightOne: undefined,
    waterMaterialsTwo: undefined,
    waterWeightTwo: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '生产配合比表主键不能为空', trigger: 'blur' }],
    mixproportionName: [{ required: true, message: '配合比名称不能为空', trigger: 'blur' }],
    hybridmateriaName: [{ required: true, message: '混合料名称不能为空', trigger: 'blur' }],
    constructionAddress: [{ required: true, message: '施工部位不能为空', trigger: 'blur' }],
    facility: [{ required: true, message: '设备不能为空', trigger: 'blur' }],
    jnWeightOne: [{ required: true, message: '胶凝1仓重量不能为空', trigger: 'blur' }],
    jnWeightTwo: [{ required: true, message: '胶凝2仓重量不能为空', trigger: 'blur' }],
    jnWeightThree: [{ required: true, message: '胶凝3仓重量不能为空', trigger: 'blur' }],
    jnWeightFour: [{ required: true, message: '胶凝4仓重量不能为空', trigger: 'blur' }],
    jnWeightFive: [{ required: true, message: '胶凝5仓重量不能为空', trigger: 'blur' }],
    jnWeightSix: [{ required: true, message: '胶凝6仓重量不能为空', trigger: 'blur' }],
    jnWeightSeven: [{ required: true, message: '胶凝7仓重量不能为空', trigger: 'blur' }],
    jnWeightEight: [{ required: true, message: '胶凝8仓重量不能为空', trigger: 'blur' }],
    glWeightOne: [{ required: true, message: '骨料1仓重量不能为空', trigger: 'blur' }],
    glWeightTwo: [{ required: true, message: '骨料2仓重量不能为空', trigger: 'blur' }],
    glWeightThree: [{ required: true, message: '骨料3仓重量不能为空', trigger: 'blur' }],
    glWeightFour: [{ required: true, message: '骨料4仓重量不能为空', trigger: 'blur' }],
    glWeightFive: [{ required: true, message: '骨料5仓重量不能为空', trigger: 'blur' }],
    glWeightSix: [{ required: true, message: '骨料6仓重量不能为空', trigger: 'blur' }],
    wjjWeightOne: [{ required: true, message: '外加剂1仓重量不能为空', trigger: 'blur' }],
    wjjWeightTwo: [{ required: true, message: '外加剂2仓重量不能为空', trigger: 'blur' }],
    waterWeightOne: [{ required: true, message: '水1仓重量不能为空', trigger: 'blur' }],
    waterWeightTwo: [{ required: true, message: '水2仓重量不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询生产配合比列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMixproportion(queryParams.value);
  mixproportionList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};
/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  mixproportionFormRef.value?.resetFields();
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: MixproportionVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '新增';
  getMaterialsList();
};
/**获取设备列表 */
const getFacilityList = async () => {
  const res = await listFacility();
  const newArray = res.rows.map((item) => {
    return {
      value: item.id,
      label: item.facilityName
    };
  });
  FacilitySelectList.value = newArray;
};
//获取混合料列表
const gethybridmateriaList = async () => {
  const res = await listHybridmateria();
  const newArray = res.rows.map((item) => {
    return {
      value: item.id,
      label: item.hybridmateriaName
    };
  });
  hybridmateriaSelectList.value = newArray;
};
/** 获取所有材料 */
const getMaterialsList = async () => {
  const res = await listMaterials();
  console.log(res);
  //骨料材料数组
  const glList = res.rows
    .filter((item) => item.materialsType === '骨料')
    .map((item) => ({
      value: item.id,
      label: item.materialsName
    }));
  //胶凝材料数组
  const jnList = res.rows
    .filter((item) => item.materialsType === '胶凝材料')
    .map((item) => ({
      value: item.id,
      label: item.materialsName
    }));
  //水材料数组
  const wjjList = res.rows
    .filter((item) => item.materialsType === '水材料')
    .map((item) => ({
      value: item.id,
      label: item.materialsName
    }));
  //外加剂材料数组
  const waterList = res.rows
    .filter((item) => item.materialsType === '外加剂材料')
    .map((item) => ({
      value: item.id,
      label: item.materialsName
    }));
  globalGlList.value = glList;
  globalWjjList.value = wjjList;
  globalWaterList.value = waterList;
  globalJnList.value = jnList;
};

/** 修改按钮操作 */
const handleUpdate = async (row?: MixproportionVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getMixproportion(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改生产配合比';
  getMaterialsList();
};

/** 提交按钮 */
const submitForm = () => {
  mixproportionFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMixproportion(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addMixproportion(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: MixproportionVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除生产配合比编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delMixproportion(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'mixproportion/mixproportion/export',
    {
      ...queryParams.value
    },
    `mixproportion_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  getList();
  gethybridmateriaList(); //获取混合料列表
  getFacilityList(); //获取设备列表
  //获取施工部位的字典数据列表
  getDicts('stirstation_mixproportion_constructionsite').then((res) => {
    const newArray = res.data.map((item) => {
      return {
        value: item.dictValue,
        label: item.dictLabel
      };
    });
    constructionSite.value = newArray;
  });
});
</script>
