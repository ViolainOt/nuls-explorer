import {nuls_api} from "./config";
import {m, n} from "./request";

export function getTxByHash(param, callback) {
  return n(nuls_api.getTxByHash,callback,param);
}
export function getTxList(param, callback) {
  return m(nuls_api.getTxList,callback,param);
}
export function getTxListByAddress(param, callback) {
  return m(nuls_api.getTxListByAddress,callback,param);
}
export function getBlockList(param, callback) {
  return m(nuls_api.getBlockList,callback,param);
}
export function getAllConsensus(callback) {
  return m(nuls_api.getAllConsensus,callback);
}
export function getBalanceListRank(param,callback){
  return m(nuls_api.getBalanceListRank,callback,param);
}
export function getAddressMinedlist(param,callback){
  return m(nuls_api.getAddressMinedlist,callback,param);
}
export function getBlockHeaderDetailByHash(param,callback){
  return n(nuls_api.getBlockHeaderByHash,callback,param);
}
export function getBlockHeaderDetailByHeight(param,callback){
  return n(nuls_api.getBlockHeaderByHeight,callback,param);
}
export function getAccountByAddress(param,callback){
  return n(nuls_api.getAccount,callback,param);
}
export function getConsensusAgentDetail(param,callback){
  return n(nuls_api.getConsensusAgent,callback,param);
}
export function getBlockBesthashDetail(callback){
  return n(nuls_api.getBlockBesthash,callback);
}
export function getTxHistoryList(callback){
  return m(nuls_api.getTxHistory,callback);
}

export function getSearchDataDetail(param,callback){
  return n(nuls_api.getSearchData,callback,param);
}

