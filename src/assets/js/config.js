export let nuls_server={
    nodeList:[
        {host:"https://apiserver.nuls.io"},
        {host:"http://192.168.1.59:8765"},
        {host:"http://data.nuls.io"},
        {host:"http://192.168.1.121:8764"},
        {host:"http://192.168.1.233:8765"},
        {host:"http://39.108.121.242:8005"}
    ],
    requestMain: "/nuls"
};
export let nuls_defaultType={
    showError: false
};
/*api request url li    st*/
export let nuls_api= {
    getTxByHash: "/tx/hash",
    getTxList: "/tx/list",
    getTxListIndex: "/tx/index",
    getTxListByAddress: "/tx/list/address",
    getBlockList: "/block/list",
    getBlockListIndex: "/block/index",
    getAllConsensus: "/consensus",
    getBalanceListRank: "/statistics/balancelist",
    getAddressMinedlist : "/statistics/minedlist",
    getBlockHeaderByHash: "/block/hash",
    getBlockHeaderByHeight: "/block/height",
    getAccount: "/balance/get",
    getConsensusAgent: "/consensus/agent",
    getBlockBesthash: "/block/newest",
    getTxHistory: "/statistics/history",
    getSearchData: "/search"
};
