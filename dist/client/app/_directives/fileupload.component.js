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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fZGlyZWN0aXZlcy9maWxldXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RjtBQUM3RiwwREFBd0Q7QUFReEQ7SUFVSSw2QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFUNUMsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFDM0Isa0JBQWEsR0FBVyxVQUFVLENBQUM7UUFDMUIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFFRyxDQUFDO0lBQ2hELHNDQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0QsMENBQVksR0FBWixVQUFhLEtBQUs7UUFDZCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFc0MseUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDb0MsdUNBQVMsR0FBVCxVQUFVLEtBQUs7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDc0MseUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDaUMsb0NBQU0sR0FBTixVQUFP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USxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0MsQ0FBQzt5Q0FZbUMsMEJBQVc7T0FWbkMsbUJBQW1CLENBaUYvQjtJQUFELDBCQUFDO0NBakZELEFBaUZDLElBQUE7QUFqRlksa0RBQW1CIiwiZmlsZSI6ImFwcC9fZGlyZWN0aXZlcy9maWxldXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdhcHAtZmlsZS11cGxvYWQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWxldXBsb2FkLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgZXJyb3JzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZHJhZ0FyZWFDbGFzczogc3RyaW5nID0gJ2RyYWdhcmVhJztcbiAgICBASW5wdXQoKSBwcm9qZWN0SWQ6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgc2VjdGlvbklkOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIGZpbGVFeHQ6IHN0cmluZyA9IFwiUERGXCI7XG4gICAgQElucHV0KCkgbWF4RmlsZXM6IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyID0gMjU7XG4gICAgQE91dHB1dCgpIHVwbG9hZFN0YXR1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlKXsgfVxuICAgIG5nT25Jbml0KCl7XG5cbiAgICB9XG4gICAgb25GaWxlQ2hhbmdlKGV2ZW50KXtcbiAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICB0aGlzLnNhdmVGaWxlcyhmaWxlcyk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2VudGVyJywgWyckZXZlbnQnXSkgb25EcmFnRW50ZXIoZXZlbnQpe1xuICAgICAgICB0aGlzLmRyYWdBcmVhQ2xhc3MgPSAnZHJvcGFyZWEnO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSkgb25EcmFnRW5kKGV2ZW50KXtcbiAgICAgICAgdGhpcy5kcmFnQXJlYUNsYXNzID0gJ2RyYWdhcmVhJztcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSkgb25EcmFnTGVhdmUoZXZlbnQpe1xuICAgICAgICB0aGlzLmRyYWdBcmVhQ2xhc3MgPSAnZHJhZ2FyZWEnO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSkgb25Ecm9wKGV2ZW50KXtcbiAgICAgICAgdGhpcy5kcmFnQXJlYUNsYXNzID0gJ2RyYWdhcmVhJztcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgLy90aGlzLnNhdmVGaWxlcyhmaWxlcyk7XG4gICAgfVxuICAgIHNhdmVGaWxlcyhmaWxlcyl7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgIGlmKGZpbGVzLmxlbmd0aCA+IDAgJiYoIXRoaXMuaXNWYWxpZEZpbGVzKGZpbGVzKSkpe1xuICAgICAgICAgICAgdGhpcy51cGxvYWRTdGF0dXMuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB2YXIgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJmaWxlXCIsIGZpbGVzWzBdLCBmaWxlc1swXS5uYW1lKTtcbiAgICAgICAgICAgIC8vZm9ybURhdGEuYXBwZW5kKFwiZXh0cmFEYXRhXCIsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UudXBsb2FkKGZvcm1EYXRhLCBwYXJhbWV0ZXJzKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkU3RhdHVzLmVtaXQoZGF0YS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZFN0YXR1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvci5FeGNlcHRpb25NZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgaXNWYWxpZEZpbGVzKGZpbGVzKXtcbiAgICAgICAgaWYoZmlsZXMubGVuZ3RoID4gdGhpcy5tYXhGaWxlcyl7XG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKFwiRXJyb3I6IHlvdSBleGNlZWRlZCB0aGUgYWNjZXB0ZWQgbnVtYmVyIG9mIHVwbG9hZGVkIGZpbGVzKFwiK3RoaXMubWF4RmlsZXMrXCIpXCIpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnZhbGlkRmlsZUV4dGVuc2lvbnMoZmlsZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnMubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgICAvKnByaXZhdGUgdmFsaWRGaWxlRXh0ZW5zaW9ucyhmaWxlcyl7XG4gICAgICAgIHZhciBleHRlbnNpb25zID0gKHRoaXMuZmlsZUV4dC5zcGxpdChcIixcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC50b0xvY2FsZVVwcGVyQ2FzZSgpLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdmFyIGV4dCA9IGZpbGVzW2ldLm5hbWUudG9VcHBlckNhc2UoKS5zcGxpdCgnLicpLnBvcCgpIHx8wqBmaWxlc1tpXS5uYW1lO1xuICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KTtcbiAgICAgICAgfVxuICAgIH0qL1xufVxuIl19
