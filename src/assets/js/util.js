import {BigNumber} from 'bignumber.js'
/*save temp data to explorer*/
export function saveDataToTemp(name,value){
    if (window.localStorage) {
        localStorage.setItem(name, value);
    } else {
        Cookie.write(name, value);
    }
}
/*get temp data from explorer*/
export function getDataToTemp(name){
    return window.localStorage? localStorage.getItem(name)||1: Cookie.read(name)||1;
}
export function formatString(str){
    return str.substring(0,4)+"...."+str.substring(str.length-4,str.length);
};
export function getInfactCoin(count){
    if(count){
        count = count.toString();
        var l = count.length,s=9,d=count/100000000,f=d.toString().split('.');
        if(l>=s){
            if(d > 100000000){
                d -= 100000000;
            }
            if(f[1]){
                if(f[1].toString().length===1){
                    d+="0";
                }
            }else{
                d+=".00";
            }
            return d;
        }else{
            if(count === "0"){
                return "0.00";
            }else{
                var k = s-l,r="0.";
                for(var i = 1; i < k; i++){
                    r+=0;
                }
                count = parseInt(count.replace(/(0+)\b/gi,""));
                return r+count;
            }
        }
    }
    return 0;
    /*var m=0,s1=count.toString(),s2="0.00000001";
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    var total = Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)+"";
    return new Number(total);*/
    //return total.split('.')[1]?total.split('.')[1].length==1? total+"0":total:total+".00";
};
export function getTransactionResultAmount(txlist){
    var outputlist = txlist.outputList,
        inputlist = txlist.inputs,
        amout = 0;
    for(var i=0,outputObj;outputObj=outputlist[i++];){
        amout+= outputObj.value;
        for(var j=0,inputObj;inputObj=inputlist[j++];){
            if(outputObj.address==inputObj.address){
                amout -= outputObj.value;
                break;
            }
        }
    }
    return amout;
}
var weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monTh = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
export function formatDateEn(date){
    return weekDay[date.getDay()]+" "+date.getDate()+" "+monTh[date.getMonth()]+" "+date.getFullYear();
}
export function formatDate(date, fmt) {
    if(!fmt){
        fmt = "yyyy-MM-dd hh:mm:ss";
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
    let newPower = new BigNumber(10);
    return newPower.pow(arg);
}
/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function LeftShift(nu, arg) {
    let newDiv = new BigNumber(nu);
    return newDiv.div(arg);
}
/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
    let newDiv = new BigNumber(nu);
    return newDiv.div(arg);
}
/**
 * 数字除以精度系数
 */
export function timesDecimals(nu,decimals) {
    let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
    return newNu.toFormat().replace(/[,]/g, '');
}


