//定義用戶相關的倉庫 （登錄）
import{defineStore} from 'pinia';
import {reqCode,reqUserLogin} from "@/api/hospital"
import type {LoginData,UserLoginResponseData} from '@/api/hospital/type'
import type {userState} from './interface'
import {GET_TOKEN,SET_TOKEN,REMOVE_TOKEN} from '@/utils/user'
const useUserStore = defineStore("User",{
    state:():userState => {
        return{
            visiable:false,//控制顯示隱藏
            code:'',
            userInfo:JSON.parse(GET_TOKEN() as string) || {}
        }
    },
    actions:{
        async getCode(phone:string){
            // console.log(phone)
            let result:any = await reqCode(phone)
            // console.log(result)
            if(result.code==200){
                this.code = result.data;
                return 'ok';
            }else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogin(loginParam:LoginData){
            let result:UserLoginResponseData = await reqUserLogin(loginParam);
            // console.log(result);
            if(result.code == 200){
                this.userInfo =result.data;
                //本地存儲持久化
                SET_TOKEN(JSON.stringify(result.data));
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        logout(){
            this.userInfo = {name:'',token:''};
            REMOVE_TOKEN();
        }
    },
    getters:{

    }
}) 

export default useUserStore