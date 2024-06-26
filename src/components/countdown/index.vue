<template>
  <div>
    <span>獲取驗證碼({{ time }}s)</span>
  </div>
</template>

<script setup lang="ts">
import {ref,watch} from 'vue';
let time = ref<number>(5);

let props = defineProps(['flag']);

watch(
  ()=>props.flag,
  ()=>{
    let timer = setInterval(()=>{
      time.value--;
      if(time.value == 0){
        $emit('getFlag',false);
        clearInterval(timer);
      }
    },1000)
  },{
    immediate:true,
  })

let $emit = defineEmits(['getFlag']);
</script>

<script lang="ts">
export default {
  name:'CountDown'
}
</script>
<style scoped lang="ts">

</style>