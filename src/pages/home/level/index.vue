<template>
    <div class="level">
        <h1>醫院</h1>
        <div class="content">
            <div class="left">等級:</div>
            <ul class="hospital">
                <li :class="{active:activeFlag==''}"
                @click="changeLevel('')">
                全部</li>
                <li 
                v-for="level in levelArr" 
                :class="{active:activeFlag==level.value}"
                :key="level.value" 
                @click="changeLevel(level.value)"> 
                {{ level.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reqHospitalLevelAndRegion} from '@/api/home/index'
import { onMounted,ref } from 'vue';
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type'

let levelArr = ref<HospitalLevelAndRegionArr>([]);

let activeFlag = ref<string>('')

const changeLevel = (level:string) =>{
    activeFlag.value=level;
    $emit('getLevel',level);
}

onMounted(()=>{
    getLevel();
})

const getLevel = async() => {
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Hostype')
    // console.log(result)
    if(result.code == 200){
        levelArr.value = result.data;
    }
};

let $emit = defineEmits(['getLevel'])
</script>

<script lang="ts">
export default {
    name:'Level'
}
</script>


<style scoped lang="scss">
.level{
    color: #7f7f7f;
    h1{
        font-weight: 900;
        margin:10px 0px;
    }
    .content{
        display:flex;
        .left{
            margin-right:10px;
        }
        .hospital{
            display:flex;
            li{
                margin-left:10px;
                &.active{
                    color: #556afe;
                }
            }
            li:hover{
                color: #556afe;
                cursor:pointer;
            }
        }
    }
}
</style>