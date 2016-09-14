import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuestionsService, Web3Service, Question, MathJaxDirective } from '../shared/index';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-question',
    templateUrl: 'question.component.html',
    styleUrls: ['question.component.css'],
    directives: [MathJaxDirective]
})

export class QuestionComponent implements OnInit, OnDestroy {
    private sub: Subscription;  // Subscription to get the route params
    private question: Question; // Question object being displayed

    constructor(private route: ActivatedRoute,
                private questionsService: QuestionsService,
                private web3Service: Web3Service,
                private ref: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => { // Get the right question
            let id = params['id'];
            let site = params['site'];
            this.question = this.questionsService.getQuestionFromCache(id, site);
            if (!this.question) {
                this.questionsService.getQuestionBySiteId(id, site).then((question) => {
                    this.question = question;
                    this.ref.detectChanges();
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    parseDate(unixDate: number): Date {
        let date;
        if (unixDate) {
            date = new Date(unixDate*1000).toLocaleString();
        }
        return date;
    }
}
