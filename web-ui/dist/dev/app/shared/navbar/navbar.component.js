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
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.css'],
        }), 
        __metadata('design:paramtypes', [index_1.Web3Service, index_2.QuestionsService, router_1.Router, core_1.ChangeDetectorRef])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbmF2YmFyL25hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnRSxlQUFlLENBQUMsQ0FBQTtBQUNoRixzQkFBNEIsZUFBZSxDQUFDLENBQUE7QUFDNUMsc0JBQWlDLG9CQUFvQixDQUFDLENBQUE7QUFDdEQsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFTekM7SUFNSSx5QkFBb0IsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLE1BQWMsRUFDZCxHQUFzQjtRQUh0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUxsQyxvQkFBZSxHQUFZLElBQUksQ0FBQztJQUtLLENBQUM7SUFFOUMsa0NBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUN6RCxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELDhCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxHQUFXLEVBQUUsTUFBYztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLENBQUMsT0FBTyxZQUFZLENBQUMsZUFBZSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7ZUFDakIsSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBakRMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7O3VCQUFBO0lBNkNGLHNCQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtBQTNDWSx1QkFBZSxrQkEyQzNCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWIzU2VydmljZSB9IGZyb20gJy4uL3dlYjMvaW5kZXgnO1xuaW1wb3J0IHsgUXVlc3Rpb25zU2VydmljZSB9IGZyb20gJy4uL3F1ZXN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc2QtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ25hdmJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ25hdmJhci5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgTmF2YmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgYWNjb3VudFN1YnNjcmlwdGlvbjogYW55OyAvLyBXaGVuIHRoZSB3ZWIzU2VydmljZSBkZXRlY3RzIGFuIHVubG9ja2VkIGFjY291bnRcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgYW1vdW50OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBxdWVzdGlvblN1Y2Nlc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWIzU2VydmljZTogV2ViM1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBxdWVzdGlvbnNTZXJ2aWNlOiBRdWVzdGlvbnNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWNjb3VudFN1YnNjcmlwdGlvbiA9IHRoaXMud2ViM1NlcnZpY2UudXBkYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjY291bnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBob21lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG4gICAgfVxuXG4gICAgYWRkUXVlc3Rpb24odXJsOiBzdHJpbmcsIGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVlc3Rpb25TdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLndlYjNTZXJ2aWNlLmN1cnJlbnRBY2MgJiYgdXJsICE9PSAnJyAmJiAhaXNOYU4oYW1vdW50KSAmJiBhbW91bnQgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zU2VydmljZS5hZGRRdWVzdGlvbih1cmwsIGFtb3VudCk7XG4gICAgICAgICAgICB0aGlzLnVybCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5hbW91bnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93VHV0b3JpYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIGxvY2FsU3RvcmFnZVsnU0VEYXBwVHV0b3JhbCddID09PSAndW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgYW1vdW50SXNOdW1iZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoIWlzTmFOKCt0aGlzLmFtb3VudClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmFtb3VudCAhPT0gJycpO1xuICAgIH1cbn1cbiJdfQ==
