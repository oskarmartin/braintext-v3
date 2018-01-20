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
//import { FileSaver } from "file-saver";
//import * as FileSaver from 'file-saver';
var file_saver_1 = require("file-saver");
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
        console.log("filename -> ", filename);
        this.userService.downloadArchive(filename).subscribe(function (data) {
            console.log("this is the data of file download");
            console.log(data);
            file_saver_1.saveAs(new Blob([data], { type: "application/pdf" }), "test.pdf");
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zYXZlZC1maWxlcy9zYXZlZC1maWxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBRXpDLDBEQUF3RDtBQUN4RCwwREFBd0Q7QUFDeEQseUNBQXlDO0FBQ3pDLDBDQUEwQztBQUMxQyx5Q0FBb0M7QUFVcEM7SUFFSSw2QkFDWSxXQUF3QixFQUN4QixXQUF3QixFQUN4QixNQUFjO1FBRmQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUoxQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztJQUt2QixDQUFDO0lBRUosc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNsRCxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxRQUFnQjtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFckUsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBQ0QsdUNBQVMsR0FBVCxVQUFVLElBQVM7UUFDZixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBakNRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDM0MsQ0FBQzt5Q0FJMkIsMEJBQVc7WUFDWCwwQkFBVztZQUNoQixlQUFNO09BTGpCLG1CQUFtQixDQWtDL0I7SUFBRCwwQkFBQztDQWxDRCxBQWtDQyxJQUFBO0FBbENZLGtEQUFtQiIsImZpbGUiOiJhcHAvc2F2ZWQtZmlsZXMvc2F2ZWQtZmlsZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcbi8vaW1wb3J0IHsgRmlsZVNhdmVyIH0gZnJvbSBcImZpbGUtc2F2ZXJcIjtcbi8vaW1wb3J0ICogYXMgRmlsZVNhdmVyIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSBcImZpbGUtc2F2ZXJcIjtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzYXZlZC1maWxlcycsXG4gICAgdGVtcGxhdGVVcmw6ICdzYXZlZC1maWxlcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3NhdmVkLWZpbGVzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTYXZlZEZpbGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzYXZlZEZpbGVzQXJyYXk6IGFueSA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHZhciBpZDogc3RyaW5nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyU2VydmljZS5nZXRVc2VyRmlsZXMoaWQpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRBbGxBcmNoaXZlRmlsZXMoaWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZWRGaWxlc0FycmF5ID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZWRGaWxlc0FycmF5LnJldmVyc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG93bmxvYWRGaWxlKGZpbGVuYW1lOiBzdHJpbmcpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVuYW1lIC0+IFwiLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZG93bmxvYWRBcmNoaXZlKGZpbGVuYW1lKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIGRhdGEgb2YgZmlsZSBkb3dubG9hZFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgc2F2ZUFzKG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL3BkZlwifSksIFwidGVzdC5wZGZcIik7XG5cbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBwYXJzZUZpbGUoZGF0YTogYW55KXtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAnYXBwbGljYXRpb24vcGRmJ30pO1xuICAgICAgICBjb25zb2xlLmxvZyhibG9iKTtcbiAgICAgICAgdmFyIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xuICAgIH1cbn1cbiJdfQ==
