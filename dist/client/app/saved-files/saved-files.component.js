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

//# sourceMappingURL=saved-files.component.js.map
