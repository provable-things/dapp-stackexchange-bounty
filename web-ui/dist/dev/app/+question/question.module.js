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
var shared_module_1 = require('../shared/shared.module');
var question_component_1 = require('./question.component');
var QuestionModule = (function () {
    function QuestionModule() {
    }
    QuestionModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_module_1.SharedModule],
            declarations: [question_component_1.QuestionComponent],
            exports: [question_component_1.QuestionComponent],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], QuestionModule);
    return QuestionModule;
}());
exports.QuestionModule = QuestionModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsOEJBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsbUNBQWtDLHNCQUFzQixDQUFDLENBQUE7QUFTekQ7SUFBQTtJQUE4QixDQUFDO0lBUC9CO1FBQUMsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMscUJBQVksRUFBRSw0QkFBWSxDQUFDO1lBQ3JDLFlBQVksRUFBRSxDQUFDLHNDQUFpQixDQUFDO1lBQ2pDLE9BQU8sRUFBRSxDQUFDLHNDQUFpQixDQUFDO1lBQzVCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7O3NCQUFBO0lBRTRCLHFCQUFDO0FBQUQsQ0FBOUIsQUFBK0IsSUFBQTtBQUFsQixzQkFBYyxpQkFBSSxDQUFBIiwiZmlsZSI6ImFwcC8rcXVlc3Rpb24vcXVlc3Rpb24ubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcXVlc3Rpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1F1ZXN0aW9uQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbUXVlc3Rpb25Db21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW10gLy8gc2VydmljZXMgZ28gaGVyZVxufSlcblxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTW9kdWxlIHsgfVxuIl19
