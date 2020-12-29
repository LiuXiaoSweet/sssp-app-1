export const environment = {
    production: true,
    poolId: "p2",
    liquiditySymbol: "BSLP-02",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'BTCB' }, { symbol: 'renBTC' }, { symbol: 'anyBTC' }],
    chains: {
        56: {
            enabled: false,
            name: 'BSC Mainnet',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
            }
        },
        97: {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                proxy: {
                    address: "0xe6D92fed3b36188bD37b63C86419822Eec6e07B5"
                },
                pid: 1
            }
        },
        1337: {
            enabled: true,
            name: 'DEV',
            rpc: 'http://localhost:8545/',
            contracts: {
                proxy: {
                    address: "0x4F25a6F127adCBFf0C29CBB029Eff908Db2dD56c"
                },
                pid: 1
            }
        },
        "Binance-Chain-Ganges": {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                proxy: {
                    address: "0xe6D92fed3b36188bD37b63C86419822Eec6e07B5"
                },
                pid: 1
            }
        }
    },
};