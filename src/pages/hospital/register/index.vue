<template>
  <div class="register">
    <div class="top">
      <div class="title"> {{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1718971097762" class="icon" viewBox="0 0 1034 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4297" width="16" height="16">
          <path
            d="M1008.64 389.12c-15.36-25.6-46.08-40.96-76.8-40.96l-204.8-5.12 46.08-199.68c15.36-61.44-25.6-122.88-87.04-138.24-46.08-10.24-97.28 10.24-122.88 51.2-10.24 15.36-20.48 35.84-25.6 51.2-5.12 10.24-5.12 15.36-10.24 25.6-20.48 56.32-51.2 107.52-92.16 148.48-35.84 30.72-76.8 46.08-117.76 56.32-10.24 5.12-20.48 5.12-30.72 5.12h-220.16c-30.72 0-51.2 25.6-51.2 51.2v563.2c0 30.72 25.6 51.2 51.2 51.2h696.32c46.08 0 81.92-25.6 97.28-66.56l168.96-471.04c5.12-20.48 0-56.32-20.48-81.92z m-783.36 563.2h-153.6v-532.48h153.6v532.48z m732.16-496.64l-168.96 471.04c-5.12 15.36-20.48 25.6-35.84 25.6h-460.8v-532.48c15.36 0 25.6-5.12 35.84-5.12 51.2-10.24 102.4-35.84 143.36-71.68 51.2-46.08 87.04-107.52 112.64-174.08 5.12-10.24 5.12-15.36 10.24-25.6 5.12-15.36 15.36-30.72 20.48-40.96 15.36-20.48 40.96-30.72 66.56-15.36 20.48 10.24 25.6 30.72 20.48 56.32l-46.08 215.04c-5.12 30.72 10.24 61.44 40.96 66.56h10.24l220.16 5.12c10.24 0 20.48 5.12 25.6 10.24 10.24 0 10.24 5.12 5.12 15.36z"
            fill="#d81e06" p-id="4298"></path>
          <path
            d="M757.76 1024h-696.32c-30.72 0-56.32-25.6-56.32-56.32v-563.2c0-30.72 25.6-56.32 56.32-56.32h225.28c10.24 0 20.48 0 30.72-5.12 40.96-10.24 81.92-30.72 117.76-56.32 40.96-40.96 71.68-92.16 92.16-148.48 5.12-10.24 5.12-15.36 10.24-25.6 5.12-20.48 15.36-35.84 25.6-51.2 25.6-46.08 76.8-66.56 128-56.32 30.72 5.12 56.32 25.6 71.68 51.2s20.48 61.44 15.36 92.16l-46.08 194.56 199.68 5.12c30.72 0 61.44 15.36 81.92 40.96 20.48 25.6 25.6 61.44 10.24 92.16l-168.96 471.04c-15.36 40.96-56.32 71.68-97.28 71.68z m-701.44-670.72c-25.6 0-51.2 20.48-51.2 51.2v563.2c0 25.6 20.48 51.2 51.2 51.2h696.32c40.96 0 81.92-25.6 92.16-66.56l168.96-471.04c10.24-30.72 5.12-61.44-10.24-87.04-15.36-25.6-46.08-40.96-76.8-40.96l-209.92-5.12 46.08-204.8c5.12-30.72 0-61.44-15.36-81.92-15.36-25.6-40.96-40.96-71.68-51.2-46.08-10.24-97.28 10.24-122.88 51.2-10.24 15.36-20.48 35.84-25.6 51.2-5.12 10.24-5.12 15.36-10.24 25.6-20.48 56.32-51.2 107.52-92.16 148.48-35.84 30.72-76.8 51.2-117.76 61.44-10.24 5.12-20.48 5.12-30.72 5.12h-220.16z m174.08 604.16h-158.72v-542.72h158.72v542.72z m-153.6-10.24h143.36v-527.36h-143.36v527.36z m680.96 10.24h-465.92v-542.72h5.12c10.24 0 25.6-5.12 35.84-5.12 51.2-10.24 102.4-35.84 143.36-71.68 51.2-46.08 87.04-107.52 107.52-174.08 0-5.12 5.12-10.24 5.12-15.36l5.12-10.24c5.12-15.36 15.36-30.72 20.48-46.08 5.12-10.24 20.48-20.48 30.72-25.6 15.36-5.12 25.6 0 40.96 5.12 20.48 10.24 30.72 35.84 25.6 56.32l-46.08 215.04c-5.12 15.36 0 30.72 5.12 40.96 10.24 10.24 20.48 20.48 35.84 25.6h10.24l220.16 5.12c10.24 0 20.48 5.12 25.6 15.36 5.12 5.12 5.12 15.36 5.12 25.6v5.12l-168.96 471.04c-10.24 15.36-25.6 25.6-40.96 25.6z m-460.8-10.24h460.8c15.36 0 25.6-10.24 30.72-20.48l168.96-465.92v-5.12c5.12-5.12 0-15.36-5.12-20.48-5.12-5.12-10.24-10.24-20.48-10.24l-220.16-5.12h-10.24c-30.72-5.12-56.32-40.96-46.08-71.68l46.08-215.04c5.12-20.48-5.12-40.96-20.48-51.2-10.24-5.12-20.48-5.12-35.84-5.12-10.24 5.12-20.48 10.24-25.6 20.48-5.12 15.36-15.36 30.72-20.48 40.96l-5.12 10.24c0 5.12-5.12 10.24-5.12 15.36-20.48 66.56-61.44 128-112.64 174.08-40.96 35.84-92.16 61.44-148.48 71.68-10.24 5.12-25.6 5.12-35.84 5.12v532.48z"
            fill="#d81e06" p-id="4299"></path>
        </svg>
        <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,`+hospitalStore.hospitalInfo.hospital?.logoData" alt="">
      </div>
      <div class="right">
        <div>挂號規則</div>
        <div class="time">
          預約周期:{{ hospitalStore.hospitalInfo.bookingRule?.cycle}}天  放號時間:{{hospitalStore.hospitalInfo.bookingRule?.releaseTime}}  停挂時間:{{hospitalStore.hospitalInfo.bookingRule?.stopTime}}
        </div>
        <div class="address">
          具體位置:{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          具體路綫:{{ hospitalStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="releaseTime">
          退號時間:就診前—工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
        </div>
        <div class="rule"> 預約挂號規則:</div>
          <div class="ruleInfo" v-for="(item,index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
            {{ item }}
          </div>
      </div>
    </div>
    <div class="department">
      <div class="leftNav">
        <ul>
          <li @click="changeIndex(index)" 
          v-for="(deparment,index) in hospitalStore.departmentArr" 
          :key="deparment.depcode"
          :class="{active:index == currentIndex}">
          {{ deparment.depname }}
          </li>
        </ul>
      </div>
      <div class="departmentInfo">
        <div class="showDepartment" 
        v-for="deparment in hospitalStore.departmentArr" 
        :key="deparment.depcode">
          <h1 class="cur">{{ deparment.depname }}</h1>
          <ul>
            <li @click="showLogin(item)" v-for="item in deparment.children" 
            :key="item.depcode">
            {{ item.depname }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail';
import { ref } from 'vue';
import {useRouter,useRoute } from 'vue-router';
let hospitalStore = useDetailStore();
let currentIndex =ref<number>(0);

let $router = useRouter();
let $route = useRoute();//獲取路由對象
const changeIndex = (index:number) =>{
  currentIndex.value=index
  let allH1 = document.querySelectorAll('.cur');
  //滾動到對應位置
  allH1[currentIndex.value].scrollIntoView({
    behavior:'smooth',//過渡動畫
    block:'start'
  });
}

const showLogin = (item:any) =>{
  //點擊進入科室預約挂號詳情頁面 
  //item:選中科室
  $router.push({
    path:'/hospital/register_step1',
    query:{
      hoscode:$route.query.hoscode,
      depcode:item.depcode
  }})
}
</script>

<style scoped lang="scss">
.register {
  .top {
    display: flex;
    .title{
      font-size:30px;
      font-weight: 900;
    }
    .level{
      color:#7f7f7f;
      margin-left:10px;
      height:40px;
      align-items: center;
      line-height: 40px;
      span{
        margin-left:5px;
      }
    }
  }
  .content{
    display:flex;
    margin-top:20px;
    .left{
      width: 80px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right{
      flex:1;
      font-size:14px;
      margin-left:20px;
      .time,.address,.route,.releaseTime,.ruleInfo{
        margin-top:10px;
        color:#7f7f7f;
      }
      .rule{
        margin:10px 0px;
      }
    }
  }
  .department{
    width: 100%;
    height: 500px;
    display:flex;
    margin-top: 20px;
    .leftNav{
      width: 80px;
      height: 100%;
      ul{
        width: 100px;
        height: 100%;
        background-color: rgb(248,248,248);
        display:flex;
        flex-direction:column;
        li{
          flex:1;
          text-align: center;
          color:#7f7f7f;
          font-size: 14px;
          line-height: 30px;
          &.active{
            border-left:2px solid red;
            color:red;
            background-color: white;
          }
        }
      }
    }
    .departmentInfo{
      flex:1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar{
        display:none;
      }
      .showDepartment{
        h1{
          background-color: rgb(248,248,248);
          color:#7f7f7f;
        }
        ul{
          display:flex;
          flex-wrap: wrap;
          li{
            width: 33%;
            color:#7f7f7f;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>