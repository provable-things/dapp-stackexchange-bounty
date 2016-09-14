"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var async_1 = require('@angular/core/src/facade/async');
var MockLocationStrategy = (function (_super) {
    __extends(MockLocationStrategy, _super);
    function MockLocationStrategy() {
        _super.call(this);
        this.internalBaseHref = '/';
        this.internalPath = '/';
        this.internalTitle = '';
        this.urlChanges = [];
        this._subject = new async_1.EventEmitter();
    }
    MockLocationStrategy.prototype.simulatePopState = function (url) {
        this.internalPath = url;
        this._subject.emit(new MockPopStateEvent(this.path()));
    };
    MockLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.internalPath;
    };
    MockLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    };
    MockLocationStrategy.prototype.pushState = function (ctx, title, path, query) {
        this.internalTitle = title;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    };
    MockLocationStrategy.prototype.replaceState = function (ctx, title, path, query) {
        this.internalTitle = title;
        var url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    };
    MockLocationStrategy.prototype.onPopState = function (fn) { this._subject.subscribe({ next: fn }); };
    MockLocationStrategy.prototype.getBaseHref = function () { return this.internalBaseHref; };
    MockLocationStrategy.prototype.back = function () {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            var nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    };
    MockLocationStrategy.prototype.forward = function () { throw 'not implemented'; };
    MockLocationStrategy = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MockLocationStrategy);
    return MockLocationStrategy;
}(common_1.LocationStrategy));
exports.MockLocationStrategy = MockLocationStrategy;
var MockPopStateEvent = (function () {
    function MockPopStateEvent(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
    return MockPopStateEvent;
}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Rpbmcvcm91dGVyL21vY2stbG9jYXRpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsdUJBQWlDLGlCQUFpQixDQUFDLENBQUE7QUFDbkQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLHNCQUE2QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBUzlEO0lBQTBDLHdDQUFnQjtJQU94RDtRQUFnQixpQkFBTyxDQUFDO1FBTnhCLHFCQUFnQixHQUFXLEdBQUcsQ0FBQztRQUMvQixpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUMzQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixlQUFVLEdBQWEsRUFBRSxDQUFDO1FBRTFCLGFBQVEsR0FBc0IsSUFBSSxvQkFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUUxQiwrQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBVztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxXQUE0QjtRQUE1QiwyQkFBNEIsR0FBNUIsbUJBQTRCO1FBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFBQyxDQUFDO0lBRXhFLGlEQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7SUFDMUMsQ0FBQztJQUVELHdDQUFTLEdBQVQsVUFBVSxHQUFRLEVBQUUsS0FBYSxFQUFFLElBQVksRUFBRSxLQUFhO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTNCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBRXhCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLEdBQVEsRUFBRSxLQUFhLEVBQUUsSUFBWSxFQUFFLEtBQWE7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFFeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLEVBQXdCLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkYsMENBQVcsR0FBWCxjQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUV2RCxtQ0FBSSxHQUFKO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFFRCxzQ0FBTyxHQUFQLGNBQWtCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBeEQ5QztRQUFDLGlCQUFVLEVBQUU7OzRCQUFBO0lBeURiLDJCQUFDO0FBQUQsQ0F4REEsQUF3REMsQ0F4RHlDLHlCQUFnQixHQXdEekQ7QUF4RFksNEJBQW9CLHVCQXdEaEMsQ0FBQTtBQUVEO0lBR0UsMkJBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRmpDLFFBQUcsR0FBWSxJQUFJLENBQUM7UUFDcEIsU0FBSSxHQUFXLFVBQVUsQ0FBQztJQUNVLENBQUM7SUFDdkMsd0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQSIsImZpbGUiOiJ0ZXN0aW5nL3JvdXRlci9tb2NrLWxvY2F0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNb2NrIGxvY2F0aW9uIHN0cmF0ZWd5ICh1bnRpbCBwcm92aWRlZCBieSBAYW5ndWxhcilcbiAqIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvbW9kdWxlcy8lNDBhbmd1bGFyL2NvbW1vbi90ZXN0aW5nL21vY2tfbG9jYXRpb25fc3RyYXRlZ3kudHNcbiAqL1xuaW1wb3J0IHsgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG4vKipcbiAqIEEgbW9jayBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTG9jYXRpb25TdHJhdGVneX0gdGhhdCBhbGxvd3MgdGVzdHMgdG8gZmlyZSBzaW11bGF0ZWRcbiAqIGxvY2F0aW9uIGV2ZW50cy5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrTG9jYXRpb25TdHJhdGVneSBleHRlbmRzIExvY2F0aW9uU3RyYXRlZ3kge1xuICBpbnRlcm5hbEJhc2VIcmVmOiBzdHJpbmcgPSAnLyc7XG4gIGludGVybmFsUGF0aDogc3RyaW5nID0gJy8nO1xuICBpbnRlcm5hbFRpdGxlOiBzdHJpbmcgPSAnJztcbiAgdXJsQ2hhbmdlczogc3RyaW5nW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3ViamVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgc2ltdWxhdGVQb3BTdGF0ZSh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxQYXRoID0gdXJsO1xuICAgIHRoaXMuX3N1YmplY3QuZW1pdChuZXcgTW9ja1BvcFN0YXRlRXZlbnQodGhpcy5wYXRoKCkpKTtcbiAgfVxuXG4gIHBhdGgoaW5jbHVkZUhhc2g6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLmludGVybmFsUGF0aDsgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybChpbnRlcm5hbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoaW50ZXJuYWwuc3RhcnRzV2l0aCgnLycpICYmIHRoaXMuaW50ZXJuYWxCYXNlSHJlZi5lbmRzV2l0aCgnLycpKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbEJhc2VIcmVmICsgaW50ZXJuYWwuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbEJhc2VIcmVmICsgaW50ZXJuYWw7XG4gIH1cblxuICBwdXNoU3RhdGUoY3R4OiBhbnksIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxUaXRsZSA9IHRpdGxlO1xuXG4gICAgdmFyIHVybCA9IHBhdGggKyAocXVlcnkubGVuZ3RoID4gMCA/ICgnPycgKyBxdWVyeSkgOiAnJyk7XG4gICAgdGhpcy5pbnRlcm5hbFBhdGggPSB1cmw7XG5cbiAgICB2YXIgZXh0ZXJuYWxVcmwgPSB0aGlzLnByZXBhcmVFeHRlcm5hbFVybCh1cmwpO1xuICAgIHRoaXMudXJsQ2hhbmdlcy5wdXNoKGV4dGVybmFsVXJsKTtcbiAgfVxuXG4gIHJlcGxhY2VTdGF0ZShjdHg6IGFueSwgdGl0bGU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcm5hbFRpdGxlID0gdGl0bGU7XG5cbiAgICB2YXIgdXJsID0gcGF0aCArIChxdWVyeS5sZW5ndGggPiAwID8gKCc/JyArIHF1ZXJ5KSA6ICcnKTtcbiAgICB0aGlzLmludGVybmFsUGF0aCA9IHVybDtcblxuICAgIHZhciBleHRlcm5hbFVybCA9IHRoaXMucHJlcGFyZUV4dGVybmFsVXJsKHVybCk7XG4gICAgdGhpcy51cmxDaGFuZ2VzLnB1c2goJ3JlcGxhY2U6ICcgKyBleHRlcm5hbFVybCk7XG4gIH1cblxuICBvblBvcFN0YXRlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9zdWJqZWN0LnN1YnNjcmliZSh7bmV4dDogZm59KTsgfVxuXG4gIGdldEJhc2VIcmVmKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmludGVybmFsQmFzZUhyZWY7IH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVybENoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy51cmxDaGFuZ2VzLnBvcCgpO1xuICAgICAgdmFyIG5leHRVcmwgPSB0aGlzLnVybENoYW5nZXMubGVuZ3RoID4gMCA/IHRoaXMudXJsQ2hhbmdlc1t0aGlzLnVybENoYW5nZXMubGVuZ3RoIC0gMV0gOiAnJztcbiAgICAgIHRoaXMuc2ltdWxhdGVQb3BTdGF0ZShuZXh0VXJsKTtcbiAgICB9XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQgeyB0aHJvdyAnbm90IGltcGxlbWVudGVkJzsgfVxufVxuXG5jbGFzcyBNb2NrUG9wU3RhdGVFdmVudCB7XG4gIHBvcDogYm9vbGVhbiA9IHRydWU7XG4gIHR5cGU6IHN0cmluZyA9ICdwb3BzdGF0ZSc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZXdVcmw6IHN0cmluZykge31cbn1cbiJdfQ==
