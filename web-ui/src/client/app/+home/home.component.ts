import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuestionsService, Web3Service, Question, TUTORIAL_TEXT } from '../shared/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [ChangeDetectorRef]
})

export class HomeComponent implements OnInit, OnDestroy {
    private questionSubscription: any;                    // When QuestionsService adds a new question
    private accountSubscription: any;                     // When Web3Service detects a new account
    private loadMoreText: string = 'Load more questions'; // Text to display for the load more button
    private tutorialSection: number = 1;                  // Current tutorial section

    constructor(private questionsService: QuestionsService,
                private web3Service: Web3Service,
                private ref: ChangeDetectorRef,
                private router: Router) {}

    ngOnInit(): void {
        this.questionsService.initialize();
        this.questionSubscription = this.questionsService.update.subscribe(() => {
            this.ref.detectChanges();
        });
        this.accountSubscription = this.web3Service.update.subscribe(() => {
            this.ref.detectChanges();
        });
    }

    // Garbage collection
    ngOnDestroy(): void {
        this.questionSubscription.unsubscribe();
        this.accountSubscription.unsubscribe();
    }

    labelType(question: Question): string {
        let type;
        if (question.info === 'Completed') {
            type = 'success';
        } else if (question.info === 'Expired') {
            type = 'danger';
        } else {
            type = 'info';
        }
        return type;
    }

    getQuestions(): Question[] {
        return this.questionsService.visibleQuestions;
    }

    gotoQuestion(question: Question) {
        this.router.navigate(['/questions', question.site, question.questionID]);
    }

    loadMore(): void {
        if (!this.questionsService.loadMore()) {
            this.loadMoreText = 'No more questions';
        }
    }

    showTutorial(): boolean {
        return (typeof localStorage['SEDappTutoral'] === 'undefined' && this.tutorialSection < 6); // Make sure we haven't shown the tutorial before
    }

    noTutorial(): void {
        localStorage['SEDappTutoral'] = 'done';
    }

    nextSection(): void {
        this.tutorialSection++;
        if (this.tutorialSection >= 6) { // Hide the tutorial when we're done
            this.noTutorial();
        }
    }

    tutorialText(): string {
        return TUTORIAL_TEXT[this.tutorialSection-1];
    }
}
