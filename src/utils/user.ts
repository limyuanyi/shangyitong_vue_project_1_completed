export const SET_TOKEN = (userInfo:string) =>{
    localStorage.setItem('USERINFO',userInfo);
}

export const GET_TOKEN = () =>{
    return localStorage.getItem("USERINFO");
}

//清除本地存儲
export const REMOVE_TOKEN = () =>{
    localStorage.removeItem('USERINFO')
}