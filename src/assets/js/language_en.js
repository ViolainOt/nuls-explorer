module.exports = {
    title: 'NULS BlockChain Explorer and Search',
    nav: {
        index: 'Home',
        rank: 'Rank',
        currencyAccount: 'Currency',
        outPieceAccount: 'Producer',
        tool: 'Tool',
        toolHit: 'Wait',
        wallet: 'Wallet',
        clientDownloads: 'Client',
        webWallet: 'Web'
    },
    second: {
        index_NULS: 'NULS Mainnet',
        block: 'Block',
        more: 'More',
        history: '14 days trading history',
        transaction: 'Transaction',
        transactions: 'Transactions',
        consensusReward: 'Consensus reward',
        enter: 'Input',
        outPut: 'Output',
        fee: 'Fee',
        amount: 'Amount',
        totalMortgage: 'Deposit',
        consensusNodeAccount: 'All nodes',
        consensusPeople: 'Consensus nodes',
        tokenCirculation: 'Initial issue quantity',
        dailyConsensusNodeReward: 'Daily consensus reward',
        transList: 'Transactions',
    },
    blockList: {
        blockList: 'Block List',
        height: 'Height',
        time: 'Time',
        blockNodeName: 'producer',
        transactionCount: 'Transactions',
        size: 'Size',
        blockReward: 'Block reward',
    },
    currencyAccount:{
        number: 'No.',
        address: 'Address',
        balance: 'Balance',
        transactionCount: 'Transactions',
    },
    outPieceAccount:{
        number: 'No.',
        address: 'Address',
        blockReward: 'Block reward',
        reward: 'Reward',
        lastRewardBlock: 'Last reward block ',
        consensusStatus: 'Consensus status',
        pieceMessage: 'Note: this information is counted every hour',
    },
    consensus:{
        i0: "Wait",
        i1: "Active",
        inull: "unknown",
    },
    utxoStatus:{
        i0:"Unspent",
        i1:"Locked",
        i2:"Locked",
        i3:"Spent",
        iburned:"Burned",
        inull: "unknown",
    },
    consensusNode:{
        consensusNode: 'Consensus node',
        accountInfo: 'Account information',
        blockAddress: 'Block address',
        nodeName: 'Node name',
        consensusStatus: 'Consensus status',
        blockCount: 'Block amount',
        transactionCount: 'Transactions',
        consensusReward: 'Rewards',
        margin: 'Margin',
        consensusFormatter:{
            i1: "Waiting for consensus",
            i2: "Consensus",
            i0: "Not join",
            inull: "unknown",
        }
    },
    blockDetail: {
        blockDetail: 'Block detail',
        blockHash: 'Block hash',
        confirmCount: 'Confirms',
        transactionCount: 'Transactions',
        transactionFee: 'Transaction fee',
        blockNodeName: 'Producer',
        previousBlock: 'Previous block',
        nextBlock: 'Next block'
    },
    transDetail: {
        transDetail: "Details",
        transType: "Type",
        transHash: "Hash",
        transHeight: "Height",
        transConfirmCount: "Confirms",
        transTime: "Time",
        transInput: "Inputs",
        transOutput: "Outputs",
        transFee: "Fee",
        mark: "Remark",
        transTypeDetail:{
            i1: "Consensus reward",
            i2: "Transfer transaction",
            i3: "Set up a name",
            i4: "Create",
            i5: "Join consensus",
            i6: "Withdraw from the consensus",
            i7: "Yellow card",
            i8: "Red card",
            i9: "Unregister",
            inull: "unknown",
        },
    },
    page:{
        previous:'Previous',
        next: 'Next',
        goTo: 'GO',
        total: 'Total',
        page: 'Page',
    },
    accountInfo: {
        accountInfo: 'Account information',
        address: 'address',
        canUseBalance: 'Available',
        freezeBalance: 'Freeze',
        transactionCount: 'Transactions',
    },
    notice: {
        noNet: 'Failed to read data, please check the network',
        notice: 'Notice',
        determine: 'YES',
        noMessage: 'No message',
        not: 'None',
        noBlockMessage: 'No Block Message',
        noTransMessage: 'No Trans Message',
        searchFailed: 'No information found',
        searchNull: 'Please enter the content',
        consensusDetail: 'Failed to read Consensus node details data',
        transCount: 'Transactions',
        numberError: 'Please enter a correct number',
        transDate: 'Date',
        underDevelopment: 'Under Development'
    },
    el: {
        pagination: {
            goto: 'Go to',
            pagesize: '/page',
            total: 'Total {total}',
            pageClassifier: ''
        },
        messagebox: {
            title: 'Notice',
            confirm: 'OK',
            cancel: 'Cancel',
            error: 'Illegal input'
        },
    },
    other: {
        semicolon: ' : '
    }
}
