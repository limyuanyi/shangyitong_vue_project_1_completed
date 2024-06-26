//路由鑒權--全局守衛

import router from './router';
//@ts-ignore
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import pinia from '@/store';
import useUserStore from './store/modules/user';
let userStore = useUserStore(pinia);

//進度條的加載小球不要
Nprogress.configure({showSpinner:false})

//存储用户未登录也可以访问的网址
let whiteList = ['/home','/hospital/register','/hospital/detail','/hospital/notice','/hospital/close','/hospital/search']

router.beforeEach((to,_,next) =>{
    Nprogress.start();
    //動態設置網頁左上角標題
    document.title = `尚醫通-${to.meta.title}`;
    //判斷用戶是否登錄
    let token = userStore.userInfo.token;
    if(token){
        next();
    }else{
        if(whiteList.includes(to.path)){
            next();
        }else{
            userStore.visiable = true;
            next({
                path:'/home',
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }
})

router.afterEach(() =>{
    Nprogress.start();
})