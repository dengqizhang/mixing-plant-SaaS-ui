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
                <el-checkbox-group v-model="checkboxParams" @change="checkboxChange">
                    <el-checkbox v-for="item in checkList" :key="item.index" :label="item.userId" v-model="item.userId">
                        {{ item.userName }}
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
import { selectwarninglevelById, updateWarninglevel, selectUserList } from '@/api/stirstation/warninglevel';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const materialsList = ref<any>([
    { id: 1, warninglevel: "初级" },
    { id: 2, warninglevel: "中级" },
    { id: 3, warninglevel: "高级" },
]);  //表格数据
const loading = ref(true);
const checkList = ref([]) //多选框数据数组
const total = ref(0);
const warninglevelId = ref(); //预警等级id
const buttonLoading = ref(false);
// const materialsFormRef = ref<ElFormInstance>();
let checkboxParams = ref([]) //默认项数组
const dialog = reactive<DialogOption>({
    visible: false,
    title: ''
});

const initFormData: any = {
    id: undefined,
}
const data = reactive<any>({
    form: { ...initFormData },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
    },
});

const { queryParams, form, rules } = toRefs(data);

/**
 * 多选框点击事件
 */
const checkboxChange = (value) => {
    checkboxParams.value = value;
    console.log();

}
/** 查询材料管理列表 */
const getList = () => {
    loading.value = true;
    total.value = materialsList.value.length;
    loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
    dialog.visible = false;
    // 清空默认项数组
    reset();

}
/** 提交按钮 */
const submitForm = async () => {
    // //点击提交后将checkboxParams数组转换数据传入后端
    const res = await updateWarninglevel(JSON.stringify(checkboxParams.value), warninglevelId.value);
    console.log(res);
    if (res.code === 200) {
        proxy?.$modal.msgSuccess("操作成功");
        dialog.visible = false;
        reset();
    }
}

/** 表单重置 */
const reset = () => {
    checkboxParams.value = []
}

/**
 * 修改按钮操作
 * @param row 表格当前行的id
 */
const handleUpdate = async (row?: any) => {
    console.log(row.id);
    warninglevelId.value = row.id;
    //根据预警等级id查询对应的用户
    const res = await selectUserList();
    console.log(res);
    if (checkList.value != null) {
        const warningLevelRes = await selectwarninglevelById(row.id);
        if (warningLevelRes.data) {
            let arr = JSON.parse(warningLevelRes.data)
            console.log(arr);
            checkboxParams.value = arr

        }
    }
    // 编辑弹窗设置默认项数组
    checkList.value = res.data;
    dialog.visible = true;
    dialog.title = "编辑";
}

onMounted(() => {
    getList();
});
</script>