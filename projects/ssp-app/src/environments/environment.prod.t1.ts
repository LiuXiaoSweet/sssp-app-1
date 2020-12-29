export const environment = {
    production: true,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    tokenSymbol: "BST",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'bstDAI' }, { symbol: 'bstBUSD' }, { symbol: 'bstUSDT' }],
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
                    address: "0x573Ee78247962b773934616D8ba0501c899540Bd"
                },
                pid: 0
            }
        },
        1337: {
            enabled: true,
            name: 'DEV',
            rpc: 'http://localhost:8545/',
            contracts: {
                proxy: {
                    address: "0xFc50cC3eC8631c3BD61B834Fd8EfA4BA2B11A035"
                },
                pid: 0
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
                pid: 0
            }
        }
    },
};
