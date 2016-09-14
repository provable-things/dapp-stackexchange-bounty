"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../shared/index');
var router_1 = require('@angular/router');
var HomeComponent = (function () {
    function HomeComponent(questionsService, web3Service, ref, router) {
        this.questionsService = questionsService;
        this.web3Service = web3Service;
        this.ref = ref;
        this.router = router;
        this.loadMoreText = 'Load more questions';
        this.tutorialSection = 1;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.questionsService.initialize();
        this.questionSubscription = this.questionsService.update.subscribe(function () {
            _this.ref.detectChanges();
        });
        this.accountSubscription = this.web3Service.update.subscribe(function () {
            _this.ref.detectChanges();
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.questionSubscription.unsubscribe();
        this.accountSubscription.unsubscribe();
    };
    HomeComponent.prototype.labelType = function (question) {
        var type;
        if (question.info === 'Completed') {
            type = 'success';
        }
        else if (question.info === 'Expired') {
            type = 'danger';
        }
        else {
            type = 'info';
        }
        return type;
    };
    HomeComponent.prototype.getQuestions = function () {
        return this.questionsService.visibleQuestions;
    };
    HomeComponent.prototype.gotoQuestion = function (question) {
        this.router.navigate(['/questions', question.site, question.questionID]);
    };
    HomeComponent.prototype.loadMore = function () {
        if (!this.questionsService.loadMore()) {
            this.loadMoreText = 'No more questions';
        }
    };
    HomeComponent.prototype.showTutorial = function () {
        return (typeof localStorage['SEDappTutoral'] === 'undefined' && this.tutorialSection < 6);
    };
    HomeComponent.prototype.noTutorial = function () {
        localStorage['SEDappTutoral'] = 'done';
    };
    HomeComponent.prototype.nextSection = function () {
        this.tutorialSection++;
        if (this.tutorialSection >= 6) {
            this.noTutorial();
        }
    };
    HomeComponent.prototype.tutorialText = function () {
        return index_1.TUTORIAL_TEXT[this.tutorialSection - 1];
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-home',
            template: "<div id=\"main-tainer\" class=\"container-fluid\" [class.dim]=\"showTutorial()\">     <div class=\"col-xs-12 col-sm-4\" id=\"sidebar\">         <div id=\"wrapper\" class=\"panel panel-default\">             <p *ngIf=\"!web3Service.currentAcc\" class=\"danger sidebar-info\"><i class=\"fa fa-times fa-fw\" aria-hidden=\"true\"></i> No unlocked accounts found. Please connect one in advanced settings.</p>             <p *ngIf=\"web3Service.currentAcc\" class=\"success sidebar-info\"><i class=\"fa fa-check fa-fw\" aria-hidden=\"true\"></i> Found an unlocked account:<br>                 <span>{{web3Service.currentAcc}}</span>             </p>             <p *ngIf=\"web3Service.addingQuestion\" class=\"success sidebar-info\"><i class=\"fa fa-refresh fa-spin fa-fw\"></i> Submitting your question.</p>             <button id=\"sort\" class=\"clickme btn btn-default\" (click)=\"questionsService.toggleSort()\">Sort by {{questionsService.sortingMethod}}</button>         </div>     </div>     <div class=\"container col-xs-12 col-sm-8\">         <div *ngFor=\"let question of getQuestions()\" class=\"panel panel-default question-panel background-ease-300 clickme price-container\" (click)=\"gotoQuestion(question)\">             <div class=\"site-image\">                 <img src=\"http://cdn.sstatic.net/Sites/{{question.site}}/img/favicon.ico\">                 <span>{{question.site}}</span>             </div>             <div class=\"question-info\">                 <div class=\"question-title\" [MathJax]=\"question.title\"></div>                 <span class=\"question-prices\">                     <span class=\"label label-success price-usd\">~$<span>{{(question.totalBounty*questionsService.rate).toFixed(2)}}</span></span>                     <span class=\"label label-primary price-eth\">~{{(question.totalBounty).toFixed(2)}}\u039E</span>                 </span>                 <div class=\"label label-{{labelType(question)}}\">{{question.text}} {{question.info}}</div>                 <div class=\"question-owner\">Asked by: {{question.owner.display_name}}</div>             </div>         </div>         <div *ngIf=\"!questionsService.isReady\" class=\"horiz-center-container\">             <i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i>             <span class=\"sr-only\">Loading...</span>         </div>         <button *ngIf=\"questionsService.isReady\" id=\"loadmore\" class=\"clickme btn btn-default\" (click)=\"loadMore()\">{{loadMoreText}}</button>     </div> </div> <div *ngIf=\"showTutorial()\" id=\"tutorial\" class=\"panel panel-default col-xs-10 col-xs-push-1 col-sm-6\">     <button type=\"button\" class=\"close\" (click)=\"noTutorial()\">         <span aria-hidden=\"true\">\u00D7</span>     </button>     <div class=\"panel-body\">         <span [innerHtml]=\"tutorialText()\"></span>         <br><br>         <button class=\"btn btn-default\" (click)=\"nextSection()\">Next</button>     </div> </div>",
            styles: [":host {     display: block;     padding: 16px 0px; }  @media (max-width: 767px) {     .container-fluid {         padding: 0;     } }  .dim {     opacity: 0.5;     pointer-events: none; }  .question-panel {     padding: 10px;     position: relative;     display: -webkit-flex;     display: -ms-flexbox;     display: flex;     min-height: 120px; }  .question-panel:hover {     background: rgba(0,0,0,0.1); }  .question-info {     margin-left: 10px;     margin-top: 5px;     width: 75%; }  .question-title {     font-size: 20px;     padding-right: 5px;     display: block; }  .question-owner {     display: inline-block;     font-size: 14px;     margin-left: 10px; }  .site-image {     display: inline-block;     width: 50px;     font-size: 10px;     margin-right: 15px;     text-align: center; }  .site-image > img {     margin-top: 15px;     width: 32px; }  #sidebar {     display: block; }  @media (min-width: 768px) {     #sidebar {         position: fixed;         right: 16px;     } }  #wrapper {     padding: 20px; }  .sidebar-info {     padding: 20px;     overflow-x: auto; }  .sidebar-info > span {     font-size: 14px; }  #tutorial {     position: fixed;     z-index: 99999;     opacity: 1;     left: 50%;     top: 25%;     -webkit-transform: translate(-50%, 0);             transform: translate(-50%, 0); }"],
            providers: [core_1.ChangeDetectorRef]
        }), 
        __metadata('design:paramtypes', [index_1.QuestionsService, index_1.Web3Service, core_1.ChangeDetectorRef, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
