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
var QuestionComponent = (function () {
    function QuestionComponent(route, questionsService, web3Service, ref) {
        this.route = route;
        this.questionsService = questionsService;
        this.web3Service = web3Service;
        this.ref = ref;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            var site = params['site'];
            _this.question = _this.questionsService.getQuestionFromCache(id, site);
            if (!_this.question) {
                _this.questionsService.getQuestionBySiteId(id, site).then(function (question) {
                    _this.question = question;
                    _this.ref.detectChanges();
                });
            }
        });
    };
    QuestionComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    QuestionComponent.prototype.parseDate = function (unixDate) {
        var date;
        if (unixDate) {
            date = new Date(unixDate * 1000).toLocaleString();
        }
        return date;
    };
    QuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-question',
            template: "<div *ngIf=\"question\" class=\"container-fluid\">      <div class=\"panel-container col-xs-12 col-sm-4 col-md-3\">         <button *ngIf=\"question.info !== 'Expired' && question.info !== 'Completed'\" class=\"btn btn-success button-sponsor\" data-toggle=\"modal\" data-target=\"#addrModal\">Sponsor this question</button>         <button *ngIf=\"question.info === 'Completed'\" class=\"btn btn-info button-sponsor\">Question answered!</button>         <button *ngIf=\"question.info === 'Expired'\" class=\"btn btn-danger button-sponsor\">Question expired</button>         <div class=\"panel panel-default\">             <div class=\"panel-heading\">                 Site             </div>             <div class=\"panel-body\" id=\"panel-site\">                 <img src=\"http://cdn.sstatic.net/Sites/{{question.site}}/img/favicon.ico\">                 <strong>{{question.site}}</strong>.stackexchange.com             </div>         </div>         <div class=\"panel panel-default\">             <div class=\"panel-heading\">                 Total Bounty             </div>             <div class=\"panel-body price-container\">                 <span class=\"price-usd\">~$<span>{{(question.totalBounty*questionsService.rate).toFixed(2)}}</span></span>                 <span class=\"price-eth\">~{{(question.totalBounty).toFixed(2)}}\u039E</span>             </div>         </div>         <div class=\"panel panel-default\">             <div class=\"panel-heading\">                 Bounty Expiry Date             </div>             <div class=\"panel-body\">                 {{parseDate(question.expiryDate)}}             </div>         </div>     </div>     <div class=\"question-container col-xs-12 col-sm-8 col-md-9\">         <div class=\"panel panel-default\">             <div class=\"panel-heading\" [innerHtml]=\"question.title\"></div>             <div class=\"panel-body\" id=\"question-body\" [MathJax]=\"question.body\"></div>             <div id=\"owner\">Asked by <img id=\"profile-image\" src=\"{{question.owner.profile_image}}\"><a href=\"{{question.owner.link}}\" target=\"_blank\"> {{question.owner.display_name}}</a></div>         </div>         <a href=\"{{question.link}}\" target=\"_blank\">             <div id=\"answers\" class=\"panel panel-default background-ease-300\">                 See the answers <i class=\"fa fa-external-link\" aria-hidden=\"true\"></i>             </div>         </a>         <div id=\"sponsors\">             <h5>Sponsors:</h5>             <table class=\"table table-bordered price-container\">                 <thead>                 <tr>                     <th>amount</th>                     <th>address</th>                 </tr>                 </thead>                 <tbody>                 <tr *ngFor=\"let sponsor of question.sponsors\">                     <td>                         <span class=\"price-usd\">~$<span>{{(sponsor.amount*questionsService.rate).toFixed(2)}}</span></span>                         <span class=\"price-eth\">~{{(sponsor.amount).toFixed(2)}}\u039E</span>                     </td>                     <td>{{sponsor.address}}</td>                 </tr>                 </tbody>             </table>         </div>     </div> </div> <div *ngIf=\"!question\" class=\"horiz-center-container\">     <i class=\"fa fa-refresh fa-spin fa-3x fa-fw\"></i>     <span class=\"sr-only\">Loading...</span> </div> <div *ngIf=\"question\" id=\"addrModal\" class=\"modal fade\" role=\"dialog\">   <div class=\"modal-dialog\">     <div class=\"modal-content\">       <div class=\"modal-header\">         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">             <span aria-hidden=\"true\">\u00D7</span>         </button>         <h4 *ngIf=\"question.info !== 'Expired' && question.info !== 'Completed'\" class=\"modal-title\" id=\"myModalLabel\">Sponsor this question</h4>         <h4 *ngIf=\"question.info === 'Completed'\" class=\"modal-title\" id=\"myModalLabel\">Question answered!</h4>       </div>       <div *ngIf=\"question.info !== 'Expired' && question.info !== 'Completed'\" class=\"modal-body\">         <p>You can become a sponsor for this question by sending a transaction with any wallet to the following Ethereum address. The transaction must have a custom gas value of 70000.<p>         <div class=\"center\" style=\"margin-top:10px;margin-bottom:7px;\">             <input type=\"text\" value=\"\" id=\"contractAddrInput\" class=\"form-control\" readonly=\"\" onclick=\"this.select();\" [(ngModel)]=\"question.contractAddr\">         </div>       </div>     </div>   </div> </div>",
            styles: [":host {     display: block;     padding: 16px 0; }  @media (max-width: 767px) {     .container-fluid {         padding: 0;     } }  #panel-site {     font-size: 14px; }  .button-sponsor {     width: 100%;     margin-bottom: 15px; }  #answers {     cursor: pointer;     padding: 15px;     text-align: center; }  #answers:hover {     background: rgba(0,0,0,0.1); }  #owner {     padding: 10px; }  #owner > a {     cursor: pointer; }  #profile-image {     width: 20px; }  #sponsors {     overflow: auto; }  #contractAddrInput {     display: inline-block;      right: 0;      left: 0;      text-align: center;     border-radius: 5px;     -moz-border-radius:5px;     border: 1px dashed #B5B5B5;     background-color: #F5F5F5; }  #addrModal .modal-body {     text-align: center; }  #question-body {     overflow-x: auto; }"],
            directives: [index_1.MathJaxDirective]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.QuestionsService, index_1.Web3Service, core_1.ChangeDetectorRef])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
