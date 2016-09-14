import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../web3/index';
import { QuestionsService } from '../questions/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
})

export class NavbarComponent implements OnInit, OnDestroy {
    private accountSubscription: any; // When the web3Service detects an unlocked account
    private url: string;
    private amount: string;
    private questionSuccess: boolean = true;

    constructor(private web3Service: Web3Service,
                private questionsService: QuestionsService,
                private router: Router,
                private ref: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.accountSubscription = this.web3Service.update.subscribe(() => {
            this.ref.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.accountSubscription.unsubscribe();
    }

    home(): void {
        this.router.navigate(['/']);
    }

    addQuestion(url: string, amount: number): void {
        this.questionSuccess = false;
        if (this.web3Service.currentAcc && url !== '' && !isNaN(amount) && amount !== 0) {
            this.questionsService.addQuestion(url, amount);
            this.url = '';
            this.amount = undefined;
            this.questionSuccess = true;
        }
    }

    showTutorial(): boolean {
        return (typeof localStorage['SEDappTutoral'] === 'undefined');
    }

    amountIsNumber(): boolean {
        return (!isNaN(+this.amount)
                && this.amount !== '');
    }
}
