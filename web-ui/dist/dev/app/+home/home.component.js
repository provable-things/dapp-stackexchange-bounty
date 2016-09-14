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
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            providers: [core_1.ChangeDetectorRef]
        }), 
        __metadata('design:paramtypes', [index_1.QuestionsService, index_1.Web3Service, core_1.ChangeDetectorRef, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9ob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdFLGVBQWUsQ0FBQyxDQUFBO0FBQ2hGLHNCQUF1RSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pGLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBVXpDO0lBTUksdUJBQW9CLGdCQUFrQyxFQUNsQyxXQUF3QixFQUN4QixHQUFzQixFQUN0QixNQUFjO1FBSGQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTjFCLGlCQUFZLEdBQVcscUJBQXFCLENBQUM7UUFDN0Msb0JBQWUsR0FBVyxDQUFDLENBQUM7SUFLQyxDQUFDO0lBRXRDLGdDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDL0QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDekQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLFFBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDO1FBQ1QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxvQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNsRCxDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLFFBQWtCO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQztRQUM1QyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDSSxNQUFNLENBQUMsQ0FBQyxPQUFPLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDM0MsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDSSxNQUFNLENBQUMscUJBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUE5RUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSxxQkFBcUI7WUFDbEMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDakMsU0FBUyxFQUFFLENBQUMsd0JBQWlCLENBQUM7U0FDakMsQ0FBQzs7cUJBQUE7SUF5RUYsb0JBQUM7QUFBRCxDQXZFQSxBQXVFQyxJQUFBO0FBdkVZLHFCQUFhLGdCQXVFekIsQ0FBQSIsImZpbGUiOiJhcHAvK2hvbWUvaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlc3Rpb25zU2VydmljZSwgV2ViM1NlcnZpY2UsIFF1ZXN0aW9uLCBUVVRPUklBTF9URVhUIH0gZnJvbSAnLi4vc2hhcmVkL2luZGV4JztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZC1ob21lJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydob21lLmNvbXBvbmVudC5jc3MnXSxcbiAgICBwcm92aWRlcnM6IFtDaGFuZ2VEZXRlY3RvclJlZl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgcXVlc3Rpb25TdWJzY3JpcHRpb246IGFueTsgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gUXVlc3Rpb25zU2VydmljZSBhZGRzIGEgbmV3IHF1ZXN0aW9uXG4gICAgcHJpdmF0ZSBhY2NvdW50U3Vic2NyaXB0aW9uOiBhbnk7ICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBXZWIzU2VydmljZSBkZXRlY3RzIGEgbmV3IGFjY291bnRcbiAgICBwcml2YXRlIGxvYWRNb3JlVGV4dDogc3RyaW5nID0gJ0xvYWQgbW9yZSBxdWVzdGlvbnMnOyAvLyBUZXh0IHRvIGRpc3BsYXkgZm9yIHRoZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgcHJpdmF0ZSB0dXRvcmlhbFNlY3Rpb246IG51bWJlciA9IDE7ICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCB0dXRvcmlhbCBzZWN0aW9uXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHF1ZXN0aW9uc1NlcnZpY2U6IFF1ZXN0aW9uc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB3ZWIzU2VydmljZTogV2ViM1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWVzdGlvbnNTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5xdWVzdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMucXVlc3Rpb25zU2VydmljZS51cGRhdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWNjb3VudFN1YnNjcmlwdGlvbiA9IHRoaXMud2ViM1NlcnZpY2UudXBkYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEdhcmJhZ2UgY29sbGVjdGlvblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuYWNjb3VudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGxhYmVsVHlwZShxdWVzdGlvbjogUXVlc3Rpb24pOiBzdHJpbmcge1xuICAgICAgICBsZXQgdHlwZTtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmluZm8gPT09ICdDb21wbGV0ZWQnKSB7XG4gICAgICAgICAgICB0eXBlID0gJ3N1Y2Nlc3MnO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLmluZm8gPT09ICdFeHBpcmVkJykge1xuICAgICAgICAgICAgdHlwZSA9ICdkYW5nZXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9ICdpbmZvJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICBnZXRRdWVzdGlvbnMoKTogUXVlc3Rpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXN0aW9uc1NlcnZpY2UudmlzaWJsZVF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBnb3RvUXVlc3Rpb24ocXVlc3Rpb246IFF1ZXN0aW9uKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3F1ZXN0aW9ucycsIHF1ZXN0aW9uLnNpdGUsIHF1ZXN0aW9uLnF1ZXN0aW9uSURdKTtcbiAgICB9XG5cbiAgICBsb2FkTW9yZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uc1NlcnZpY2UubG9hZE1vcmUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZVRleHQgPSAnTm8gbW9yZSBxdWVzdGlvbnMnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1R1dG9yaWFsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBsb2NhbFN0b3JhZ2VbJ1NFRGFwcFR1dG9yYWwnXSA9PT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy50dXRvcmlhbFNlY3Rpb24gPCA2KTsgLy8gTWFrZSBzdXJlIHdlIGhhdmVuJ3Qgc2hvd24gdGhlIHR1dG9yaWFsIGJlZm9yZVxuICAgIH1cblxuICAgIG5vVHV0b3JpYWwoKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZVsnU0VEYXBwVHV0b3JhbCddID0gJ2RvbmUnO1xuICAgIH1cblxuICAgIG5leHRTZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnR1dG9yaWFsU2VjdGlvbisrO1xuICAgICAgICBpZiAodGhpcy50dXRvcmlhbFNlY3Rpb24gPj0gNikgeyAvLyBIaWRlIHRoZSB0dXRvcmlhbCB3aGVuIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgIHRoaXMubm9UdXRvcmlhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHV0b3JpYWxUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBUVVRPUklBTF9URVhUW3RoaXMudHV0b3JpYWxTZWN0aW9uLTFdO1xuICAgIH1cbn1cbiJdfQ==
