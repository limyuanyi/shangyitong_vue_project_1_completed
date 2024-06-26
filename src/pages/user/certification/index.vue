<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>實名信息</h1>
        </div>
      </template>
      <div class="tip" style="color:#7f7f7f">
        <p> <el-icon>
            <InfoFilled />
          </el-icon>
          完成實名認證后才能添加就診人，正常進行挂號，爲了不影響後續步驟，建議提前實名認證。</p>
      </div>
      <!-- 底部 -->
      <!-- 已驗證結構 -->
      <el-descriptions v-if="userInfo.authStatus == 1" size="small" class="margin-top" :column="1" border
        style="margin:20px auto;">
        <el-descriptions-item label-align="center" :width="20">
          <template #label>
            <div class="cell-item">
              用戶姓名
            </div>
          </template>
          {{ userInfo.name }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" :width="20">
          <template #label>
            <div class="cell-item">
              證據類型
            </div>
          </template>
          {{ userInfo.certificatesType == 10 ? '身份證' : '戶口本' }}
        </el-descriptions-item>
        <el-descriptions-item label-align="center" :width="20">
          <template #label>
            <div class="cell-item">
              證件類型
            </div>
          </template>
          {{ userInfo.certificatesNo }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 未驗證結構 -->
      <el-form  
      v-else
      style="width:60%;margin:20px auto;" 
      label-width="80"
      :model="params"
      :rules="rules"
      ref="frm">
        <el-form-item label="用戶姓名" prop="name">
          <el-input placeholder="請輸入用戶姓名"  v-model="params.name"></el-input>
        </el-form-item>
        <el-form-item label="證件類型" prop="certificatesType">
          <el-select placeholder="請選擇證件類型" v-model="params.certificatesType">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="證件號碼" prop="certificatesNo">
          <el-input placeholder="請輸入證件號碼" v-model="params.certificatesNo"></el-input>
        </el-form-item>

        <el-form-item label="上傳證件" prop="certificatesUrl">
          <!-- action:upload組件向服務器提交圖片路徑 
            on-exceed:超出約束數量鈎子
          -->
          <el-upload 
            action='/api/oss/file/fileUpload?fileHost=userAuah'
            ref="upload"
            list-type="picture-card" 
            :on-remove="handleRemove" 
            :on-preview="handlePictureCardPreview"
            :on-success="successHandler" 
            :on-exceed="exceedHandler" :limit="1">
            <img style="width:100%;height:100%" src="../../../assets/log.png" alt="">
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full v-if="params.certificatesUrl" style="width: 100%;height:100%" :src="params.certificatesUrl"
              alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重寫</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import { reqUserInfo, reqCertationType, reqUserCertation } from '@/api/user';
import type { UserParams, CertationArr, UserInfoResponseData } from '@/api/user/type';
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
onMounted(() => {
  getUserInfo();
  getType();
})

let userInfo = ref<any>({});
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqUserInfo();
  // console.log(result);
  if (result.code == 200) {
    userInfo.value = result.data;
  }
}

let arrType = ref<CertationArr>([])
const getType = async () => {
  let result = await reqCertationType();
  // console.log(result)
  if (result.code == 200) {
    arrType.value = result.data
  }
}

//認證
let params = reactive<UserParams>({
  "certificatesNo": '',
  "certificatesType": '',
  "certificatesUrl": '',
  "name": ''
})

//超出數量鈎子
const exceedHandler = () => {
  ElMessage({
    type: 'error',
    message: '只能上傳一張圖片'
  })
}
//圖片上傳成功
const successHandler = (response: any) => {
  frm.value.clearValidate('certificatesUrl');
  params.certificatesUrl = response.data;
}
let dialogVisible = ref<boolean>(false);
//預覽照片墻
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}
//照片墻刪除圖片
const handleRemove = () => {
  params.certificatesUrl = ''
}

let upload = ref();
const reset = () => {
  upload.value.clearFiles();
  Object.assign(params, {
    "certificatesNo": '',
    "certificatesType": '',
    "certificatesUrl": '',
    "name": ''
  })
}

const submit = async () =>{
  await frm.value.validate();
  try{
    await reqUserCertation(params);
    ElMessage({
      type:'success',
      message:'認證成功',
    });
    //認證成功后
    getUserInfo();
  }catch(error){
    ElMessage({
      type:'error',
      message:'認證失敗',
    })
  }
}

//自定義規則方法
const validatorName = (_:any,value:any,callBack:any) =>{
  const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if(reg.test(value)){
    callBack();
  }else{
    callBack(new Error('請輸入正確中國人的名字'))
  }
}

const validatorType = (_:any,value:any,callBack:any) =>{
  if(value=='10'||value=='20'){
    callBack();
  }else{
    callBack(new Error('請選擇證件類型'))
  }
}

const validatorNo = (_:any,value:any,callBack:any) =>{
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if(reg.test(value)){
    callBack();
  }else{
    callBack(new Error('請輸入正確的身份證/戶口本'))
  }
}

let frm=ref();
const validatorUrl = (_:any,value:any,callBack:any) =>{
  if(value.length){
    callBack();
  }else{
    callBack(new Error('請上傳證件照圖片'));
  }
}
//表單校驗
const rules= {
  name:[{
    required:true,
    validator:validatorName
  }],
  certificatesType:[{
    required:true,
    validator:validatorType
  }],
  certificatesNo:[{
    required:true,
    validator:validatorNo
  }],
  certificatesUrl:[{
    required:true,
    validator:validatorUrl
  }],
}
</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>