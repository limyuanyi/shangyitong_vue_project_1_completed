import type { HosPitalDetail,DepartmentArr,UserInfo } from '@/api/hospital/type'

export interface DetailState{
    hospitalInfo:HosPitalDetail,
    departmentArr:DepartmentArr

}

//user
export interface userState{
        visiable:boolean,
        code:string,
        userInfo:UserInfo

} 