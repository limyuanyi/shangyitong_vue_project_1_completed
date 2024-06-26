<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ user.isInsure == 1 ? '醫保' : '自費' }}</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button circle type="primary" size="default" :icon="Edit" @click="handler"></el-button>
                <el-popconfirm :title="`確定要刪除${user.name}嗎？`" width="200px" @confirm="removeUser" >
                    <template #reference>
                        <el-button v-if="$route.path == '/user/patient'" circle type="danger" size="default"
                            :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="bottom">
            <p>證件類型：{{ user.param.certificatesTypeString }}</p>
            <p>證件號碼：{{ user.certificatesNo }}</p>
            <p>用戶性別：{{ user.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期：{{ user.birthdate }}</p>
            <p>手機號碼：{{ user.phone }}</p>
            <p>婚姻狀況：{{ user.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>當前住址：{{ user.param.cityString }}</p>
            <p>詳細地址：{{ user.param.fullAddress }}</p>
            <transition name="comfirm">
                <div class="comfirm" v-if="index === currentIndex">已選擇</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { Edit, Delete } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { reqRemoveUser } from '@/api/user';
import { ElMessage } from 'element-plus';
let $route = useRoute();
let $router = useRouter();
let props = defineProps(['user', 'index', 'currentIndex']);
let $emit = defineEmits(['changeScene', 'removeUser']);

//更新按鈕
const handler = () => {
    //判斷情況，從哪裏按的按鈕？(預約挂號，就診人管理)
    if ($route.path == '/user/patient') {
        $emit('changeScene', props.user)
    } else {
        $router.push({
            path: '/user/patient',
            query: {
                type: 'edit',
                id: props.user.id
            }
        })
    }
}

//刪除用戶
const removeUser = async () => {
    try {
        await reqRemoveUser(props.user.id);
        ElMessage({
            type: 'success',
            message: '成功刪除'
        })
        $emit('removeUser')
    } catch (error) {
        ElMessage({ type: 'error', message: '删除失败' })
    }
}
</script>

<style scoped lang="scss">
.visitor {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .top {
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .left {
            .free {
                background-color: white;
                padding: 5px;
                font-size: 12px;
                margin-right: 5px;
                border-radius: 10px;
            }

            .username {
                color: #7f7f7f;
            }
        }

    }

    .bottom {
        position: relative;
        padding-left: 50px;

        p {
            line-height: 40px;
        }

        .comfirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top: 20%;
            opacity: 0.5;
            transform: rotate(35deg);
            font-weight: 900;
        }

        .comfirm-enter-from {
            transform: scale(1);
        }

        .comfirm-enter-active {
            transition: all 0.3s;
        }

        .comfirm-enter-to {
            transform: scale(1.2);
        }
    }
}
</style>