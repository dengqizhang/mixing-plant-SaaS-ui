<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="材料名称" prop="materialsName">
              <el-input v-model="queryParams.materialsName" placeholder="请输入材料名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="材料类型" prop="materialsType">
              <el-input v-model="queryParams.materialsType" placeholder="请输入材料名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item label="规格型号" prop="specificationType">
              <el-input v-model="queryParams.specificationType" placeholder="请输入用途" clearable
                @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
              v-hasPermi="['materials:materials:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['materials:materials:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['materials:materials:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['materials:materials:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="materialsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="材料表id" align="center" prop="id" v-if="false" />
        <el-table-column label="材料类型" align="center" prop="materialsType" />
        <el-table-column label="材料名称" align="center" prop="materialsName" />
        <el-table-column label="规格型号" align="center" prop="specificationType" />
        <el-table-column label="用途" align="center" prop="purpose" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['materials:materials:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['materials:materials:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改材料管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="materialsFormRef" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="材料类型" prop="materialsType">
          <!-- <el-input v-model="form.materialsType" placeholder="请输入材料类型" /> -->
          <el-select v-model="form.materialsType" placeholder="请选择材料类型">
            <el-option v-for="dict in specificationTypeOptions" :key="dict.dictValue" :label="dict.dictLabel"
              :value="dict.dictLabel"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材料名称" prop="materialsName">
          <el-input v-model="form.materialsName" placeholder="请输入材料名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="specificationType">
          <el-input v-model="form.specificationType" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="用途" prop="purpose">
          <el-input v-model="form.purpose" placeholder="请输入用途" />
        </el-form-item>
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

<script setup name="Materials" lang="ts">
import { listMaterials, getMaterials, delMaterials, addMaterials, updateMaterials } from '@/api/stirstation/materials';
import { MaterialsVO, MaterialsQuery, MaterialsForm } from '@/api/stirstation/materials/types';
import { getDicts } from '@/api/system/dict/data';
import { log } from 'console';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let specificationTypeOptions = ref<any>([])
const materialsList = ref<MaterialsVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const materialsFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MaterialsForm = {
  id: undefined,
  materialsType: undefined,
  materialsName: undefined,
  specificationType: undefined,
  purpose: undefined,
}
const data = reactive<PageData<MaterialsForm, MaterialsQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    materialsType: undefined,
    materialsName: undefined,
    specificationType: undefined,
    purpose: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "材料表id不能为空", trigger: "blur" }
    ],
    materialsType: [
      { required: true, message: "材料类型不能为空", trigger: "change" }
    ],
    materialsName: [
      { required: true, message: "材料名称不能为空", trigger: "blur" }
    ],
    specificationType: [
      { required: true, message: "规格型号不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询材料管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMaterials(queryParams.value);
  materialsList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  materialsFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: MaterialsVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加材料管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MaterialsVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMaterials(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改材料管理";
}

/** 提交按钮 */
const submitForm = () => {
  materialsFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMaterials(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addMaterials(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MaterialsVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除材料管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMaterials(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('materials/materials/export', {
    ...queryParams.value
  }, `materials_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
  getDicts("specification_type").then((res) => {
    specificationTypeOptions = res.data
    console.log(specificationTypeOptions);

  })
});
</script>
