<template>
    <div class="login_container">
        <!-- v-model控制顯示隱藏 -->
        <el-dialog v-model="userStore.visiable" title="用戶登錄" width="800" 
        ref="dialog">
            <el-row>
                <el-col :span="12">
                    <div class="logint">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="請輸入手機號碼" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="請輸入手機驗證碼" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || flag ? true : false" @click="getCode">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag"></CountDown>
                                        <span v-else>獲取驗證碼</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button style="width:100%" type="primary" size="default"
                                :disabled="!isPhone || loginParam.code.length < 6 ? true : false"
                                @click="login">用戶登錄</el-button>
                            <div class="bottom" @click="changeScene">
                                <p>微信掃碼登錄</p>
                                <svg t="1719037571656" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6212" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="6213"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="6214"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            微信掃碼登錄結構
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/log.png" alt="">
                                <svg t="1719037571656" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6212" width="16" height="16">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#cdcdcd" p-id="6213"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#cdcdcd" p-id="6214"></path>
                                </svg>
                                <p>微信掃一掃關注</p>
                                <p>快速預約挂號</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/log.png" alt="">
                                <svg t="1719037909235" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="7836" width="16" height="16">
                                    <path
                                        d="M704 149.312a64 64 0 0 1 64 64v597.376a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V213.312a64 64 0 0 1 64-64h384z m0 64H320v597.376h384V213.312z m-192 469.376A42.688 42.688 0 1 1 512 768a42.688 42.688 0 0 1 0-85.312z m85.312-437.376v64H426.688v-64h170.624z"
                                        fill="#666666" p-id="7837"></path>
                                </svg>
                                <p>掃一掃下載</p>
                                <p>”預約挂號“APP</p>
                            </div>
                        </div>
                        <p class="tip">商醫通官方指定平臺</p>
                        <p class="tip">快速挂號 安全放心</p>
                    </div>
                </el-col>
            </el-row>
            <template #footer>
                <div>
                    <el-button type="primary" size="default"
                    @click="closeDialog">關閉窗口</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import CountDown from '@/components/countdown/index.vue';
import { ref, reactive, computed } from 'vue';
//@ts-ignore
import { User, Lock } from '@element-plus/icons-vue';
//獲取visiable
import useUserStore from '@/store/modules/user';
import {useRoute,useRouter} from 'vue-router';
import { ElMessage } from 'element-plus';
let userStore = useUserStore();

let flag = ref<boolean>(false);//if true：開啓倒計時

let scene = ref<number>(0);//0：手機號碼登錄，1：微信登錄
let form = ref<any>();

let $route = useRoute();
let $router = useRouter();

let loginParam = reactive({
    phone: '',
    code: '',
})
const changeScene = () => {
    scene.value = 1
}

let isPhone = computed(() => {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return reg.test(loginParam.phone);
})

//獲取驗證碼回調
const getCode = async () => {
    //解決element-plus按鈕禁用還能點擊問題
    if (!isPhone.value || flag.value) return;
    flag.value = true
    try {
        await userStore.getCode(loginParam.phone);
        loginParam.code = userStore.code
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}

const getFlag = (val: boolean) => {
    flag.value = val;
}

//點擊用戶登錄按鈕回調
const login = async () =>{
    await form.value.validate();
    //發請求(在store發)
    try{
        //用戶登錄成功，關閉對話框
        await userStore.userLogin(loginParam);
        userStore.visiable=false;

        //獲取url的query
        let redirect = $route.query.redirect;
        if(redirect){
            $router.push(redirect as string);
        }else{
            $router.push('/home')
        }
    }catch(error){
        type:'error';
        message:(error as Error).message;
    }
}

//表單校驗
// const rules = {
//     phone:[
//         {
//             required:true,//代表當前字段務必進行校驗
//             message:'手機號碼務必11位',
//             trigger:'change',//change(文本發生變化) & blur(失去焦點)
//             min:11//最小位數，max:最大位數
//         }
//     ],
//     code:[
//         {
//             required:true,
//             message:'驗證碼務必6位',
//             trigger:'change',
//             min:6
//         }
//     ]
// }

const validatorPhone = (_:any,value:any,callBack:any) =>{
    //rule：表單校驗規則對象
    //value：當前文本對象
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(reg.test(value)){
        callBack();
    }
    else{
        callBack(new Error('請輸入正確的手機號碼格式'))
    }
}

const validatorCode = (_:any,value:any,callBack:any) =>{
    //rule：表單校驗規則對象
    //value：當前文本對象
    if(/^\d{6}$/.test(value)){
        callBack();
    }
    else{
        callBack(new Error('請輸入正確的驗證碼格式'))
    }
}
//自定義校驗
const rules = {
    phone:[{trigger:'change',validator:validatorPhone}],
    code:[{trigger:'change',validator:validatorCode}],
}

//清除表單數據
// const close = () =>{
//     Object.assign(loginParam,{phone:'',code:''});
//     form.value.resetFields();
// }

//關閉窗口按鈕
const closeDialog = () =>{
    userStore.visiable = false;
    // Object.assign(loginParam,{phone:'',code:''});
    // form.value.resetFields();
}
</script>


<script lang="ts">
export default {
    name: 'Login'
}
</script>


<style scoped lang="scss">
.login_container {
    ::v-deep(.el-dialog__body) {
        //組件内部的class要用deep
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .logint {
        padding: 20px;
        border: 1px solid #ccc;
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 30px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
    }
}
</style>