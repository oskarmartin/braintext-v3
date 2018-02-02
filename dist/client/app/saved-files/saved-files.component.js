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
        console.log("yo");
        this.userService.downloadTest().subscribe(function (data) {
            console.log(data);
        });
        var filePath = "/Users/Oskar/Desktop/Projektid/braintext2/dist/server/routes/tmp/Oskar-Martin-UUS1516822351706.pdf";
        var link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
        console.log(filePath.substr(filePath.lastIndexOf('/') + 1));
        link.click();
        /*console.log("filename -> ", filename);
        this.userService.downloadArchive(filename).subscribe(data => {
            console.log("this is the data of file download");
            console.log(data);
            saveAs(new Blob([data], { type: "application/pdf"}), "test.pdf");

        })*/
    };
    SavedFilesComponent.prototype.parseFile = function (data) {
        var blob = new Blob([data], { type: 'application/pdf' });
        console.log(blob);
        var url = window.URL.createObjectURL(blob);
        console.log(url);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zYXZlZC1maWxlcy9zYXZlZC1maWxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBRXpDLDBEQUF3RDtBQUN4RCwwREFBd0Q7QUFheEQ7SUFFSSw2QkFDWSxXQUF3QixFQUN4QixXQUF3QixFQUN4QixNQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUoxQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztJQUt2QixDQUFDO0lBRUosc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNsRCxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxRQUFnQjtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxRQUFRLEdBQUcsb0dBQW9HLENBQUM7UUFDcEgsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiOzs7Ozs7WUFNSTtJQUVSLENBQUM7SUFDRCx1Q0FBUyxHQUFULFVBQVUsSUFBUztRQUNmLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUEzQ1EsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDO3lDQUkyQiwwQkFBVztZQUNYLDBCQUFXO1lBQ2hCLGVBQU07T0FMakIsbUJBQW1CLENBNEMvQjtJQUFELDBCQUFDO0NBNUNELEFBNENDLElBQUE7QUE1Q1ksa0RBQW1CIiwiZmlsZSI6ImFwcC9zYXZlZC1maWxlcy9zYXZlZC1maWxlcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgRmlsZVNlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xuLy9pbXBvcnQgeyBGaWxlU2F2ZXIgfSBmcm9tIFwiZmlsZS1zYXZlclwiO1xuLy9pbXBvcnQgKiBhcyBGaWxlU2F2ZXIgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tIFwiZmlsZS1zYXZlclwiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3NhdmVkLWZpbGVzJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NhdmVkLWZpbGVzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc2F2ZWQtZmlsZXMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNhdmVkRmlsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNhdmVkRmlsZXNBcnJheTogYW55ID0gW107XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJGaWxlcyhpZCkpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbEFyY2hpdmVGaWxlcyhpZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYXZlZEZpbGVzQXJyYXkgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5zYXZlZEZpbGVzQXJyYXkucmV2ZXJzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3dubG9hZEZpbGUoZmlsZW5hbWU6IHN0cmluZyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwieW9cIik7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZG93bmxvYWRUZXN0KCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIHZhciBmaWxlUGF0aCA9IFwiL1VzZXJzL09za2FyL0Rlc2t0b3AvUHJvamVrdGlkL2JyYWludGV4dDIvZGlzdC9zZXJ2ZXIvcm91dGVzL3RtcC9Pc2thci1NYXJ0aW4tVVVTMTUxNjgyMjM1MTcwNi5wZGZcIjtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuaHJlZiA9IGZpbGVQYXRoO1xuICAgICAgICBsaW5rLmRvd25sb2FkID0gZmlsZVBhdGguc3Vic3RyKGZpbGVQYXRoLmxhc3RJbmRleE9mKCcvJykrMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbGVQYXRoLnN1YnN0cihmaWxlUGF0aC5sYXN0SW5kZXhPZignLycpKzEpKTtcbiAgICAgICAgbGluay5jbGljaygpO1xuICAgICAgICAvKmNvbnNvbGUubG9nKFwiZmlsZW5hbWUgLT4gXCIsIGZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5kb3dubG9hZEFyY2hpdmUoZmlsZW5hbWUpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgZGF0YSBvZiBmaWxlIGRvd25sb2FkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBzYXZlQXMobmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCJ9KSwgXCJ0ZXN0LnBkZlwiKTtcblxuICAgICAgICB9KSovXG5cbiAgICB9XG4gICAgcGFyc2VGaWxlKGRhdGE6IGFueSl7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ2FwcGxpY2F0aW9uL3BkZid9KTtcbiAgICAgICAgY29uc29sZS5sb2coYmxvYik7XG4gICAgICAgIHZhciB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgICAgd2luZG93Lm9wZW4odXJsKTtcbiAgICB9XG59XG4iXX0=
