<template>
    <div class="bottom">
      <div class="content">
        <div class="left">
            林源毅 電話挂號0917-796-270
        </div>
        <div class="right">
            <span>聯係我們</span>
            <span>合作夥伴</span>
            <span>用戶協議</span>
            <span>隱私協議</span>
        </div>
      </div>
    </div>
</template>

<script setup name="HospitalBottom">

</script>

<style scoped lang="scss">
.bottom{
  width: 100%;
  height: 50px;
  background-color: #f0f2f5;
  display:flex;
  justify-content:center;
  .content{
    width: 1200px;
    height: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:14px;
    .right{
      span{
        margin: 0px 5px;
      }
    }
  }
}
</style>