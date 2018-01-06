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
var file_service_1 = require("../_services/file.service");
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(fileService) {
        this.fileService = fileService;
        this.errors = [];
        this.dragAreaClass = 'dragarea';
        this.projectId = 0;
        this.sectionId = 0;
        this.fileExt = "PDF";
        this.maxFiles = 1;
        this.maxSize = 25;
        this.uploadStatus = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.ngOnInit = function () {
    };
    FileUploadComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.saveFiles(files);
    };
    FileUploadComponent.prototype.onDragEnter = function (event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDragEnd = function (event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDragLeave = function (event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDrop = function (event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        //this.saveFiles(files);
    };
    FileUploadComponent.prototype.saveFiles = function (files) {
        var _this = this;
        this.errors = [];
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length > 0) {
            var formData = new FormData();
            formData.append("file", files[0], files[0].name);
            //formData.append("extraData", localStorage.getItem('user'));
            var parameters = {
                userId: JSON.parse(localStorage.getItem('user'))
            };
            this.fileService.upload(formData, parameters)
                .subscribe(function (data) {
                _this.uploadStatus.emit(data.filename);
            }, function (error) {
                _this.uploadStatus.emit(false);
                _this.errors.push(error.ExceptionMessage);
            });
        }
    };
    FileUploadComponent.prototype.isValidFiles = function (files) {
        if (files.length > this.maxFiles) {
            this.errors.push("Error: you exceeded the accepted number of uploaded files(" + this.maxFiles + ")");
            return;
        }
        //this.validFileExtensions(files);
        return this.errors.length === 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileUploadComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileUploadComponent.prototype, "sectionId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploadComponent.prototype, "fileExt", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileUploadComponent.prototype, "maxFiles", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileUploadComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "uploadStatus", void 0);
    __decorate([
        core_1.HostListener('dragenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragEnd", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragLeave", null);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDrop", null);
    FileUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-file-upload',
            templateUrl: './fileupload.component.html'
        }),
        __metadata("design:paramtypes", [file_service_1.FileService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=fileupload.component.js.map
