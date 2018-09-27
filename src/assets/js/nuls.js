import {nuls_api} from "./config";
import {m, n, p} from "./request";

export function getTxByHash(param, callback) {
  return n(nuls_api.getTxByHash,callback,param);
}
export function getTxList(param, callback) {
  return m(nuls_api.getTxList,callback,param);
}
export function getTxListIndex(param, callback) {
  return m(nuls_api.getTxListIndex,callback,param);
}
export function getTxListByAddress(param, callback) {
  return m(nuls_api.getTxListByAddress,callback,param);
}
export function getBlockList(param, callback) {
  return m(nuls_api.getBlockList,callback,param);
}
export function getBlockListIndex(param, callback) {
  return m(nuls_api.getBlockListIndex,callback,param);
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

export function getTokensList(param,callback){
    return m(nuls_api.getTokensList,callback,param);
}
export function getTokenDetail(param,callback){
    return n(nuls_api.getTokenDetail,callback,param);
}
export function getTransList(param1,param2,urlStr,callback) {
    return p(nuls_api.getTransList,callback,param1,param2,urlStr);
}
export function getHoldersList(param1,param2,urlStr,callback) {
    return p(nuls_api.getHoldersList,callback,param1,param2,urlStr);
}
export function getContractsList(param,callback){
    return m(nuls_api.getContractsList,callback,param);
}
export function getContractsDetail(param,callback){
    return n(nuls_api.getContractsDetail,callback,param);
}
export function getContractsTransactionsList(param1,param2,urlStr,callback) {
    return p(nuls_api.getContractsTransactionsList,callback,param1,param2,urlStr);
}
export function getContractsTxByHash(param,callback){
    return n(nuls_api.getContractsTxByHash,callback,param);
}
export function getTokenListByAddress(param1,param2,urlStr,callback) {
    return p(nuls_api.getTokenListByAddress,callback,param1,param2,urlStr);
}
export function getTokenBalanceListByAddress(param1,param2,urlStr,callback) {
    return p(nuls_api.getTokenBalanceListByAddress,callback,param1,param2,urlStr);
}
