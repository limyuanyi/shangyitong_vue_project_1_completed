<template>
  <div>
    <Carousel></Carousel>
    <Search></Search>
    <el-row :gutter="20">
      <el-col :span="20">
        <Level @getLevel="getLevel"></Level>
        <Region @getRegion="getRegion"></Region>
        <div class="hospital" v-if="hasHospitalArr.length>0">
          <Card class='item' v-for="(item,index) in hasHospitalArr" :key="index" :hospitalInfo="item"></Card>
        </div>
        <el-empty v-else description="暫無數據"/>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total "
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">
        <Tip></Tip>
      </el-col>
    </el-row>
   </div>
</template>

<script setup lang="ts">
import {onMounted,ref} from 'vue';
import {reqHospital} from '@/api/home'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
//@ts-ignore
import Card from './card/index.vue'
import Tip from './tip/index.vue'
import type {Content,HospitalResponseData} from '@/api/home/type'

let pageNo =ref<number>(1);
let pageSize = ref<number>(10);
let hasHospitalArr = ref<Content>([]);
let total = ref<number>(0);
let hostype=ref<string>('');
let districtCode = ref<string>('');


onMounted(()=>{
  getHosipitalInfo();
})

//獲取已有的醫院數據
const getHosipitalInfo = async()=>{
  let result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
  // console.log(result)
  if(result.code==200){
    hasHospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
    // console.log(hasHospitalArr.value);
    // console.log(total.value)
  }
};

const currentChange =() =>{
  getHosipitalInfo();
};

const sizeChange = () =>{
  pageNo.value= 1;
  getHosipitalInfo();
}

const getLevel = (level:string) =>{
  hostype.value=level;
  getHosipitalInfo();
}

const getRegion = (region:string) =>{
  districtCode.value = region;
  getHosipitalInfo();
}
</script>

<style scoped lang="scss">
.hospital{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 48%;
    margin:10px 0px;
  }
}

</style>