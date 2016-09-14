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
var index_1 = require('../web3/index');
var index_2 = require('../questions/index');
var router_1 = require('@angular/router');
var NavbarComponent = (function () {
    function NavbarComponent(web3Service, questionsService, router, ref) {
        this.web3Service = web3Service;
        this.questionsService = questionsService;
        this.router = router;
        this.ref = ref;
        this.questionSuccess = true;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountSubscription = this.web3Service.update.subscribe(function () {
            _this.ref.detectChanges();
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.accountSubscription.unsubscribe();
    };
    NavbarComponent.prototype.home = function () {
        this.router.navigate(['/']);
    };
    NavbarComponent.prototype.addQuestion = function (url, amount) {
        this.questionSuccess = false;
        if (this.web3Service.currentAcc && url !== '' && !isNaN(amount) && amount !== 0) {
            this.questionsService.addQuestion(url, amount);
            this.url = '';
            this.amount = undefined;
            this.questionSuccess = true;
        }
    };
    NavbarComponent.prototype.showTutorial = function () {
        return (typeof localStorage['SEDappTutoral'] === 'undefined');
    };
    NavbarComponent.prototype.amountIsNumber = function () {
        return (!isNaN(+this.amount)
            && this.amount !== '');
    };
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-navbar',
            template: "<nav class=\"container-fluid\" [class.dim]=\"showTutorial()\">     <div id=\"app-title\">         <div class=\"clickme background-ease-300\" (click)=\"home()\">STACKEXCHANGE BOUNTIES</div>         <p>Bounties for StackExchange Questions</p>         <span>Powered by <a href=\"https://www.ethereum.org/\" target=\"_blank\">Ethereum</a> + <a href=\"http://www.oraclize.it/\" target=\"_blank\">Oraclize</a></span>     </div>     <div class=\"navbar-button clickme background-ease-300 noselect\" data-toggle=\"modal\" data-target=\"#settingsModal\"><i class=\"fa fa-gears\"></i> Advanced settings</div>     <div id=\"newQ\" class=\"navbar-button clickme background-ease-300 noselect\" [class.noclick]=\"!web3Service.currentAcc\" data-toggle=\"modal\" data-target=\"#newQModal\"><i class=\"fa fa-pencil\"></i> Submit a new question</div> </nav> <div id=\"settingsModal\" class=\"modal fade\" role=\"dialog\">     <div class=\"modal-dialog\">         <div class=\"modal-content\">         <div class=\"modal-body\">             <div class=\"contract\">                 <span>Stack\u039Exchange Bounty contract address:</span>                 <br>                 <input type=\"text\" name=\"contract\" [(ngModel)]=\"web3Service.currentAddr\">                 <button class=\"btn btn-default\">SET</button>             </div>             <div class=\"node\">                 <span>Connect to node:</span>                 <input type=\"text\" name=\"node\" [(ngModel)]=\"web3Service.currentNode\">                 <button class=\"btn btn-default\" (click)=\"web3Service.connectToNode();\">CONNECT</button>                 <br>                 <span *ngIf=\"web3Service.isConnected\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Connected</span>                 <span *ngIf=\"!web3Service.isConnected\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i> Error: Not connected</span>             </div>         </div>         </div>     </div> </div> <div id=\"newQModal\" class=\"modal fade\" role=\"dialog\">     <div class=\"modal-dialog\">         <div class=\"modal-content\">             <div class=\"modal-header\">                 <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">                 <span aria-hidden=\"true\">\u00D7</span>                 </button>                 <h4 class=\"modal-title\" id=\"label\">Submit a new question</h4>             </div>             <div class=\"modal-body\">                 <p *ngIf=\"!web3Service.currentAcc\" id=\"submit-warning\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i><br>Please connect to a node with an unlocked account (advanced settings)</p>                 <form *ngIf=\"web3Service.currentAcc\">                     <div class=\"center\">                         <label for=\"url\">Stack exchange URL</label>                         <input [(ngModel)]=\"url\" name=\"url\" type=\"text\" id=\"url\" class=\"form-control\" placeholder=\"http://example.stackexchange.com/questions/1/question-title\" required>                         <label for=\"amount\">Bounty amount (\u039E)</label>                         <input [(ngModel)]=\"amount\" name=\"amount\" type=\"text\" id=\"amount\" class=\"form-control\" placeholder=\"0.1\" autocomplete=\"off\" required>                         <span id=\"exrate\" *ngIf=\"amountIsNumber()\">= ~$<span>{{(amount*questionsService.rate).toFixed(2)}}</span></span>                     </div>                     <input type=\"submit\" class=\"btn btn-default\" data-dismiss=\"modal\" aria-label=\"Close\" data-toggle=\"modal\" data-target=\"#statusModal\" (click)=\"addQuestion(url, amount)\" value=\"Submit\">                 </form>             </div>         </div>     </div> </div> <div id=\"statusModal\" class=\"modal fade\" role=\"dialog\">     <div class=\"modal-dialog\">         <div class=\"modal-content\">             <div class=\"modal-header\">                 <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">                 <span aria-hidden=\"true\">\u00D7</span>                 </button>                 <h4 class=\"modal-title\" id=\"label\">Submission status</h4>             </div>             <div class=\"modal-body\" id=\"question-status\">                 <div *ngIf=\"questionSuccess\" class=\"success\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Got it! If you're using MetaMask, please login to your vault and accept the transaction. Refresh to see if it's been posted yet.</div>                 <div *ngIf=\"!questionSuccess\" class=\"danger\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i> We had an issue with that question. Make sure you're submitting a valid URL and giving an amount.</div>                 <button class=\"btn btn-default\" *ngIf=\"!questionSuccess\" data-dismiss=\"modal\" aria-label=\"Close\" data-toggle=\"modal\" data-target=\"#newQModal\">Try again</button>             </div>         </div>     </div> </div>",
            styles: [":host {     display: block;     padding: 0;     border-color: #e1e1e1;     border-style: solid;     border-width: 0 0 1px; }  .dim {     opacity: 0.5;     overflow-y: hidden;     pointer-events: none; }  #app-title {     line-height: 48px;     padding: 15px;     display: inline-block; }  #app-title > div {     font-size: 25px; }  #app-title > div:hover {     background: rgba(0,0,0,0.3); }  #app-title > p {     margin-top: 5px;     margin-bottom: 0;     font-size: 13px; }  #app-title a {     float: none;     color: #106cc8;     margin: 0; }  @media (max-width: 479px) {     #app-title {         text-align: center;         display: block;         width: 100%;     } }  @media (max-width: 767px) {       .navbar-button {         width: 100%;         float: none !important;         margin-bottom: 10px;     } }  .navbar-button {     float: right;     text-align: center;     padding: 15px;     margin-top: 10px;     margin-right: 10px;     box-shadow: 0 1px 4px rgba(0,0,0,0.3); }  .navbar-button:hover {     background: rgba(0,0,0,0.3); }  #newQ:hover {     background: rgba(192,216,144,0.3); }  #settingsModal input {     width: 100%;     margin-bottom: 10px; }  #settingsModal button {     float: right;     width: 30%; }  .modal-body > div {      margin-bottom: 20px; }  .modal-body input {     margin-bottom: 15px; }  #submit-warning {     text-align: center; }  #question-status > div {     padding: 10px; }  #exrate {     float: right; }"],
        }), 
        __metadata('design:paramtypes', [index_1.Web3Service, index_2.QuestionsService, router_1.Router, core_1.ChangeDetectorRef])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
