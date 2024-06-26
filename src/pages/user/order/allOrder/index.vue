<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>挂號訂單</span>
        </div>
      </template>
      <el-form :inline="true">
        <el-form-item label="就診人" style="width: 300px;">
          <el-select placeholder="請選擇就診人" v-model="patientId" @change="changeUser">
            <el-option label="請選擇全部就診人" value=""></el-option>
            <el-option v-for="item in allUser" :key="item.id"
            :label="item.id" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="訂單狀態" style="width: 300px;">
          <el-select placeholder="請選擇訂單狀態" v-model="orderStatus" @change="changeOrderState">
            <el-option label="全部訂單" value=""></el-option>
            <el-option v-for="(item,index) in allOrderState" :key="index"
            :label="item.comment" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 表格展示 -->
      <el-table border style="margin:10px 0px;" :data="allOrderArr">
        <el-table-column label="就診時間" prop="reserveDate"></el-table-column>
        <el-table-column label="醫院" prop="hosname"></el-table-column>
        <el-table-column label="科室" prop="depname"></el-table-column>
        <el-table-column label="醫生" prop="title"></el-table-column>
        <el-table-column label="服務費" prop="amount"></el-table-column>
        <!-- 原本是patientName 但是名字不對patientId -->
        <el-table-column label="就診人" prop="patientId"></el-table-column>
        <el-table-column label="訂單狀態" prop="param.orderStatusString"></el-table-column>
        <el-table-column label="操作">
          <!-- row代表已有的訂單 -->
          <template #="{row}">
            <el-button :key="button.text" :type="button.type" link  @click="goDetail(row)"> {{ button.text }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" 
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]" 
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes," 
        :total="total" 
        @current-change="handler"
        @size-change="pageSizeHandler"
        />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reqUserOrderInfo,reqAllUser,reqOrderState} from '@/api/user';
import { onMounted,ref } from 'vue';
import type {
  AllUser,
  AllUserResponseData,
  AllOrderState,
  AllOrderStateResponseData,
  UserOrderInfoResponseData,
  Records} from '@/api/user/type'
import {useRouter} from 'vue-router';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let patientId = ref<string>('');
let orderStatus = ref<string>('');

let allOrderArr = ref<Records>([]);
let total = ref<number>(0);

let $router = useRouter();
onMounted(()=>{
  getOrderInfo();
  getData();
})

const getOrderInfo = async () =>{
  let result:UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value,pageSize.value,patientId.value,orderStatus.value);
  // console.log(result)
  if(result.code == 200){
    allOrderArr.value = result.data.records;
    total.value=result.data.total;
  }
}

//詳情按鈕
const button = {type:'primary',text:'詳情'}

const goDetail = (row:any) =>{
  $router.push({
    path:'/user/order',
    query:{
      orderId:row.id
    }
  })
}

//分頁器
const handler = (pager:number) =>{
  pageNo.value =pager;
  getOrderInfo();
}
const pageSizeHandler = (pageSizes:number) =>{
  pageSize.value=pageSizes;
  getOrderInfo();
}

//獲取就診人及訂單
let allUser = ref<AllUser>([]);
let allOrderState = ref<AllOrderState>([]);
const getData = async() =>{
  const result:AllUserResponseData = await reqAllUser();
  if(result.code==200){
    allUser.value = result.data;
  }
  const result_1:AllOrderStateResponseData = await reqOrderState();
  if(result_1.code == 200){
    allOrderState.value = result_1.data
  }
  // console.log(result,result_1)
}

//就診人下拉菜單發生變化
const changeUser = () =>{
  //根據就診人信息再次獲取數據
  getOrderInfo();
}

const changeOrderState = () =>{
  getOrderInfo();
}
</script>

<style scoped lang="scss"></style>