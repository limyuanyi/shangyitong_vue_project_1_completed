import axios from 'axios'
import useUserStore from '@/store/modules/user';

const request = axios.create({
    baseURL:'/api',
    // timeout:5000//超出5秒就請求失敗
});

//請求攔截器
request.interceptors.request.use((config:any)=>{
    //config:請求攔截器回調注入的對象（配置對象），内有一個hearders屬性
    //可以通過請求携帶公共參數-token
    let userStore = useUserStore();
    if(userStore.userInfo.token)
        config.headers.token = userStore.userInfo.token;
    // console.log(userStore);
    return config;
})

//響應攔截器
request.interceptors.response.use((response:any)=>{
    return response.data;
},(error:any)=>{
    return Promise.reject(new Error(error.message))
})


export default request;