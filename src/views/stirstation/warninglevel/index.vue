<template>
    <div class="p-2">
        <el-card shadow="never">
            <template #header>
                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <span style="font-weight:500">预警等级人员管理</span>
                    </el-col>
                </el-row>
            </template>

            <el-table v-loading="loading" :data="materialsList">
                <el-table-column label="预警等级id" align="center" prop="id" v-if="false" />
                <el-table-column label="预警等级" align="center" prop="warninglevel" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template #default="scope">
                        <el-tooltip content="修改" placement="top">
                            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                                v-hasPermi="['materials:materials:edit']"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
                v-model:limit="queryParams.pageSize" @pagination="getList" />
        </el-card>
        <!-- 添加或修改材料管理对话框 -->
        <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
            <template v-if="checkList.length > 0">
                <el-checkbox-group v-model="warningLevelList">
                    <el-checkbox v-for="item in checkList" :key="item.id" :label="item.userName"
                        @change="checkboxChange(item.userId)">
                    </el-checkbox>
                </el-checkbox-group>
            </template>
            <template v-else>
                <span>暂无数据</span>
            </template>
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
import { selectwarninglevelById } from '@/api/stirstation/warninglevel';
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
let specificationTypeOptions = ref<any>([])
const materialsList = ref<any>([
    { id: 1, warninglevel: "初级" },
    { id: 2, warninglevel: "中级" },
    { id: 3, warninglevel: "高级" },
]);
const loading = ref(true);
const checkList = ref([])
const warningLevelList = ref([]);
const total = ref(0);
const buttonLoading = ref(false);
const materialsFormRef = ref<ElFormInstance>();
const dialog = reactive<DialogOption>({
    visible: false,
    title: ''
});

const initFormData: MaterialsForm = {
    id: undefined,
}
const data = reactive<PageData<MaterialsForm, MaterialsQuery>>({
    form: { ...initFormData },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
    },
});

const { queryParams, form, rules } = toRefs(data);
const checkboxChange = (value) => {
    console.log(value);

}

/** 查询材料管理列表 */
const getList = () => {
    loading.value = true;
    console.log(materialsList._rawValue);
    total.value = materialsList._rawValue.length;
    loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
    reset();
    dialog.visible = false;
}
/** 提交按钮 */
const submitForm = () => {
    console.log(warningLevelList.value);
    //点击提交后将warningLevelList数组数据传入后端
}

/** 表单重置 */
const reset = () => {
    form.value = { ...initFormData };
    materialsFormRef.value?.resetFields();
}




/** 修改按钮操作 */
const handleUpdate = async (row?: MaterialsVO) => {
    console.log(row.id);
    //根据预警等级id查询对应的用户
    const res = await selectwarninglevelById();
    console.log(res);
    //查询列表后，根据row.id和warninglevel做判断出回显数据，并创建新数组赋值给warningLevelList
    let newWarningLevelList = res.rows.map(item => {
        if (item.warninglevelId === row.id) {
            return item.userName;
        }
    }).filter(item => item !== undefined);
    console.log(newWarningLevelList);

    warningLevelList.value = newWarningLevelList;
    checkList.value = res.rows;
    console.log(checkList.value.length);

    reset();
    dialog.visible = true;
    dialog.title = "编辑";
}



onMounted(() => {
    getList();
});
</script>