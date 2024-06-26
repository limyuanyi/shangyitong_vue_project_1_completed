<template>
    <div class="container">
        <h1 class="tip">確認挂號信息</h1>
        <!-- 用於展示就診人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>請選擇就診人</span>
                    <el-button type="primary" size="default" :icon="User"
                    @click="goUser">添加就診人 </el-button>
                </div>
            </template>
            <!--  展示就診人信息-->
            <div class="user">
                <Visitor v-for="(user, index) in userArr" :key="user.id" :user="user" class="item"
                    @click="changeIndex(index)" :index="index" :currentIndex="currentIndex"></Visitor>
            </div>
        </el-card>
        <!-- 展示醫生信息 -->
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>挂號信息</span>
                </div>
            </template>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就診日期
                        </div>
                    </template>
                    {{ doctorInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就診醫院
                        </div>
                    </template>
                    {{ doctorInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就診科室
                        </div>
                    </template>
                    {{ doctorInfo.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            醫生姓名
                        </div>
                    </template>
                    {{ doctorInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            醫生職稱
                        </div>
                    </template>
                    {{ doctorInfo.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            醫生專長
                        </div>
                    </template>
                    {{ doctorInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            醫生服務費
                        </div>
                    </template>
                    <span style="color:red;">{{ doctorInfo.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 確定挂號按鈕 -->
        <div class="btn">
            <el-button type="primary" size="default" :disabled="currentIndex == -1 ? true : false"
                @click="submitOrder">確認挂號</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { reqGetUser, reqDoctorInfo } from '@/api/hospital';
import { reqSubmitOrder } from '@/api/user';
import type { SubmitOrder } from '@/api/user/type';
import type { UserResponseData, UserArr, DoctorInfoResponseData } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

let userArr = ref<UserArr>([]);
let doctorInfo = ref<any>({});
let $route = useRoute();
let $router = useRouter();

onMounted(() => {
    fetchUserData();
    //排班醫生
    fetchInfo();
});

const fetchUserData = async () => {
    let result: UserResponseData = await reqGetUser();
    // console.log(result);
    if (result.code == 200) {
        userArr.value = result.data;
    }
}
//排班醫生
const fetchInfo = async () => {
    let result: DoctorInfoResponseData = await reqDoctorInfo($route.query.docId as string);
    // console.log(result);
    if (result.code == 200) {
        doctorInfo.value = result.data;
    }
}

let currentIndex = ref<number>(-1);

const changeIndex = (index: number) => {
    currentIndex.value = index;
}

//確認挂號按鈕
const submitOrder = async () => {
    let hoscode = doctorInfo.value.hoscode;
    let scheduleId = doctorInfo.value.id;
    let patientId = userArr.value[currentIndex.value].id;
    let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId);
    // console.log(result)
    if (result.code == 200) {
        $router.push({
            path: '/user/order',
            query: {
                orderId: result.data,
            }
        })
    } else {
        ElMessage({
            type: 'error',
            message: result.message
        })
    }
}

//添加就診人按鈕
const goUser = () =>{
    $router.push({
        path:'/user/patient',
        query:{
            type:'add'
        }
    })
}
</script>

<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .box-card {
        margin: 20px 0px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 5px;
            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 10px 0px;
    }
}
</style>