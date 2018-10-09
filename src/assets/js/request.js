import axios from 'axios';
import { nuls_server,nuls_defaultType } from "./config";

function e(){
    return {"success":arguments[0]||false,"code":arguments[1]||"","msg":arguments[2]||""};
}
function g(){
    return {"success":true,"code":10000,"msg":arguments[0]||""};
}
/*load url*/
function v(p){
    return nuls_server.nodeList[0].host+nuls_server.requestMain+p;
}
/*request get param type example: ?t=1&x=2*/
export function m(url,callback,param){
    if(!param){param={};}
    param.t=new Date().getTime();
    axios.get(v(url),{params:param}).then(function (response){
        callback(response.data);
    }).catch(function (error) {
        callback(e(false,10002,nuls_defaultType.showError?error:"request failed"));
    });
}
/*request get param type example: a/1*/
export function n(url,callback,param){
    url = v(url);
    for (var i in param) {url += "/"+param[i];}
    url += "?t="+new Date().getTime();
    axios.get(url).then(function (response){
        callback(response.data);
    }).catch(function (error) {
        callback(e(false,10002,nuls_defaultType.showError?error:"request failed"));
    });
}
/*request get param type example: a/1/test1?t=1&x=2*/
export function p(url,callback,param1,param2,urlStr){
    url = v(url);
    for (var i in param1) {url += "/"+param1[i];}
    url += urlStr;
    param2.t=new Date().getTime();
    axios.get(url,{params:param2}).then(function (response){
        callback(response.data);
    }).catch(function (error) {
        callback(e(false,10002,nuls_defaultType.showError?error:"request failed"));
    });
}
/*request post*/
export function o(url,callback,param){
    axios.post(v(url),param||{}).then(function (response){
        callback(response.data);
    }).catch(function (error) {
        callback(e(false,10002,nuls_defaultType.showError?error:"request failed"));
    });
}
