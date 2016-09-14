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
            templateUrl: 'question.component.html',
            styleUrls: ['question.component.css'],
            directives: [index_1.MathJaxDirective]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.QuestionsService, index_1.Web3Service, core_1.ChangeDetectorRef])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcXVlc3Rpb24vcXVlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0UsZUFBZSxDQUFDLENBQUE7QUFDaEYsc0JBQTBFLGlCQUFpQixDQUFDLENBQUE7QUFFNUYsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFVakQ7SUFJSSwyQkFBb0IsS0FBcUIsRUFDckIsZ0JBQWtDLEVBQ2xDLFdBQXdCLEVBQ3hCLEdBQXNCO1FBSHRCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLG9DQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6QyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQVE7b0JBQzlELEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLFFBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDO1FBQ1QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXpDTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNyQyxVQUFVLEVBQUUsQ0FBQyx3QkFBZ0IsQ0FBQztTQUNqQyxDQUFDOzt5QkFBQTtJQW9DRix3QkFBQztBQUFELENBbENBLEFBa0NDLElBQUE7QUFsQ1kseUJBQWlCLG9CQWtDN0IsQ0FBQSIsImZpbGUiOiJhcHAvK3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBRdWVzdGlvbnNTZXJ2aWNlLCBXZWIzU2VydmljZSwgUXVlc3Rpb24sIE1hdGhKYXhEaXJlY3RpdmUgfSBmcm9tICcuLi9zaGFyZWQvaW5kZXgnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZC1xdWVzdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdxdWVzdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3F1ZXN0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgICBkaXJlY3RpdmVzOiBbTWF0aEpheERpcmVjdGl2ZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uOyAgLy8gU3Vic2NyaXB0aW9uIHRvIGdldCB0aGUgcm91dGUgcGFyYW1zXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb247IC8vIFF1ZXN0aW9uIG9iamVjdCBiZWluZyBkaXNwbGF5ZWRcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcXVlc3Rpb25zU2VydmljZTogUXVlc3Rpb25zU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHdlYjNTZXJ2aWNlOiBXZWIzU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHsgLy8gR2V0IHRoZSByaWdodCBxdWVzdGlvblxuICAgICAgICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xuICAgICAgICAgICAgbGV0IHNpdGUgPSBwYXJhbXNbJ3NpdGUnXTtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1NlcnZpY2UuZ2V0UXVlc3Rpb25Gcm9tQ2FjaGUoaWQsIHNpdGUpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNTZXJ2aWNlLmdldFF1ZXN0aW9uQnlTaXRlSWQoaWQsIHNpdGUpLnRoZW4oKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb24gPSBxdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwYXJzZURhdGUodW5peERhdGU6IG51bWJlcik6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHVuaXhEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUodW5peERhdGUqMTAwMCkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG59XG4iXX0=
