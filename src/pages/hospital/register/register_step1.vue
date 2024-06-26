<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line">|</div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>
        <!-- 展示日期 -->
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDataString }}</h1>
            <div class="container">
                <div class="item"
                    :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate == workTime.workDate }"
                    v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="top1">{{ item.workDate }} {{ item.dayOfWeek }}</div>
                    <div class="bottom">
                        <div v-if="item.status == -1"> 停止挂號</div>
                        <div v-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '無號' : `有號(${item.availableNumber})` }}
                        </div>
                        <div v-if="item.status == 1"> 即將放號</div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNo" layout="prev, pager, next" :total="11/*workData.total*/"
                @current-change="fetchWorkData" />
        </div>
        <!-- 展示醫生結構 -->
        <div class="bottom">
            <!-- 展示（即將放號） -->
            <div class="will" v-if="workTime.status == 1">
                <span class="time">{{ workTime.workDate }}</span>
                <span class="will_text">放號</span>
            </div>
            <!-- 展示醫生結構：上午，下午 -->
            <div class="doctor" v-else>
                <div class="morning">
                    <div class="tip">
                        <svg t="1719152528695" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4300" width="32" height="32">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#1296db" p-id="4301"></path>
                        </svg>
                        <span class="text">上午號源</span>
                    </div>
                    <!-- 每一個醫生信息 -->
                    <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <div class="right">
                            <div class="money">{{ doctor.amount }}</div>
                            <el-button type="primary" size="default"
                            @click="goStep2(doctor)">剩餘{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="after">
                    <div class="tip">
                        <svg t="1719155165468" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5746" width="32" height="32">
                            <path
                                d="M418.857773 926.454686c-216.541566 0-392.66505-176.123484-392.66505-392.66505v-62.998015c0-18.741345 15.128556-33.869901 33.869901-33.869901h717.590298c18.741345 0 33.869901 15.128556 33.8699 33.869901v62.998015c0 216.541566-176.123484 392.66505-392.665049 392.66505zM93.932525 504.661521v29.128115c0 179.058875 145.866373 324.925248 324.925248 324.925248 179.058875 0 324.925248-145.866373 324.925248-324.925248v-29.128115H93.932525z"
                                fill="#1296db" p-id="5747"></path>
                            <path
                                d="M588.658875 987.646307H264.185226c-18.741345 0-33.869901-15.128556-33.869901-33.869901s15.128556-33.869901 33.869901-33.869901h324.473649c18.741345 0 33.869901 15.128556 33.869901 33.869901s-15.128556 33.869901-33.869901 33.869901zM837.489746 768.16935c-30.031312 0-63.675413-7.451378-100.706505-24.837928a34.00538 34.00538 0 0 1-16.257552-45.159867c7.902977-16.93495 28.224917-24.160529 45.159868-16.257553 104.545094 49.224256 150.833958-15.354355 162.575523-36.353693 23.257332-41.547078 19.644542-91.674531-7.902976-109.28688-15.805954-10.16097-29.805513-13.096362-44.030871-9.483572-32.740904 8.580375-60.514223 50.353252-68.4172 65.707607-8.580375 16.483352-28.902315 23.257332-45.611466 14.676957a33.598942 33.598942 0 0 1-14.676957-45.385667c4.290187-8.354576 43.579272-82.190959 111.093274-100.254906 32.966703-8.806174 67.062404-2.709592 98.674311 18.063947 58.03043 37.70849 71.352591 125.318633 30.031312 199.155016-26.418523 47.192062-77.900772 89.416538-149.930761 89.416539zM218.799559 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.644763-22.128335 16.031753-76.320176 2.709592-93.932525-11.515766-14.902756-8.580375-36.127894 6.322382-47.417861s36.127894-8.580375 47.417861 6.322382c34.321499 44.934068 24.386329 129.83462 2.483792 168.446306-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.419184 2.935391-11.064168 4.515987-16.93495 4.515987zM360.149945 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.418964-22.128335 16.031753-76.094377 2.483793-93.932525a33.802161 33.802161 0 1 1 53.740242-41.095479c34.321499 44.934068 24.386329 129.83462 2.483793 168.446306-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.193385 2.935391-10.838368 4.515987-16.709151 4.515987zM504.435722 417.051378c-11.515766 0-22.805733-5.870783-29.128115-16.709151-1.806395-3.161191-44.708269-78.35237-0.225799-156.704741 12.418964-22.128335 16.031753-76.094377 2.483793-93.706725a33.802161 33.802161 0 1 1 53.740242-41.09548c34.321499 44.934068 24.386329 129.83462 2.483793 168.446307-24.837927 44.030871-1.128997 87.610143 0 89.416538 9.031974 16.257552 3.38699 36.805292-12.644763 46.063065-5.193385 2.709592-11.064168 4.290187-16.709151 4.290187z"
                                fill="#1296db" p-id="5748"></path>
                            <path
                                d="M92.12613 715.558104c-10.838368 0-21.450937-5.193385-27.999118-14.676957-10.612569-15.354355-6.77398-36.353693 8.580375-46.966263 6.77398-4.741786 170.478501-115.835061 358.569349-41.547078 146.995369 58.03043 272.314002 4.515987 319.506064-21.225138a33.960221 33.960221 0 1 1 32.515105 59.611025c-55.320838 30.257111-203.219405 93.255127-376.859096 24.837928-153.76935-60.740022-293.764939 33.192503-295.119735 34.321499-5.870783 3.612789-12.644763 5.644983-19.192944 5.644984z"
                                fill="#1296db" p-id="5749"></path>
                        </svg>
                        <span class="text">下午號源</span>
                    </div>
                    <!-- 每一個醫生信息 -->
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor.skill }}</div>
                        </div>
                        <div class="right">
                            <div class="money">{{ doctor.amount }}</div>
                            <el-button type="primary" size="default"
                            @click="goStep2(doctor)">剩餘{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital'
import { useRoute,useRouter } from 'vue-router'
import type { Doctor, DoctorArr, HospitalWorkData, DoctorResponseData } from '@/api/hospital/type'

let pageNo = ref<number>(1);
let limit = ref<number>(6);
let $route = useRoute();
let workData = ref<any>({});
let workTime: any = ref({});
let docArr = ref<DoctorArr>([]);
onMounted(() => {
    fetchWorkData();
});
const fetchWorkData = async () => {
    let result: HospitalWorkData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string);
    // console.log("@@",result)
    if (result.code == 200) {
        workData.value = result.data
        // console.log("@@",result.data)
        workTime.value = workData.value.bookingScheduleList[0];
        // console.log(workTime.value)
        getDoctorWorkData();
    }
}

//獲取排班數據
const getDoctorWorkData = async () => {
    let hoscode: string = $route.query.hoscode as string;
    let depcode: string = $route.query.depcode as string;
    let workDate: string = workTime.value.workDate;
    let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate);
    if (result.code == 200) {
        docArr.value = result.data;
        // console.log(docArr.value)
    }
}

//點擊頂部某一天觸發回調
const changeTime = (item: any) => {
    workTime.value = item;
    getDoctorWorkData();
}

let morningArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 0;
    })
})
let afterArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 1;
    })
})

let $router = useRouter();
const goStep2 = (doctor:Doctor) =>{
    $router.push({
        path:'/hospital/register_step2',
        query:{
            docId:doctor.id
        }
    })
}
</script>

<style scoped lang="scss">
.wrap {
    .top {
        display: flex;
        color: #7f7f7f;

        .line {
            width: 5px;
            height: 20px;
            color: skyblue;
            margin: 0px 5px;
        }

        .dot {
            margin: 0px 5px;
            color: skyblue;
        }
    }

    .center {
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            font-weight: 900;
        }

        .container {
            width: 100%;
            display: flex;
            margin: 30px 0px;

            .item {
                flex: 1;
                border: 1px solid #7f7f7f;
                margin: 0px 5px;
                width: 100%;
                transition: all 0.3s;

                &.active {
                    border: 1px solid #ccc;
                    color: #7f7f7f;

                    .top1 {
                        background-color: #ccc;
                    }
                }

                &.cur {
                    transform: scale(1.05);
                }

                .top1 {
                    background-color: #e8f2ff;
                    height: 30px;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }
    }

    .bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 900;

            .time {
                color: red;
            }

            .will_text {
                color: skyblue;
            }
        }

        .doctor {

            .morning,
            .after {
                .tip {
                    display: flex;
                    align-items: center;

                    .text {
                        color: #7f7f7f;
                        font-weight: 900;
                    }
                }

                .doc_info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0px;
                    border-bottom: 1px solid #ccc;

                    .left {
                        .info {
                            color: skyblue;
                            margin: 10px 0px;

                            span {
                                margin: 0px 5px;
                                font-size: 18px;
                                font-weight: 900;
                            }
                        }

                        .skill {
                            margin: 10px 0px;
                            color: #7f7f7f;
                        }
                    }

                    .right {
                        width: 150px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .money {
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }
                }
            }
        }
    }
}
</style>