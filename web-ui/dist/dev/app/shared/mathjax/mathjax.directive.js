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
var MathJaxDirective = (function () {
    function MathJaxDirective(elementRef) {
        this.elementRef = elementRef;
    }
    MathJaxDirective.prototype.ngOnChanges = function () {
        var MathJax = window['MathJax'];
        this.elementRef.nativeElement.innerHTML = this.MathJax;
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.elementRef.nativeElement]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MathJaxDirective.prototype, "MathJax", void 0);
    MathJaxDirective = __decorate([
        core_1.Directive({
            selector: '[MathJax]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MathJaxDirective);
    return MathJaxDirective;
}());
exports.MathJaxDirective = MathJaxDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbWF0aGpheC9tYXRoamF4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXNELGVBQWUsQ0FBQyxDQUFBO0FBTXRFO0lBR0ksMEJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLHNDQUFXLEdBQVg7UUFDSSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQVJEO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQUxaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1NBQ3hCLENBQUM7O3dCQUFBO0lBWUYsdUJBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQVZZLHdCQUFnQixtQkFVNUIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL21hdGhqYXgvbWF0aGpheC5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW01hdGhKYXhdJ1xufSlcblxuZXhwb3J0IGNsYXNzIE1hdGhKYXhEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIE1hdGhKYXg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgbGV0IE1hdGhKYXggPSB3aW5kb3dbJ01hdGhKYXgnXTtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5NYXRoSmF4O1xuICAgICAgICBNYXRoSmF4Lkh1Yi5RdWV1ZShbJ1R5cGVzZXQnLCBNYXRoSmF4Lkh1YiwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICB9XG59XG4iXX0=
