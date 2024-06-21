<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="生产任务名称" prop="taskName" label-width="120px">
              <el-input v-model="queryParams.taskName" placeholder="请输入生产任务名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="productionTaskTime"
                type="datetimerange"
                range-separator="To"
                start-placeholder="请选择开始时间"
                end-placeholder="请选择结束时间"
                @change="productionTaskChange()"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="生产配合比" prop="productionMixproportion" label-width="120px">
              <el-select v-model="queryParams.productionMixproportion" placeholder="请选择生产配合比" value-key="label" clearable>
                <el-option v-for="item in mixproportionListValue" :key="item.label" :label="item.label" :value="item.label"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务状态" prop="taskType">
              <el-select v-model="queryParams.taskType" placeholder="请选择任务状态" value-key="label" clearable>
                <el-option v-for="item in taskTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['productionTask:productionTask:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['productionTask:productionTask:edit']"
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
              v-hasPermi="['productionTask:productionTask:remove']"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['productionTask:productionTask:export']"
              >导出</el-button
            >
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="productionTaskList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="生产任务表主键" align="center" prop="id" v-if="false" />
        <el-table-column label="生产任务名称" align="center" prop="taskName" />
        <el-table-column label="开始时间" align="center" prop="startTime" width="180"> </el-table-column>
        <el-table-column label="生产配合比" align="center" prop="productionMixproportion" />
        <el-table-column label="任务状态" align="center">
          <template #default="scope">
            {{ scope.row.taskType == 0 ? '关闭' : '开启' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button
                link
                type="primary"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['productionTask:productionTask:edit']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['productionTask:productionTask:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改生产任务对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productionTaskFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="生产任务名称" prop="taskName" label-width="120px">
          <el-input v-model="form.taskName" placeholder="请输入生产任务名称" style="width: 220px" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime" label-width="120px">
          <el-date-picker clearable v-model="form.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生产配合比" prop="productionMixproportion" label-width="120px">
          <el-select style="width: 220px" v-model="form.productionMixproportion" placeholder="请选择生产配合比" value-key="label" clearable>
            <el-option v-for="item in mixproportionListValue" :key="item.label" :label="item.label" :value="item.label"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态" prop="taskType" label-width="120px">
          <el-switch
            active-text="开启"
            inactive-text="关闭"
            :active-value="1"
            :inactive-value="0"
            v-model="form.taskType"
            @change="taskSwitchChange()"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
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

<script setup name="ProductionTask" lang="ts">
import {
  listProductionTask,
  getProductionTask,
  delProductionTask,
  addProductionTask,
  updateProductionTask,
  mixproportionList
} from '@/api/stirstation/productionTask';
import { ProductionTaskVO, ProductionTaskQuery, ProductionTaskForm } from '@/api/stirstation/productionTask/types';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const productionTaskList = ref<ProductionTaskVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const productionTaskTime = ref<[Date, Date]>([]);
const queryFormRef = ref<ElFormInstance>();
const productionTaskFormRef = ref<ElFormInstance>();
const mixproportionListValue = ref([]); //配合比列表
const taskTypeList = ref([
  //任务状态列表
  {
    value: '1',
    label: '开启'
  },
  {
    value: '0',
    label: '关闭'
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductionTaskForm = {
  id: undefined,
  taskName: undefined,
  startTime: undefined,
  productionMixproportion: undefined,
  taskType: undefined,
  endTime: undefined
};
const data = reactive<PageData<ProductionTaskForm, ProductionTaskQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    taskName: undefined,
    startTime: undefined,
    productionMixproportion: undefined,
    taskType: undefined,
    endTime: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '生产任务表主键不能为空', trigger: 'blur' }],
    taskName: [{ required: true, message: '生产任务名称不能为空', trigger: 'blur' }],
    startTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
    productionMixproportion: [{ required: true, message: '生产配合比不能为空', trigger: 'blur' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 任务状态切换事件 */
const taskSwitchChange = () => {};
/** 查询生产任务列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductionTask(queryParams.value);
  productionTaskList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 用户选定事件范围确定触发事件 */
const productionTaskChange = () => {
  queryParams.value.startTime = productionTaskTime.value[0];
  queryParams.value.endTime = productionTaskTime.value[1];
};
/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};

/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  productionTaskFormRef.value?.resetFields();
  queryParams.value.startTime = undefined;
  queryParams.value.endTime = undefined;
  productionTaskTime.value = [];
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  queryParams.value.startTime = undefined;
  queryParams.value.endTime = undefined;
  productionTaskTime.value = [];
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: ProductionTaskVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加生产任务';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductionTaskVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getProductionTask(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改生产任务';
};

/** 提交按钮 */
const submitForm = () => {
  productionTaskFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateProductionTask(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addProductionTask(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ProductionTaskVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除生产任务编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delProductionTask(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'productionTask/productionTask/export',
    {
      ...queryParams.value
    },
    `productionTask_${new Date().getTime()}.xlsx`
  );
};
/**查询配合比列表 */
const mixproportionListChange = async () => {
  const res = await mixproportionList();
  const list = res.map((item) => ({
    value: item.id,
    label: item.mixproportionName
  }));
  mixproportionListValue.value = list;
};

onMounted(() => {
  getList();
  mixproportionListChange();
});
</script>
