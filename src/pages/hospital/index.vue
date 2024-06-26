<template>
  <div class="hospital">
    <!-- 導航區 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 醫院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('register')">
          <el-icon><icon-menu /></el-icon>
          <span>預約挂號</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('detail')">
          <el-icon><document /></el-icon>
          <span>醫院詳情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('notice')">
          <el-icon><setting /></el-icon>
          <span>預約須知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('close')">
          <el-icon><InfoFilled /></el-icon>
          <span>停診信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('search')">
          <el-icon><Search /></el-icon>
          <span>查詢/取消</span>
        </el-menu-item>


      </el-menu>
    </div>
    <div class="content">
      <!-- 子組件展示區域 -->
       <router-view></router-view>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail';
//@ts-ignore
import { HomeFilled,InfoFilled,Search,Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";

const detailStore = useDetailStore();

import {useRouter,useRoute } from 'vue-router';

const $router =useRouter();
const $route = useRoute();

const changeActive = (name:string) =>{
  $router.push({name,query:{hoscode:$route.query.hoscode as string}})
}

//組件挂載完畢，通知pinia倉庫發請求獲取醫院的數據，存在倉庫
onMounted(async()=>{
  detailStore.getHospital($route.query.hoscode as string);
  detailStore.getDepartment($route.query.hoscode as string);
  // console.log($route.query.hoscode)
})

</script>

<style scoped lang="scss">
.hospital {
  display: flex;

  .menu {
    flex: 2;
    display:flex;
    flex-direction:column;
    align-items: center;
    .top{
      color:#7f7f7f;
    }
  }

  .content {
    flex: 8;
  }
}
</style>