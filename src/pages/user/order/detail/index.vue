<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="detail">挂號詳情</div>
        </div>
      </template>
      <div class="top">
        <el-tag class="m1-2" type="success">
          <div class="tag">
            <svg t="1719219029007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6900" width="16" height="16">
              <path
                d="M512 512m-438.857143 0a438.857143 438.857143 0 1 0 877.714286 0 438.857143 438.857143 0 1 0-877.714286 0Z"
                fill="#6DD46F" p-id="6901"></path>
              <path
                d="M336.457143 490.057143c-14.628571-14.628571-36.571429-14.628571-51.2 0-14.628571 14.628571-14.628571 40.228571 0 54.857143l153.6 160.914285c14.628571 14.628571 36.571429 14.628571 51.2 0l281.6-296.228571c14.628571-14.628571 14.628571-40.228571 0-54.857143-14.628571-14.628571-36.571429-14.628571-51.2 0l-256 270.628572-128-135.314286z"
                fill="#FFFFFF" p-id="6902"></path>
            </svg>
            <span>{{ orderInfo.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <div class="right_info">
          <img src="../../../../assets/log.png" alt="">
          <div class="info">
            <p>微信 關注“林源毅預約挂號”</p>
            <p>“快速預約挂號”</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就診人信息
                </div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就診日期
                </div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就診醫院
                </div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就診科室
                </div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  醫生職稱
                </div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  醫事服務費
                </div>
              </template>
              <span style="color:red;">{{ orderInfo.amount }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂號訂單
                </div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂號時間
                </div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div class="button" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
            <el-popconfirm title="確認取消預約嗎？" @confirm="cancel">
              <template #reference>
                <el-button>取消預約</el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" size="default" v-if="orderInfo.orderStatus == 0"
              @click="openDialog">支付</el-button>
          </div>
        </div>
        <div class="right">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>注意事項</span>
              </div>
            </template>
            <p>1.請確認就診人信息是否準確，若填寫錯誤將無法取號就診，損失由本人承擔:</p>
            <p style="color:red;">
              2.【取號】就診當天需在{{ orderInfo.fetchTime }}前
              在醫院取號，未取號視爲爽約，該號不退不換：
            </p>
            <p>3.【退號】在{{ orderInfo.quitTime }}前可在綫退號，逾期將不可辦理退號退費：</p>
            <p>4.北京114預約挂號支持自費患者使用身份證預約，同時支持北京市醫保患者使用北京市醫保患者使用北京社保卡在平臺預約挂號，請與就診當日，携帶預約挂號所使用的有效身份證件到院取號；</p>
            <p>5.請注意北京市醫保患者在住院期間不能使用社保卡在門診取號。</p>
          </el-card>
        </div>
      </div>
    </el-card>

    <!-- 展示支付二維碼 -->
    <el-dialog @close="close" v-model="dialogVisible" title="微信支付" width="400">
      <!-- 支付二維碼圖片 -->
      <div class="qrcode">
        <img :src="imgUrl" alt="">
        <p>請使用微信掃一掃</p>
        <p>掃描二維碼支付</p>
      </div>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"> 關閉窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqOrderInfo, reqCancelOrder,reqQrcode,reqQueryPayState } from '@/api/user/index';
import { useRoute } from 'vue-router';
import type { PayResult,qrCodeResponseData, orderDetailResponseData } from '@/api/user/type';
import { ElMessage } from 'element-plus';
//@ts-ignore
import QRCode from 'qrcode';

let $route = useRoute();
let orderInfo = ref<any>({});

onMounted(() => {
  getOrderInfo();
});

const getOrderInfo = async () => {
  let result: orderDetailResponseData = await reqOrderInfo($route.query.orderId as string);
  // console.log(result);
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
}

//取消
const cancel = async () => {
  console.log('123')
  try {
    await reqCancelOrder($route.query.orderId as string);
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消預約失敗'
    })
  }
}

//控制對話框顯示與隱藏
let dialogVisible = ref<boolean>(false);
let imgUrl = ref<string>('');

//存儲定時器引用
let timer =ref<any>();

const openDialog = async() => {
  dialogVisible.value = true;
  let result:qrCodeResponseData = await reqQrcode($route.query.orderId as string);
  // console.log(result)
  //根據返回的二維碼url轉換為qrcode
  imgUrl.value = await QRCode.toDataURL(result.data.codeUrl);
  //詢問服務器支付結果,需要一直詢問
  timer.value = setInterval(async ()=>{
    let result:PayResult = await reqQueryPayState($route.query.orderId as string);
    // console.log(result)
    if(result.data){//返回為真（支付成功）
      //關閉對話框
      dialogVisible.value = false;
      ElMessage({
        type:'success',
        message:'支付成功',
      })
      clearInterval(timer.value);
      //再次獲取訂單詳情(已支付)
      getOrderInfo();
    }
  },2000)
}

const closeDialog = () =>{
  dialogVisible.value = false;
  clearInterval(timer.value);
}

//對話框右上角的打叉關閉
const close = () =>{
  clearInterval(timer.value);

}
</script>

<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 900;
  }

  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }

    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      .info {
        margin-left: 10px;

        p {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

  }

  .bottom {
    display: flex;
    margin-top: 20px;

    .left {
      flex: 4;

      .button {
        margin: 10px 0px;
      }
    }

    .right {
      margin-left: 20px;
      flex: 6;

      p {
        line-height: 30px;
      }
    }
  }
}

::v-deep(.el-dialog__body) {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}

.qrcode{
  display:flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 250px;
    height: 250px;
  }
  p{
    line-height: 30px;
  }
}
</style>