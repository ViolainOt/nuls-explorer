export let nuls_server={
    nodeList:[
        {host:"http://192.168.1.109:8765"},
        {host:"http://data.nuls.io"},
        {host:"http://192.168.1.233:8765"},
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
    getTxSpentHash: "/tx/hash/spent",
    getTxList: "/tx/list",
    getBlockByHash: "/block/hash",
    getBlockByHeight: "/block/height",
    getBlockHeaderByHash: "/block/hash",
    getBlockHeaderByHeight: "/block/height",
    getBlockBesthash: "/block/newest",
    getBlockListAddress: "/block/list/address",
    getBlockList: "/block/list",
    getAccount: "/account",
    getConsensusAgentList: "/consensus/agent/list",
    getConsensusAgent: "/consensus/agent",
    getConsensusAgentStatus: "/consensus/agent/status",
    getSearchData: "/search",
    getTxHistory: "/statistics/history",
    getBalanceListRank: "/statistics/balancelist",
    getAddressMinedlist : "/statistics/minedlist",
    getAccountUtxo: "account/utxo",
    postTxTransaction: "tx/transaction",
    getAllConsensus: "/consensus",
    getMyConsensusRecord: "consensus/deposit/address/",
    getBalance: "/report/balance",
};
