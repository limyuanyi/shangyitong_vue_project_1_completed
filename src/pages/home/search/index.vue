<template>
    <div class="search">
        <el-autocomplete
            clearable
            placeholder="請輸入醫院名稱"
            v-model="hosname"
            :fetch-suggestions="fetchData"
            :trigger-on-focus="false"
            @select="goDetail"
        />
        <el-button 
        type="primary" 
        size="default" 
        :icon="Search"
        >搜索</el-button>
    </div>
</template>

<script setup lang="ts">
//npm install @element-plus/icons-vue
//引入圖標
import { Search } from '@element-plus/icons-vue';
import {ref} from 'vue';
import {reqHospitalInfo} from '@/api/home';
import type {HospitalInfo} from '@/api/home/type';
import {useRouter} from 'vue-router';

let $router = useRouter();
let hosname =ref<string>('');

const fetchData = async (keyWord:string,cb:any) =>{
    let result:HospitalInfo = await reqHospitalInfo(keyWord);
    // console.log(result.data[0].hosname)
    let showData =result.data.map(item =>{
        return{
            value:item.hosname,//醫院名字
            hoscode:item.hoscode//醫院編碼
        }
    })
    cb(showData);//必須有value屬性，所以上面showData處理數據
    return 0;
}

//點擊search下的數據進行跳轉detail
const goDetail = (item:any) =>{
    $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}});
}
</script>

<script lang="ts">
export default {
    name:'Search',
}
</script>

<!-- 深度選擇器：>>> /deep/ ::v-deep棄用了-->

<style scoped lang="scss">
.search{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:10px 0px;
    :deep(.el-autocomplete){
        width: 600px;
        margin-right:10px;
    }

}
</style>