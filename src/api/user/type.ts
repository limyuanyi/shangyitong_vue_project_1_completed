//定义医院详情模块的ts数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

//生成订单id返回数据
export interface SubmitOrder extends ResponseData {
  'data': number
}

//医院订单详情返回数据
export interface orderDatailData {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "orderStatusString": string
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": string,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}

//获取订单详情返回数据
export interface orderDetailResponseData extends ResponseData {
  data: orderDatailData
}

//获取二维码返回的data数据
export interface qrCodeData {
  "codeUrl": string,
  "orderId": number,
  "totalFee": number,
  "resultCode": string
}

//获取二维码返回数据
export interface qrCodeResponseData extends ResponseData {
  data: qrCodeData
}

export interface PayResult extends ResponseData {
  data: boolean
}

//用戶信息（實名認證）
export interface UserInfo {
  'id': number,
  'createIime': string,
  'updateTime': string,
  'isDeleted': number,
  'param': {

  },
  'openid': null,
  'nickName': null,
  'phone': string,
  'name': string,
  'certificatesType': string,
  'certificatesNo': string,
  'certificatesUrl': null,
  'authStatus': number,
  'status': number
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}

//證件類型
export interface CertationType {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {},
  "parentId": number,
  "name": string,
  "value": string,
  "dictCode": string,
  "hasChildren": boolean
}

export type CertationArr = CertationType[];

export interface CertationTypeResponseData extends ResponseData {
  data:CertationArr
}

//用戶認證
export interface UserParams {
  "certificatesNo": string,
  "certificatesType": string,
  "certificatesUrl": string,
  "name": string
}

//訂單數據
export interface Order{
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "orderStatusString": string
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": null,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}

export type Records = Order[]

export interface UserOrderInfoResponseData extends ResponseData{
  data:{
    "records":Records,
    "total": number,
    "size": number,
    "current": number,
    "orders": [],
    "hitCount": boolean,
    "searchCount": boolean,
    "pages": number
  }
}

//代表就诊人ts类型
export interface User {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "certificatesTypeString": string,
      "contactsCertificatesTypeString": string,
      "cityString": null,
      "fullAddress": string,
      "districtString": null,
      "provinceString": null
  },
  "userId": number,
  "name": string,
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": null,
  "cityCode": null,
  "districtCode": null,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": string,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": null,
  "status": string
}
//全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的ts类型
export interface AllUserResponseData extends ResponseData {
  data: AllUser
}

//订单状态ts类型
export interface OrderState {
  "comment": string,
  "status": number
}

export type AllOrderState = OrderState[];
//全部订单状态码接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState
}

export interface AddOrUpdateUser{
  id?: string,
  name: string,
  certificatesType: string,
  certificatesNo:string,
  sex:number,
  birthdate:string,
  phone:string,
  isMarry:number,
  isInsure:number,
  addressSelected:string[],
  address:string,
  contactsName:string,
  contactsCertificatesType:string,
  contactsCertificatesNo:string,
  contactsPhone:string
}