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
var click_service_1 = require("../_services/click.service");
var sentence_service_1 = require("../_services/sentence.service");
var user_service_1 = require("../_services/user.service");
var ArchiveFileComponent = /** @class */ (function () {
    function ArchiveFileComponent(clickService, sentenceService, userService) {
        this.clickService = clickService;
        this.sentenceService = sentenceService;
        this.userService = userService;
        this.fileNamePlaceholder = "filename.pdf";
        this.checkBoxStatus = false;
    }
    ArchiveFileComponent.prototype.ngOnInit = function () {
        console.log("archive-file component initiated!");
        this.clickService.closeArchive();
    };
    ArchiveFileComponent.prototype.closeSaveFileModal = function () {
        this.clickService.closeSaveFileModal();
    };
    ArchiveFileComponent.prototype.changeCheckValue = function () {
        var firstname = JSON.parse(localStorage.getItem('firstname'));
        var lastname = JSON.parse(localStorage.getItem('lastname'));
        this.checkBoxStatus = !this.checkBoxStatus;
        if (this.checkBoxStatus == true) {
            this.fileNamePlaceholder = firstname + "-" + lastname + "-filename.pdf";
        }
        if (this.checkBoxStatus == false) {
            this.fileNamePlaceholder = "filename.pdf";
        }
    };
    ArchiveFileComponent.prototype.saveArchive = function () {
        var _this = this;
        var text = this.sentenceService.getSentenceString();
        var id = JSON.parse(localStorage.getItem('user'));
        console.log(text);
        console.log(this.fileNamePlaceholder);
        this.userService.archiveUserFile(id, this.fileNamePlaceholder, text).subscribe(function (data) {
            _this.clickService.closeSaveFileModal();
            _this.sentenceService.clearSentenceString();
            _this.clickService.showAlertBox();
            _this.sentenceService.clearArchive();
            setTimeout(function () {
                _this.clickService.hideAlertBox();
            }, 5000);
        });
    };
    ArchiveFileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'archive-file',
            templateUrl: 'archive-file.component.html',
            styleUrls: ['archive-file.component.css']
        }),
        __metadata("design:paramtypes", [click_service_1.ClickService,
            sentence_service_1.SentenceService,
            user_service_1.UserService])
    ], ArchiveFileComponent);
    return ArchiveFileComponent;
}());
exports.ArchiveFileComponent = ArchiveFileComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcmNoaXZlLWZpbGUvYXJjaGl2ZS1maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUVsRCw0REFBMEQ7QUFDMUQsa0VBQWdFO0FBQ2hFLDBEQUF3RDtBQVF4RDtJQUlJLDhCQUNVLFlBQTBCLEVBQzFCLGVBQWdDLEVBQ2hDLFdBQXdCO1FBRnhCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU5sQyx3QkFBbUIsR0FBVyxjQUFjLENBQUM7UUFDN0MsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFNM0IsQ0FBQztJQUVOLHVDQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsaURBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDRCwrQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLGVBQWUsQ0FBQTtRQUMzRSxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUM7UUFDOUMsQ0FBQztJQUNMLENBQUM7SUFDRCwwQ0FBVyxHQUFYO1FBQUEsaUJBY0M7UUFiRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDcEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUMvRSxLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdkMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNDLEtBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDakMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQyxVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEzQ1Esb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUMxQyxDQUFDO3lDQU0wQiw0QkFBWTtZQUNULGtDQUFlO1lBQ25CLDBCQUFXO09BUHpCLG9CQUFvQixDQTRDaEM7SUFBRCwyQkFBQztDQTVDRCxBQTRDQyxJQUFBO0FBNUNZLG9EQUFvQiIsImZpbGUiOiJhcHAvYXJjaGl2ZS1maWxlL2FyY2hpdmUtZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL2NsaWNrLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlbnRlbmNlU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy9zZW50ZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FyY2hpdmUtZmlsZScsXG4gIHRlbXBsYXRlVXJsOiAnYXJjaGl2ZS1maWxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2FyY2hpdmUtZmlsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXJjaGl2ZUZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGZpbGVOYW1lUGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiZmlsZW5hbWUucGRmXCI7XG4gICAgY2hlY2tCb3hTdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICAgIHByaXZhdGUgc2VudGVuY2VTZXJ2aWNlOiBTZW50ZW5jZVNlcnZpY2UsXG4gICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxuICAgICkgeyAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJjaGl2ZS1maWxlIGNvbXBvbmVudCBpbml0aWF0ZWQhXCIpO1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5jbG9zZUFyY2hpdmUoKTtcbiAgICB9XG5cbiAgICBjbG9zZVNhdmVGaWxlTW9kYWwoKXtcbiAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmNsb3NlU2F2ZUZpbGVNb2RhbCgpO1xuICAgIH1cbiAgICBjaGFuZ2VDaGVja1ZhbHVlKCl7XG4gICAgICAgIHZhciBmaXJzdG5hbWUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmaXJzdG5hbWUnKSk7XG4gICAgICAgIHZhciBsYXN0bmFtZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RuYW1lJykpO1xuICAgICAgICB0aGlzLmNoZWNrQm94U3RhdHVzID0gIXRoaXMuY2hlY2tCb3hTdGF0dXM7XG4gICAgICAgIGlmKHRoaXMuY2hlY2tCb3hTdGF0dXMgPT0gdHJ1ZSl7XG4gICAgICAgICAgICB0aGlzLmZpbGVOYW1lUGxhY2Vob2xkZXIgPSBmaXJzdG5hbWUgKyBcIi1cIiArIGxhc3RuYW1lICsgXCItZmlsZW5hbWUucGRmXCJcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNoZWNrQm94U3RhdHVzID09IGZhbHNlKXtcbiAgICAgICAgICAgIHRoaXMuZmlsZU5hbWVQbGFjZWhvbGRlciA9IFwiZmlsZW5hbWUucGRmXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2F2ZUFyY2hpdmUoKXtcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLnNlbnRlbmNlU2VydmljZS5nZXRTZW50ZW5jZVN0cmluZygpO1xuICAgICAgICB2YXIgaWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5maWxlTmFtZVBsYWNlaG9sZGVyKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5hcmNoaXZlVXNlckZpbGUoaWQsIHRoaXMuZmlsZU5hbWVQbGFjZWhvbGRlciwgdGV4dCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGlja1NlcnZpY2UuY2xvc2VTYXZlRmlsZU1vZGFsKCk7XG4gICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5jbGVhclNlbnRlbmNlU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5zaG93QWxlcnRCb3goKTtcbiAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLmNsZWFyQXJjaGl2ZSgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmhpZGVBbGVydEJveCgpO1xuICAgICAgICAgICAgfSwgNTAwMClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
