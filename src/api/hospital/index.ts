import request from '@/utils/request';
import type{DoctorInfoResponseData,UserResponseData,DoctorResponseData,HospitalWorkData,HospitalDetail,DepartmentResponseData,LoginData,UserLoginResponseData} from '@/api/hospital/type'

enum API{
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    HOSPITALDEPARTMENT_URL='/hosp/hospital/department/',
    GETUSERCODE_URL='/sms/send/',
    //登錄數據
    USERLOGIN_URL='/user/login',
    //獲取某一個科室預約挂號數據
    HOSPITALWORK_URL='/hosp/hospital/auth/getBookingScheduleRule/',
    //獲取排班數據
    HOSPITALDOCTOR_URL='/hosp/hospital/auth/findScheduleList/',
    //就診人信息
    GETUSER_URL='/user/patient/auth/findAll',
    //排班醫生
    GETDOCTOR_URL ='/hosp/hospital/getSchedule/',
}

export const reqHospitalDetail = (hoscode:string)=>request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL+hoscode)

export const reqHospitalDepartment = (hoscode:string) =>request.get<any,DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL+hoscode)

export const reqCode = (phone:string) =>request.get(API.GETUSERCODE_URL+phone)

export const reqUserLogin = (data:LoginData) =>request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data);

export const reqHospitalWork = (page:number,limit:number,hoscode:string,depcode:string) =>request.get<any,HospitalWorkData>(API.HOSPITALWORK_URL+`${page}/${limit}/${hoscode}/${depcode}`)
//排班
export const reqHospitalDoctor = (hoscode:string,depcode:string,workDate:string)=>request.get<any,DoctorResponseData>(API.HOSPITALDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`)
//就診人
export const reqGetUser = () =>request.get<any,UserResponseData>(API.GETUSER_URL);
//挂號醫生
export const reqDoctorInfo = (scheduleId:string) => request.get<any,DoctorInfoResponseData>(API.GETDOCTOR_URL+scheduleId);