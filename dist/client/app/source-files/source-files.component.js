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
var user_service_1 = require("../_services/user.service");
var file_service_1 = require("../_services/file.service");
var SourceFilesComponent = /** @class */ (function () {
    function SourceFilesComponent(userService, fileService, router) {
        this.userService = userService;
        this.fileService = fileService;
        this.router = router;
        this.nameArray = [];
    }
    SourceFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('user'));
        console.log(this.userService.getUserFiles(id));
        this.userService.getAllUserFiles(id).subscribe(function (data) {
            _this.nameArray = data;
            _this.nameArray.reverse();
        });
    };
    SourceFilesComponent.prototype.openSourceFile = function (filename) {
        this.fileService.uploadFromSide(filename);
        this.router.navigate(['/dashboard']);
    };
    SourceFilesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'source-files.component.html',
            styleUrls: ['source-files.component.css'],
            animations: []
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            file_service_1.FileService,
            router_1.Router])
    ], SourceFilesComponent);
    return SourceFilesComponent;
}());
exports.SourceFilesComponent = SourceFilesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zb3VyY2UtZmlsZXMvc291cmNlLWZpbGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBMEM7QUFFMUMsMERBQXdEO0FBQ3hELDBEQUF3RDtBQVV4RDtJQUVJLDhCQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLE1BQWM7UUFGZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSjFCLGNBQVMsR0FBUSxFQUFFLENBQUM7SUFLbEIsQ0FBQztJQUNILHVDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQy9DLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsNkNBQWMsR0FBZCxVQUFlLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBbEJRLG9CQUFvQjtRQVJoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDekMsVUFBVSxFQUFFLEVBRVg7U0FDSixDQUFDO3lDQUkyQiwwQkFBVztZQUNYLDBCQUFXO1lBQ2hCLGVBQU07T0FMakIsb0JBQW9CLENBbUJoQztJQUFELDJCQUFDO0NBbkJELEFBbUJDLElBQUE7QUFuQlksb0RBQW9CIiwiZmlsZSI6ImFwcC9zb3VyY2UtZmlsZXMvc291cmNlLWZpbGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJ3NvdXJjZS1maWxlcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3NvdXJjZS1maWxlcy5jb21wb25lbnQuY3NzJ10sXG4gICAgYW5pbWF0aW9uczogW1xuXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTb3VyY2VGaWxlc0NvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgbmFtZUFycmF5OiBhbnkgPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICl7fVxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIHZhciBpZDogc3RyaW5nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyU2VydmljZS5nZXRVc2VyRmlsZXMoaWQpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRBbGxVc2VyRmlsZXMoaWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubmFtZUFycmF5ID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMubmFtZUFycmF5LnJldmVyc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9wZW5Tb3VyY2VGaWxlKGZpbGVuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLnVwbG9hZEZyb21TaWRlKGZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xuICAgIH1cbn1cbiJdfQ==
