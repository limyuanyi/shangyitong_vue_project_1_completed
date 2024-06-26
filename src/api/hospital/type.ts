
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

//
export interface HosPitalDetail{
    "bookingRule": {
          "cycle": number,
          "releaseTime": string,
          "stopTime": string,
          "quitDay": number,
          "quitTime": string,
          "rule": string[],
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
          "hostypeString": string,
          "fullAddress": string
        },
        "route": string,
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": string,
        "status": number,
        "bookingRule": null
    }
}

export interface HospitalDetail extends ResponseData{
    data:HosPitalDetail
}

//醫院科室數據
export interface Department{
    'depcode':string,
    'depname':string,
    'children'?:Department[]
}

export type DepartmentArr = Department[]

export interface DepartmentResponseData extends ResponseData{
    data:DepartmentArr
}

export interface LoginData{
    phone:string;
    code:string
}

//登錄接口返回user的信息數據
export interface UserInfo{
    name:string,
    token:string
}

export interface UserLoginResponseData extends ResponseData{
    data:UserInfo
}


export interface BaseMap{
    "workDateString": string,
      "releaseTime": string,
      "bigname": string,
      "stopTime": string,
      "depname": string,
      "hosname": string
}

export interface WorkData {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": number,
    "availableNumber": number,
    "status": number
}
export type BookingScheduleList = WorkData []
 
export interface HospitalWorkData extends ResponseData {
    data:{
        "total":number,
        bookingScheduleList:BookingScheduleList,
        baseMap:BaseMap
    }
}
    
export interface Doctor {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string
    },
    "hoscode": string,
    "depcode": string,
    "title": string,
    "docname": string,
    "skill": string,
    "workDate": string,
    "workTime": number,
    "reservedNumber": number,
    "availableNumber": number,
    "amount": number,
    "status": number,
    "hosScheduleId":string
}

//數組
export type DoctorArr =  Doctor[]

export interface DoctorResponseData extends ResponseData{
    data:DoctorArr
}

//就診人
export interface userInfo {

    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "certificatesTypeString": string,
      "contactsCertificatesTypeString": string,
      "cityString": string,
      "fullAddress": string,
      "districtString": string,
      "provinceString": string
    },
    "userId": number,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,
    "birthdate": string,
    "phone": string,
    "isMarry": number,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo": string,
    "status": string
  }

  export type UserArr = userInfo[];
  export interface UserResponseData extends ResponseData {
    data:UserArr
  }
  
  //医生排版数据
  export interface DoctorInfoResponseData extends ResponseData {
    data: Doctor
  }


  