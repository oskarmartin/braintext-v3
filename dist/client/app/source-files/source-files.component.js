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

//# sourceMappingURL=source-files.component.js.map
