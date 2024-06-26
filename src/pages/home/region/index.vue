<template>
    <div class="region">
        <div class="content">
            <div class="left">地區:</div>
            <ul>
                <li :class="{active:RegionFlag==''}"
                @click="changeRegion('')">全部</li>
                <li v-for="region in RegionArr" 
                :class="{active:RegionFlag==region.value}"
                @click="changeRegion(region.value)"
                :key="region.value">
                {{ region.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/api/home/type'

let RegionArr =ref<HospitalLevelAndRegionArr>([]);
let RegionFlag = ref<string>('');

const changeRegion =(region:string) =>{
    RegionFlag.value = region
    $emit('getRegion',region);
}

onMounted(() => {
    getRegion();
})

const getRegion = async () => {
    let result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin");
    // console.log(result)
    if(result.code == 200){
        RegionArr.value = result.data
    }
}

let $emit = defineEmits(['getRegion']);

</script>

<script lang="ts">
export default {
    name:'Region'
}
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            margin-right: 10px;
            width: 45px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 5px;
                margin-bottom: 10px;

                &.active {
                    color: #556afe;
                }
            }

            li:hover {
                color: #556afe;
            }
        }
    }

}
</style>