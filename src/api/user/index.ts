//引入二次封裝axios

import request from '@/utils/request';
import type {AddOrUpdateUser,AllOrderStateResponseData,AllUserResponseData,UserOrderInfoResponseData,UserParams,UserInfoResponseData,qrCodeResponseData,orderDetailResponseData,SubmitOrder,PayResult,CertationTypeResponseData} from './type';
enum API{
    SUBMITORDER_URL='/order/orderInfo/auth/submitOrder/',
    //獲取訂單
    GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    //獲取二維碼
    QRCODE_URL = '/order/weixin/createNative/',
    //查詢訂單支付結果
    PAYRESULT_URL ='/order/weixin/queryPayStatus/',
    //獲取當前賬號用戶信息(實名認證),
    USERINFO_URL = '/user/auth/getUserInfo',
    //獲取證件類型
    CERTIFICATIONTYPE_URL='/cmn/dict/findByDictCode/',
    //用戶認證接口
    USERCERTATION_URL = '/user/auth/userAuah',

    //挂號訂單
    USERORDERINFO_URL = '/order/orderInfo/auth/',
    //獲取就診人信息，（上面的拉條）
    ALLUSER_URL = '/user/patient/auth/findAll',
    //獲取訂單狀態
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
    //獲取城市的數據
    CITY_URL = '/cmn/dict/findByParentId/',
    //新增就診人
    ADDUSER_URL = '/user/patient/auth/save',
    //更新已有的就診人
    UPDATEUSER_URL = '/user/patient/auth/update',
    DELETEUSER_URL = '/user/patient/auth/remove/'
}

export const reqSubmitOrder = (hoscode:string,scheduleId:string,patientId:number) =>request.post<any,SubmitOrder>(API.SUBMITORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)

export const reqOrderInfo = (id:string) =>request.get<any,orderDetailResponseData>(API.GETORDERINFO_URL+id);

export const reqCancelOrder = (id:string) =>request.get<any,any>(API.ORDERCANCEL_URL+id)

export const reqQrcode = (id:string) => request.get<any,qrCodeResponseData>(API.QRCODE_URL+id);

export const reqQueryPayState = (id:string) => request.get<any,PayResult>(API.PAYRESULT_URL+id);

export const reqUserInfo = () =>request.get<any,UserInfoResponseData>(API.USERINFO_URL);

export const reqCertationType = (CertificatesType ='CertificatesType') =>request.get<any,CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL+CertificatesType)

export const reqUserCertation = (data:UserParams) =>request.post<any,any>(API.USERCERTATION_URL,data)

export const reqUserOrderInfo = (page:number,limit:number,patientId:string,orderStatus:string) =>request.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

export const reqAllUser = () => request.get<any,AllUserResponseData>(API.ALLUSER_URL)

export const reqOrderState = () =>request.get<any,AllOrderStateResponseData>(API.ORDERSTATE_URL)

export const reqCity = (parentId:string) =>request.get<any,any>(API.CITY_URL+parentId)

export const reqAddOrUpdateUser = (data:AddOrUpdateUser) =>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data);
    }else{
        return request.post<any,any>(API.ADDUSER_URL);
    }
}

export const reqRemoveUser = (id:number) => request.delete<any,any>(API.DELETEUSER_URL+id)