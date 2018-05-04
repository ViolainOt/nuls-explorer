export function formatTxClass(status){
  switch (status){
    case 1:
      return "consensus-reward";
    case 2:
      return "tokens-trading";
    case 3:
      return "change-money";
    case 4:
      return "change-money";
    case 5:
      return "change-money";
    case 11:
      return "set-alias";
    case 90:
      return "consensus-building";
    case 91:
      return "entrust-consensus";
    case 92:
      return "stop-consensus";
    case 93:
      return "yellow-card";
    case 94:
      return "red-card";
    default:
      return "consensus-reward";
  }
};
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
  count = count.toString();
  if(count){
    var l = count.length,s=9,d=count/100000000,f=d.toString().split('.');
    if(l>s){
      if(!f[1]){
        d+=".00";
      }
      return d;
    }else if(l===s){
      return d+".00";
    }else{
      if(count === "0"){
        return "0.00";
      }else{
        var k = s-l,r="0.";
        for(var i = 0; i < k; i++){
          r+=0;
        }
        count = count.replace(/0/g,'');
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
  var outputlist = txlist.outputs,
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


