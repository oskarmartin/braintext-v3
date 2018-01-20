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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new Subject_1.Subject();
        this.keepAfterNavigationChange = false;
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterNavigationChange) {
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvYWxlcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQywwQ0FBMEQ7QUFFMUQsd0NBQXVDO0FBR3ZDO0lBSUksc0JBQW9CLE1BQWM7UUFBbEMsaUJBVUM7UUFWbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUgxQixZQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFPLENBQUM7UUFDN0IsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBR3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksd0JBQWUsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBLENBQUM7b0JBQy9CLEtBQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7Z0JBQzNDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLHlCQUFpQztRQUFqQywwQ0FBQSxFQUFBLGlDQUFpQztRQUN0RCxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRCw0QkFBSyxHQUFMLFVBQU0sT0FBZSxFQUFFLHlCQUFpQztRQUFqQywwQ0FBQSxFQUFBLGlDQUFpQztRQUNwRCxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxpQ0FBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQTFCUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBS21CLGVBQU07T0FKekIsWUFBWSxDQTJCeEI7SUFBRCxtQkFBQztDQTNCRCxBQTJCQyxJQUFBO0FBM0JZLG9DQUFZIiwiZmlsZSI6ImFwcC9fc2VydmljZXMvYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbGVydFNlcnZpY2V7XG4gICAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHByaXZhdGUga2VlcEFmdGVyTmF2aWdhdGlvbkNoYW5nZSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcil7XG4gICAgICAgIHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5rZWVwQWZ0ZXJOYXZpZ2F0aW9uQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWVwQWZ0ZXJOYXZpZ2F0aW9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywga2VlcEFmdGVyTmF2aWdhdGlvbkNoYW5nZSA9IGZhbHNlKXtcbiAgICAgICAgdGhpcy5rZWVwQWZ0ZXJOYXZpZ2F0aW9uQ2hhbmdlID0ga2VlcEFmdGVyTmF2aWdhdGlvbkNoYW5nZTtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoeyB0eXBlOiAnc3VjY2VzcycsIHRleHQ6IG1lc3NhZ2V9KTtcbiAgICB9XG4gICAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBrZWVwQWZ0ZXJOYXZpZ2F0aW9uQ2hhbmdlID0gZmFsc2Upe1xuICAgICAgICB0aGlzLmtlZXBBZnRlck5hdmlnYXRpb25DaGFuZ2UgPSBrZWVwQWZ0ZXJOYXZpZ2F0aW9uQ2hhbmdlO1xuICAgICAgICB0aGlzLnN1YmplY3QubmV4dCh7IHR5cGU6ICdlcnJvcicsIHRleHQ6IG1lc3NhZ2V9KTtcbiAgICB9XG4gICAgZ2V0TWVzc2FnZSgpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIl19
