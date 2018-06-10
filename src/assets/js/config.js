export let nuls_server={
    nodeList:[
        {host:"http://192.168.1.233:8765"},
        {host:"http://192.168.1.109:8765"},
        {host:"http://data.nuls.io"},
        {host:"http://39.108.121.242:8005"},
        {host:"http://127.0.0.1:8765"}
    ],
    requestMain: "/nuls"
};
export let nuls_defaultType={
    showError: false
};

/*api request url list*/
export let nuls_api= {
    getTxByHash: "/tx/hash",
    getTxList: "/tx/list",
    getTxListByAddress: "/tx/list/address",
    getBlockList: "/block/list",
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
