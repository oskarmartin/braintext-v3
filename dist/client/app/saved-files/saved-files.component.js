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
var SavedFilesComponent = /** @class */ (function () {
    function SavedFilesComponent(userService, fileService, router) {
        this.userService = userService;
        this.fileService = fileService;
        this.router = router;
        this.savedFilesArray = [];
    }
    SavedFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('user'));
        console.log(this.userService.getUserFiles(id));
        this.userService.getAllArchiveFiles(id).subscribe(function (data) {
            _this.savedFilesArray = data;
            _this.savedFilesArray.reverse();
        });
    };
    SavedFilesComponent.prototype.downloadFile = function (filename) {
        var _this = this;
        console.log("filename -> ", filename);
        this.userService.downloadArchive(filename).subscribe(function (data) {
            console.log(data);
            _this.parseFile(data);
        });
    };
    SavedFilesComponent.prototype.parseFile = function (data) {
        var blob = new Blob([data], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    SavedFilesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'saved-files',
            templateUrl: 'saved-files.component.html',
            styleUrls: ['saved-files.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            file_service_1.FileService,
            router_1.Router])
    ], SavedFilesComponent);
    return SavedFilesComponent;
}());
exports.SavedFilesComponent = SavedFilesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zYXZlZC1maWxlcy9zYXZlZC1maWxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBRXpDLDBEQUF3RDtBQUN4RCwwREFBd0Q7QUFVeEQ7SUFFSSw2QkFDWSxXQUF3QixFQUN4QixXQUF3QixFQUN4QixNQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUoxQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztJQUt2QixDQUFDO0lBRUosc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNsRCxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxRQUFnQjtRQUE3QixpQkFPQztRQU5HLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUNELHVDQUFTLEdBQVQsVUFBVSxJQUFTO1FBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQTdCUSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7eUNBSTJCLDBCQUFXO1lBQ1gsMEJBQVc7WUFDaEIsZUFBTTtPQUxqQixtQkFBbUIsQ0E4Qi9CO0lBQUQsMEJBQUM7Q0E5QkQsQUE4QkMsSUFBQTtBQTlCWSxrREFBbUIiLCJmaWxlIjoiYXBwL3NhdmVkLWZpbGVzL3NhdmVkLWZpbGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc2F2ZWQtZmlsZXMnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2F2ZWQtZmlsZXMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzYXZlZC1maWxlcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2F2ZWRGaWxlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc2F2ZWRGaWxlc0FycmF5OiBhbnkgPSBbXTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB2YXIgaWQ6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlckZpbGVzKGlkKSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0QWxsQXJjaGl2ZUZpbGVzKGlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNhdmVkRmlsZXNBcnJheSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLnNhdmVkRmlsZXNBcnJheS5yZXZlcnNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvd25sb2FkRmlsZShmaWxlbmFtZTogc3RyaW5nKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaWxlbmFtZSAtPiBcIiwgZmlsZW5hbWUpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmRvd25sb2FkQXJjaGl2ZShmaWxlbmFtZSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnBhcnNlRmlsZShkYXRhKTtcbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBwYXJzZUZpbGUoZGF0YTogYW55KXtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAndGV4dC9jc3YnfSk7XG4gICAgICAgIHZhciB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgd2luZG93Lm9wZW4odXJsKTtcbiAgICB9XG59XG4iXX0=
