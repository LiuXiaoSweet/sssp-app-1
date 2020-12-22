// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    poolId: "p1",
    liquiditySymbol: "BSLP-01",
    virtualPriceDiff: 0.006,
    coins: [{ symbol: 'DAI' }, { symbol: 'BUSD' }, { symbol: 'USDT' }],
    chains: {
        56: {
            enabled: false,
            name: 'BSC Main Net',
            rpc: 'https://bsc-dataseed.binance.org/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x936EaEB69174e9f67b07213890DF8E0c29A71c83',
                }
            }
        },
        97: {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x936EaEB69174e9f67b07213890DF8E0c29A71c83',
                }
            }
        },
        "Binance-Chain-Ganges": {
            enabled: true,
            name: 'BSC Testnet',
            rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            contracts: {
                coins: [
                    { symbol: 'DAI', address: '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867' },
                    { symbol: 'BUSD', address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee' },
                    { symbol: 'USDT', address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd' },
                ],
                Pool: {
                    address: '0x936EaEB69174e9f67b07213890DF8E0c29A71c83',
                }
            }
        }
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
