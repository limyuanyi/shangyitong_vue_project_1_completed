<template>
    <div class="user">
        <!-- 導航區 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span> / 會員中心</span>
            </div>
            <el-col>
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                    <el-menu-item index="/user/certification" @click="goUser('/user/certification')">
                        <el-icon><icon-menu /></el-icon>
                        <span>實名認證</span>
                    </el-menu-item>
                    <el-menu-item index="/user/order" @click="goUser('/user/order')">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>挂號訂單</span>
                    </el-menu-item>
                    <el-menu-item index="/user/patient" @click="goUser('/user/patient')">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>就診人管理</span>
                    </el-menu-item>
                    <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>賬號信息</span>
                    </el-menu-item>
                    <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>意見反饋</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </div>
        <!-- 展示區 -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang='ts'>
//@ts-ignore
import {HomeFilled,Document,Menu as IconMenu,Setting,} from '@element-plus/icons-vue'
import {useRouter,useRoute} from 'vue-router';
let $router = useRouter();
let $route = useRoute();

const goUser = (path:string) =>{
    $router.push({
        path:path
    })
}
</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        display:flex;
        flex-direction: column;
        align-items: center;
        flex: 2;
    }

    .content {
        flex: 8;
    }
}
</style>