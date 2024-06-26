<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>就診人管理</span>
        <el-button class="button" type="danger" :icon="User" @click="addUser">添加就診人</el-button>
      </div>
    </template>
    <!-- 就診人管理模塊 -->
    <div v-if="scene == 0" class="visitors">
      <Visitor 
      @removeUser="removeUser"
      @changeScene="changeScene" class="item" 
      v-for="(user, index) in userArr" :key="user.id" 
      :user="user" :index="index"></Visitor>
    </div>
    <!-- 添加就診人|修改 已有的就診人結構 -->
    <div v-else class="form">
      <el-divider content-position="left">就診人信息</el-divider>
      <el-form style="width:60%;margin:10px auto" label-width="80">
        <el-form-item label="用戶姓名">
          <el-input placeholder="請輸入用戶姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="證件類型">
          <el-select placeholder="請選擇證件類型" style="width: 100%;" v-model="userParams.certificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="證件號碼">
          <el-input placeholder="請輸入證件號碼" v-model="userParams.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用戶性別">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="請選擇出生日期" value-format="YYYY-MM-DD" v-model="userParams.birthdate" />
        </el-form-item>
        <el-form-item label="手機號碼">
          <el-input placeholder="請輸入手機號碼" v-model="userParams.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">建檔信息(完善后部分醫院首次就診不排隊建檔)</el-divider>
      <el-form style="width:60%;margin:10px auto" label-width="80">
        <el-form-item label="婚姻狀況">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自費/醫保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自費</el-radio>
            <el-radio :label="0">醫保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="當前住址">
          <el-cascader :props="props" v-model="userParams.addressSelected" />
        </el-form-item>
        <el-form-item label="詳細地址">
          <el-input placeholder="請輸入用戶詳細地址" v-model="userParams.address"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">聯係人信息（選填）</el-divider>
      <el-form style="width:60%;margin:10px auto" label-width="80">
        <el-form-item label="用戶姓名">
          <el-input placeholder="請輸入用戶姓名" v-model="userParams.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="證件類型">
          <el-select placeholder="請選擇證件類型" style="width: 100%;" v-model="userParams.certificatesType">
            <el-option v-for="item in certationArr" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="證件號碼">
          <el-input placeholder="請輸入證件號碼" v-model="userParams.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手機號碼">
          <el-input placeholder="請輸入手機號碼" v-model="userParams.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重寫</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//@ts-ignore
import { User } from "@element-plus/icons-vue";
import { reqGetUser } from '@/api/hospital';
import { reqCity, reqCertationType, reqAddOrUpdateUser } from '@/api/user';
import { onMounted, ref, reactive,watch } from 'vue';
import type { UserArr, UserResponseData } from '@/api/hospital/type'
import type { AddOrUpdateUser, CertationTypeResponseData, CertationArr } from '@/api/user/type';
import { ElMessage, type CascaderProps } from 'element-plus'
import {useRoute,useRouter} from 'vue-router';

let $route = useRoute();
let $router = useRouter();
let userArr = ref<UserArr>([]);

onMounted( () => {
  getAllUser();
  getCertationType();

  //判斷當前路由組件是不是從挂號組件來，true：直接scene==1
  if($route.query.type == 'add'){
    scene.value =1;
  }

  if($route.query.type == 'edit'){
    scene.value =1;
  }
})

watch(()=>userArr.value,()=>{
  if($route.query.type == 'edit'){
    let user = userArr.value.find((item:any) => {
      return item.id == $route.query.id;
    })
    Object.assign(userParams,user)
  }
})
const getAllUser = async () => {
  let result: UserResponseData = await reqGetUser();
  if (result.code = 200) {
    userArr.value = result.data;
  }
}

//決定卡片的展示内容
let scene = ref<number>(0);

//添加就診人按鈕
const addUser = () => {
  //  清空數據
  reset();
  scene.value = 1;
}

const changeScene = (user:AddOrUpdateUser) => {
  scene.value = 1;
  Object.assign(userParams,user);
}

const removeUser = () =>{
  getAllUser();
}

const reset = () => {
  Object.assign(userParams, {
    id:null,
    name: '',
    certificatesType: '',
    certificatesNo: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
  })
}
let certationArr = ref<CertationArr>([]);

const getCertationType = async () => {
  let result: CertationTypeResponseData = await reqCertationType();
  // console.log(result);
  if (result.code == 200) {
    certationArr.value = result.data;
  }
}

//級聯選擇器數據
const props: CascaderProps = {
  lazy: true,//懶加載
  async lazyLoad(node, resolve) {
    let result: any = await reqCity(node.data?.id as string || '86');
    let showData = result.data.map((item: any) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren
      }
    })
    resolve(showData);
  },

}

//新增就診人
let userParams = reactive<AddOrUpdateUser>({
  name: '',
  certificatesType: '',
  certificatesNo: '',
  sex: 0,
  birthdate: '',
  phone: '',
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: '',
  contactsName: '',
  contactsCertificatesType: '',
  contactsCertificatesNo: '',
  contactsPhone: ''
})

const submit = async () => {
  try {
    await reqAddOrUpdateUser(userParams);
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '新增成功'
    })
    //判斷下一頁要調回去哪裏，切換場景
    if($route.query.type ='add'){
      $router.back();
    }else{
      scene.value = 0;
    }
    getAllUser();
  } catch (error) {
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失敗' : '新增失敗'
    })
  }
}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visitors {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 32%;
    margin: 5px;
  }
}
</style>