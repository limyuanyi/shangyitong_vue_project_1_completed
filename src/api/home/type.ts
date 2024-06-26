//定義首頁模塊接口類型

export interface ResponseData {
    code: number;
    message: string,
    ok: boolean,
}

//代表醫院已有的數據類型

export interface Hospital {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "hostypeString": string,
        "fullAddress": string,
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[],
    },
}

export type Content = Hospital[];

export interface HospitalResponseData extends ResponseData{
    data:{
        content:Content,
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": 0,
            "pageSize": 2,
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    }
}


//level%region
export interface HospitalLevelAndRegion {
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

export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[]

export interface HospitalLevelAndRegionResponseData extends ResponseData{
    data:HospitalLevelAndRegionArr
}

export interface HospitalInfo extends ResponseData{
    data:Content
}