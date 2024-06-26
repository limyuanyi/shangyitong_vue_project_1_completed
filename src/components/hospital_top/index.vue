<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/log.png" />
                <p>尚醫通 預約挂號統一平臺</p>
            </div>
            <div class="right">
                <p class="help">幫助中心</p>
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登錄/注冊</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">實名認證</el-dropdown-item>
                            <el-dropdown-item  @click="goUser('/user/order')">挂號訂單</el-dropdown-item>
                            <el-dropdown-item  @click="goUser('/user/patient')">就診人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登錄</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue'
let $router = useRouter();
const goHome = () => {
    $router.push({ path: '/home' });
}

const login = () => {
    userStore.visiable = true
    $router.push({path:'/home'})
}

//登出
const logout = () =>{
    //通知store清除數據
    userStore.logout();
}

//下拉訂單跳轉會員中心
const goUser = (path:string) =>{
    $router.push({
        path:path
    })
}
</script>

<style scoped lang="scss">
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
}

.content {
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
        }

        p {
            font-size: 20px;
            color: #55a6fe;
        }
    }

    .right {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #bbb;

        .help {
            margin-right: 10px;
        }
    }
}
</style>