/**
 * Created by k on 2017/11/10.
 */
var userDetail = JSON.parse(sessionStorage.getItem('userDetail'));
virtual = {};
// virtual.project_id = 'cfbb1f77f0df4685838b63d8599e8764';
virtual.project_id = userDetail.companyInfo.projectId;
//获取token
virtual.access_token = userDetail.childToken;

//获取用户id
virtual.user_id = userDetail.userInfo.userId;
console.log(userDetail);
//服务器请求基本地址
virtual.serverBaseUrl1 = 'https://evs.hz1.chanyecloud.com';//云硬盘
virtual.serverBaseUrl2 = 'https://vpc.hz1.chanyecloud.com';//虚拟私有云
virtual.serverBaseUrl3 = 'https://ims.hz1.chanyecloud.com'; //镜像模块
virtual.serverBaseUrl4 = 'https://ecs.hz1.chanyecloud.com'; //云主机模块
virtual.serverBaseUrl = 'http://172.16.105.146:8080/chanyecloud-user';//购买云主机
virtual.serverBaseUrl5 = 'http://192.168.1.133:8080/chanyecloud-user';//镜像


//封装一个基本请求
virtual.web_query = function(fun_url, params, onSuccess, onError, type, dataType, async) {
    async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    // dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
    // fun_url = virtual.serverBaseUrl + fun_url;
    onSuccess = arguments[2] ? arguments[2] : function() {};
    // onSuccess = function() {};
    onError = arguments[3] ? arguments[3] : function() {};
    // console.log(arguments[2]);
    $.ajax({
        url: fun_url,
        type: type,
        dataType: 'json',
        contentType: 'application/json',
        timeout: 10000,
        async: true,
        headers: {
            'X-Auth-Token': virtual.access_token
        },
        data: params,
        success: function(data) {
            // console.log(data);
            onSuccess(data);
            // console.log('wwww');
        },
        error: function(xhr, type, errorThrown) {
            console.log(errorThrown);
            onError(xhr);
        }
    })
};
// 封装一个的get请求
// url 请求地址
// params 参数数据
// onSuccess 成功回调
// onError 失败回调
virtual.web_get = function(url,params,onSuccess, onError) {
    virtual.web_query(url, params, onSuccess, onError, "GET");
};
virtual.web_post = function(url,params,onSuccess, onError) {
    virtual.web_query(url,params,onSuccess, onError, "POST");
};
virtual.web_put = function(url, params, onSuccess, onError) {
    virtual.web_query(url, params,onSuccess, onError, "PUT");
};
virtual.web_delete = function(url, params,onSuccess, onError) {
    virtual.web_query(url, params,onSuccess, onError, "DELETE");
};



//判断一个对象是否为空
virtual.isEmptyObject = function(obj) {
    for (var key in obj) {
        return true;
    }
    return false;
};
//获取地址栏参数
virtual.GetQueryString=function(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}