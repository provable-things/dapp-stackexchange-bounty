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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var index_1 = require('./navbar/index');
var index_2 = require('./questions/index');
var index_3 = require('./web3/index');
var index_4 = require('./mathjax/index');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [index_2.QuestionsService, index_3.Web3Service]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule, forms_1.FormsModule],
            declarations: [index_1.NavbarComponent, index_4.MathJaxDirective],
            exports: [index_1.NavbarComponent, index_4.MathJaxDirective,
                common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThDLGVBQWUsQ0FBQyxDQUFBO0FBQzlELHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLHNCQUE0QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzdDLHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBRS9DLHNCQUFnQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pELHNCQUFpQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3JELHNCQUE0QixjQUFjLENBQUMsQ0FBQTtBQUMzQyxzQkFBaUMsaUJBQWlCLENBQUMsQ0FBQTtBQVluRDtJQUFBO0lBT0EsQ0FBQztJQU5RLG9CQUFPLEdBQWQ7UUFDRSxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsQ0FBQyx3QkFBZ0IsRUFBRSxtQkFBVyxDQUFDO1NBQzNDLENBQUM7SUFDSixDQUFDO0lBWkg7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxFQUFFLHFCQUFZLEVBQUUsbUJBQVcsQ0FBQztZQUNsRCxZQUFZLEVBQUUsQ0FBQyx1QkFBZSxFQUFFLHdCQUFnQixDQUFDO1lBQ2pELE9BQU8sRUFBRSxDQUFDLHVCQUFlLEVBQUUsd0JBQWdCO2dCQUN6QyxxQkFBWSxFQUFFLG1CQUFXLEVBQUUscUJBQVksQ0FBQztTQUMzQyxDQUFDOztvQkFBQTtJQVFGLG1CQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxvQkFBWSxlQU94QixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBOYXZiYXJDb21wb25lbnQgfSBmcm9tICcuL25hdmJhci9pbmRleCc7XG5pbXBvcnQgeyBRdWVzdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9xdWVzdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgV2ViM1NlcnZpY2UgfSBmcm9tICcuL3dlYjMvaW5kZXgnO1xuaW1wb3J0IHsgTWF0aEpheERpcmVjdGl2ZSB9IGZyb20gJy4vbWF0aGpheC9pbmRleCc7XG5cbi8qKlxuICogRG8gbm90IHNwZWNpZnkgcHJvdmlkZXJzIGZvciBtb2R1bGVzIHRoYXQgbWlnaHQgYmUgaW1wb3J0ZWQgYnkgYSBsYXp5IGxvYWRlZCBtb2R1bGUuXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05hdmJhckNvbXBvbmVudCwgTWF0aEpheERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOYXZiYXJDb21wb25lbnQsIE1hdGhKYXhEaXJlY3RpdmUsXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNoYXJlZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1F1ZXN0aW9uc1NlcnZpY2UsIFdlYjNTZXJ2aWNlXSAvLyBzZXJ2aWNlcyBnbyBoZXJlXG4gICAgfTtcbiAgfVxufVxuIl19
