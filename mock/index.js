

let Mock =require('mockjs')
export const note =Mock.mock({
    "data|19":[{
        //創建時間
        "moment":new Date(),
        //id
        "id|+1":1,
        //userId
        "userId|+1":10,
        //內容
        "message|24-96":"@cword",
        //label
        "label|0-10":0,
        //name
        "name":"@cname",
        //like
        "like|0-120":0,
        //評論
        "comment|0-120":0,
        //背景色
        "imgurl|0-4":0,
        //是否撤銷
        "revoke|0-20":0,
        //是否舉報
        "report|0-20":0,
        //類型
        "type":1,
    }]
})
//評論
export const commont =Mock.mock({
    "data|19":[{
        //創建時間
        "moment":new Date(),
        //id
        "id|+1":1,
        //userId
        "userId|+1":10,
        //內容
        "message|24-96":"@cword",
        //name
        "name":"@cname",
        //背景色
        "imgurl|0-13":0,
    }]
})
//照片
export const photo =Mock.mock({
    "data|19":[{
        //創建時間
        "moment":new Date(),
        //id
        "id|+1":1,
        //userId
        "userId|+1":10,
        //內容
        "message|24-96":"@cword",
        //label
        "label|0-10":0,
        //name
        "name":"@cname",
        //like
        "like|0-120":0,
        //評論
        "comment|0-120":0,
        //背景色
        "imgurl|0-5":0,
        //是否撤銷
        "revoke|0-20":0,
        //是否舉報
        "report|0-20":0,
        //類型
        "type":2,
    }]
})