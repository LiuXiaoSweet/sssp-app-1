import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import BigNumber from 'bignumber.js';
import { BootService } from '../services/boot.service';
import { ChooseWalletDlgComponent } from '../choose-wallet-dlg/choose-wallet-dlg.component';
import { IntallWalletDlgComponent } from '../intall-wallet-dlg/intall-wallet-dlg.component';

export enum ActionStatus {
    None, Transfering, TrasactionEnd
}

export enum LoadStatus {
    None, Loading, Loaded
}
@Component({
    selector: 'app-redeemliquidity-comp',
    templateUrl: './redeemliquidity-comp.component.html',
    styleUrls: ['./redeemliquidity-comp.component.scss']
})
export class RedeemliquidityCompComponent implements OnInit {

    amts: Array<number>;

    redeemPercent: number = 0;

    redeemToIndex: string = '4';

    depositPercent: number = 0;

    depositLPAmt: BigNumber = new BigNumber(0);

    needApproveLP: boolean = false;

    withdrawLPPercent: number = 0;

    withdrawLPAmt: BigNumber = new BigNumber(0);

    status: ActionStatus = ActionStatus.None;

    loadStatus: LoadStatus = LoadStatus.None;

    @Output() loading: EventEmitter<any> = new EventEmitter();
    @Output() loaded: EventEmitter<any> = new EventEmitter();

    slideToggleColor: ThemePalette = "accent";

    @ViewChild('redeemToThree')
    redeemToThree: MatSlideToggle;

    constructor(public boot: BootService, private dialog: MatDialog) {
        this.amts = new Array();
        this.boot.coins.forEach((e, i, arr) => {
            this.amts.push(0);
        });
        this.boot.walletReady.subscribe(() => {
            this.updateLPApproveStatus();
        });
    }

    ngOnInit(): void {
    }

    async redeemCoin() {
        await this.boot.loadData();
        if (this.redeemPercent && this.redeemPercent !== 0) { // 输入要赎回流动性的数量（百分比）
            let lps = this.boot.balance.lp.multipliedBy(this.redeemPercent).dividedBy(100).toFixed(18, BigNumber.ROUND_UP);
            if (Number(this.redeemToIndex) >= 0 && Number(this.redeemToIndex) <= 2) { // 赎回成一种币
                this.status = ActionStatus.Transfering;
                this.loading.emit();
                this.boot.redeemToOneCoin(lps, this.redeemToIndex, this.amts[this.redeemToIndex]).then(res => {
                    this.status = ActionStatus.TrasactionEnd;
                    this.boot.loadData();
                    this.loaded.emit();
                    this.redeemPercentChange(0);
                });
            } else { // 赎回成3种币
                this.status = ActionStatus.Transfering;
                this.loading.emit();
                let amts: Array<string> = new Array();
                this.amts.forEach(e => {
                    amts.push(String(e));
                });
                this.boot.redeemToAll(lps, amts).then(res => {
                    this.status = ActionStatus.TrasactionEnd;
                    this.boot.loadData();
                    this.loaded.emit();
                    this.redeemPercentChange(0);
                });
            }
        } else {
            // 根据输入的币的数量赎回
            this.status = ActionStatus.Transfering;
            this.loading.emit();
            let amtsStr = new Array();
            this.amts.forEach((e, i, arr) => {
                amtsStr.push(String(e));
            })
            this.boot.redeemImBalance(amtsStr).then(r => {
                this.status = ActionStatus.TrasactionEnd;
                this.boot.loadData();
                this.loaded.emit();
                this.redeemPercentChange(0);
            });
        }
    }

    redeemPercentChange(val) {
        if (!this.redeemPercent || this.redeemPercent === 0) {
            this.redeemToThree.checked = true;
        }
        this.redeemPercent = val;
        if (this.redeemPercent && this.redeemPercent !== 0) {
            if (this.redeemToThree.checked) {
                let lps = this.boot.balance.lp.multipliedBy(this.redeemPercent).dividedBy(100);
                this.amts.forEach((e, i, arr) => {
                    let amt = this.boot.poolInfo.coinsRealBalance[i].multipliedBy(lps).div(this.boot.poolInfo.totalSupply);
                    arr[i] = Number(amt.toFixed(9, BigNumber.ROUND_DOWN))
                });
            } else {
                this.redeemToIndexChange(this.redeemToIndex).then();
            }
        }
    }

    async redeemToIndexChange(val) {
        this.redeemToThree.checked = false;
        this.redeemToIndex = val;
        let lps = this.boot.balance.lp.multipliedBy(this.redeemPercent).dividedBy(100).toFixed(18, BigNumber.ROUND_DOWN);
        let res = await this.boot.calcWithdrawOneCoin(lps, this.redeemToIndex);
        this.amts.forEach((e, i, arr) => {
            if (Number(this.redeemToIndex) === i) {
                arr[i] = Number(new BigNumber(res).dividedBy(new BigNumber(10).exponentiatedBy(18)).toFixed(9));
            } else {
                arr[i] = null;
            }
        });
    }

    reset(val) {
        if (val.checked) {
            this.redeemPercentChange(this.redeemPercent);
            this.redeemToIndex = '-1';
        }
    }

    public async connectWallet() {
        if (!this.boot.isMetaMaskInstalled() && !this.boot.isBinanceInstalled()) {
            this.dialog.open(IntallWalletDlgComponent, { width: '30em' });
            return;
        } else {
            this.chooseWallet();
        }
    }
    chooseWallet() {
        this.dialog.open(ChooseWalletDlgComponent, { width: '30em' });
    }

    updateLPApproveStatus() {
        this.boot.allowanceLP(this.boot.chainConfig.contracts.proxy.address).then(amt => {
            if (this.depositLPAmt.comparedTo(amt) > 0) {
                this.needApproveLP = true;
            } else {
                this.needApproveLP = false;
            }
        });
    }

    depositPercentChange(val) {
        this.depositPercent = val;
        if (this.depositPercent && this.depositPercent !== 0) {
            this.depositLPAmt = this.boot.balance.lp.multipliedBy(this.depositPercent).dividedBy(100);
            this.depositLPAmt = new BigNumber(this.depositLPAmt.toFixed(9, BigNumber.ROUND_DOWN));
        }
        this.updateLPApproveStatus();
    }

    approveLP() {
        this.loading.emit();
        this.loadStatus = LoadStatus.Loading;
        this.boot.approveLP(this.depositLPAmt.toFixed(9, BigNumber.ROUND_DOWN), this.boot.chainConfig.contracts.proxy.address).then(() => {
            this.updateLPApproveStatus();
            this.boot.loadData();
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
        });
    }

    depositLP() {
        this.loading.emit();
        this.loadStatus = LoadStatus.Loading;
        this.boot.depositLP(this.depositLPAmt.toFixed(18, BigNumber.ROUND_DOWN)).then(() => {
            this.boot.loadData();
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
            this.depositPercentChange(0);
        });
    }

    withdrawLPPercentChange(val) {
        this.withdrawLPPercent = val;
        if (this.withdrawLPPercent && this.withdrawLPPercent !== 0) {
            this.withdrawLPAmt = this.boot.balance.stakingLP.multipliedBy(this.withdrawLPPercent).dividedBy(100);
        }
    }

    withdrawLP() {
        this.loading.emit();
        this.loadStatus = LoadStatus.Loading;
        this.boot.withdrawLP(this.withdrawLPAmt.toFixed(18, BigNumber.ROUND_DOWN)).then(() => {
            this.boot.loadData();
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
            this.withdrawLPPercentChange(0);
        });
    }

    withdrawAllLP() {
        this.loading.emit();
        this.loadStatus = LoadStatus.Loading;
        this.boot.emergencyWithdraw().then(() => {
            this.boot.loadData();
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
        });
    }

    getPending() {
        this.loading.emit();
        this.loadStatus = LoadStatus.Loading;
        this.boot.withdrawLP("0").then(() => {
            this.boot.loadData();
            this.loaded.emit();
            this.loadStatus = LoadStatus.Loaded;
        });
    }
}
