import { Component, OnInit } from '@angular/core';
import { BootService } from '../services/boot.service';

@Component({
    selector: 'app-reward-info',
    templateUrl: './reward-info.component.html',
    styleUrls: ['./reward-info.component.scss']
})
export class RewardInfoComponent implements OnInit {

    constructor(public boot: BootService) { }

    ngOnInit(): void {
    }

    allocationPercent() {
        return this.boot.poolInfo.allocPoint.div(this.boot.poolInfo.totalAllocPoint).multipliedBy(100);
    }

    farmingRewardPercent() {
        return this.boot.poolInfo.shareRewardRate.multipliedBy(100);
    }
    volRewardPercent() {
        return this.boot.poolInfo.swapRewardRate.multipliedBy(100);
    }
}
