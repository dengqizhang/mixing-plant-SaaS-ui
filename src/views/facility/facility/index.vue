<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter"
      :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="设备编号" prop="facilityCode">
              <el-input v-model="queryParams.facilityCode" placeholder="请输入设备编号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备名称" prop="facilityName">
              <el-input v-model="queryParams.facilityName" placeholder="请输入设备名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备规格" prop="facilitySpecification">
              <el-input v-model="queryParams.facilitySpecification" placeholder="请输入设备规格" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备标识" prop="facilityIdentifier">
              <el-input v-model="queryParams.facilityIdentifier" placeholder="请输入设备标识" clearable
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
              v-hasPermi="['facility:facility:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              v-hasPermi="['facility:facility:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              v-hasPermi="['facility:facility:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport"
              v-hasPermi="['facility:facility:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="facilityList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="设备表主键" align="center" prop="id" v-if="false" />
        <el-table-column label="设备编号" align="center" prop="facilityCode" />
        <el-table-column label="设备名称" align="center" prop="facilityName" />
        <el-table-column label="设备规格" align="center" prop="facilitySpecification" />
        <el-table-column label="设备标识" align="center" prop="facilityIdentifier" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['facility:facility:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['facility:facility:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改设备管理对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="facilityFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编号" prop="facilityCode">
          <el-input v-model="form.facilityCode" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="设备名称" prop="facilityName">
          <el-input v-model="form.facilityName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备规格" prop="facilitySpecification">
          <el-input v-model="form.facilitySpecification" placeholder="请输入设备规格" />
        </el-form-item>
        <el-form-item label="设备标识" prop="facilityIdentifier">
          <el-input v-model="form.facilityIdentifier" placeholder="请输入设备标识" />
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

<script setup name="Facility" lang="ts">
import { listFacility, getFacility, delFacility, addFacility, updateFacility } from '@/api/facility/facility';
import { FacilityVO, FacilityQuery, FacilityForm } from '@/api/facility/facility/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const facilityList = ref<FacilityVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const facilityFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: FacilityForm = {
  id: undefined,
  facilityCode: undefined,
  facilityName: undefined,
  facilitySpecification: undefined,
  facilityIdentifier: undefined
}
const data = reactive<PageData<FacilityForm, FacilityQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    facilityCode: undefined,
    facilityName: undefined,
    facilitySpecification: undefined,
    facilityIdentifier: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "设备表主键不能为空", trigger: "blur" }
    ],
    facilityCode: [
      { required: true, message: "设备编号不能为空", trigger: "blur" }
    ],
    facilityName: [
      { required: true, message: "设备名称不能为空", trigger: "blur" }
    ],
    facilityIdentifier: [
      { required: true, message: "设备标识不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询设备管理列表 */
const getList = async () => {
  loading.value = true;
  const res = await listFacility(queryParams.value);
  facilityList.value = res.rows;
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
  facilityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: FacilityVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加设备管理";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: FacilityVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getFacility(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改设备管理";
}

/** 提交按钮 */
const submitForm = () => {
  facilityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateFacility(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addFacility(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: FacilityVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除设备管理编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delFacility(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('facility/facility/export', {
    ...queryParams.value
  }, `facility_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
