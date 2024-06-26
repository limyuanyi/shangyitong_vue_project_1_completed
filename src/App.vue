<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
    <!-- 登錄組件 -->
     <Login v-if="userStore.visiable"></Login>
  </div>
</template>

<script setup name="App" lang="ts">
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

</script>

<style scoped lang="scss">
.container{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.content{
  margin-top:70px;
  width: 1200px;
  min-height: 700px;
  height: 100%;
}
</style>

<!-- //測試代碼
// import request from '@/utils/request';
// import {onMounted} from 'vue';

// onMounted(()=>{
//   request.get('/hosp/hospital/1/10').then(res=>{
//     console.log(res);
//   })
// }) -->