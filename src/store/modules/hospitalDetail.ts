import {defineStore} from 'pinia';
import { reqHospitalDetail,reqHospitalDepartment } from '@/api/hospital/index'
import type{ HospitalDetail,HosPitalDetail,DepartmentResponseData } from '@/api/hospital/type'
import type {DetailState} from './interface'
const useDetailStore = defineStore('Detail',{
    state:() :DetailState =>{
        return {
            hospitalInfo:({} as HosPitalDetail),
            departmentArr:[]
        }
    },
    actions:{
        async getHospital(hoscode:string){
            // console.log(hoscode);
            let result:HospitalDetail = await reqHospitalDetail(hoscode);
            // console.log(reqHospitalDetail(hoscode));
            // console.log(result)
            if(result.code ==200){
                this.hospitalInfo =result.data
            }
        },
        async getDepartment(hoscode:string){
            let result:DepartmentResponseData = await reqHospitalDepartment(hoscode)
            // console.log(result)
            if(result.code ==200){
                this.departmentArr =result.data
            }
        }
    },
    getters:{

    }
});

export default useDetailStore;
