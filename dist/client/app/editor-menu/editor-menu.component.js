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
var sentence_service_1 = require("../_services/sentence.service");
var animations_1 = require("@angular/animations");
var click_service_1 = require("../_services/click.service");
var file_service_1 = require("../_services/file.service");
var user_service_1 = require("../_services/user.service");
var EditorMenuComponent = /** @class */ (function () {
    function EditorMenuComponent(sentenceService, clickService, fileService, userService) {
        var _this = this;
        this.sentenceService = sentenceService;
        this.clickService = clickService;
        this.fileService = fileService;
        this.userService = userService;
        this.newSentence = false;
        this.archiveMenuState = "in";
        this.moveEditorMenu = 'in';
        this.sentenceService.sentenceNum$.subscribe(function (value) {
            console.log("uute lausete arv -> ", value);
            _this.numOfNewSentences = value;
        });
        this.sentenceService.isNewSenActive$.subscribe(function (value) {
            console.log("kas new sentence on active -> ", value);
            _this.newSentence = value;
        });
        this.clickService.archiveClick$.subscribe(function (value) {
            console.log("editor menu archive-slider status -> ", value);
            if (value == false) {
                _this.archiveMenuState = 'in';
                _this.moveEditorMenu = "in";
            }
            else {
                _this.archiveMenuState = 'out';
                _this.moveEditorMenu = "out";
                _this.sentenceService.deActivateNewSen();
            }
        });
    }
    EditorMenuComponent.prototype.zoomIn = function () {
        this.clickService.zoomIn();
    };
    EditorMenuComponent.prototype.zoomOut = function () {
        this.clickService.zoomOut();
    };
    EditorMenuComponent.prototype.toggleArchiveMenu = function () {
        this.archiveMenuState = this.archiveMenuState === 'out' ? 'in' : 'out';
    };
    EditorMenuComponent.prototype.toggleArchive = function () {
        this.clickService.openArchive();
    };
    EditorMenuComponent.prototype.onFileChange = function (event) {
        if (this.sentenceService.getSentenceStringLength() > 0) {
            this.clickService.openConfirmation();
        }
        var files = event.target.files;
        this.saveFiles(files);
    };
    EditorMenuComponent.prototype.removeLast = function () {
        this.clickService.undoLast();
    };
    EditorMenuComponent.prototype.saveFiles = function (files) {
        var _this = this;
        console.log("saveFile initiated from the editor-menu");
        if (files.length > 0) {
            var formData = new FormData();
            formData.append("file", files[0], files[0].name);
            var parameters = {
                userId: JSON.parse(localStorage.getItem('user'))
            };
            this.fileService.upload(formData, parameters).subscribe(function (data) {
                console.log("file upload from editor-menu");
                console.log(data);
                _this.fileService.uploadFromSide(data.filename);
                var id = JSON.parse(localStorage.getItem('user'));
                console.log("editor menu user id -> ", id);
                console.log("editor menu data ->", data.filename);
                _this.userService.addUserLastFile(id, data.filename).subscribe(function (data) {
                    console.log("add user last file in editor menu");
                    console.log(data);
                });
            }, function (error) {
                console.log("there was an error with upload");
            });
        }
    };
    __decorate([
        core_1.HostBinding('@editorMenu'),
        __metadata("design:type", Object)
    ], EditorMenuComponent.prototype, "moveEditorMenu", void 0);
    EditorMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: "editor-menu.component.html",
            styleUrls: ['./editor-menu.component.css'],
            selector: 'editor-menu',
            animations: [
                animations_1.trigger('archiveMenuSlideInOut', [
                    animations_1.state('in', animations_1.style({
                        transform: 'translate3d(100%, 0, 0)'
                    })),
                    animations_1.state('out', animations_1.style({
                        transform: 'translate3d(0,0,0)'
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
                animations_1.trigger('editorMenu', [
                    animations_1.state('in', animations_1.style({
                        marginRight: "0px"
                    })),
                    animations_1.state('out', animations_1.style({
                        marginRight: '300px'
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ]),
            ]
        }),
        __metadata("design:paramtypes", [sentence_service_1.SentenceService,
            click_service_1.ClickService,
            file_service_1.FileService,
            user_service_1.UserService])
    ], EditorMenuComponent);
    return EditorMenuComponent;
}());
exports.EditorMenuComponent = EditorMenuComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9lZGl0b3ItbWVudS9lZGl0b3ItbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNkU7QUFDN0Usa0VBQWdFO0FBQ2hFLGtEQUFnRjtBQUVoRiw0REFBMEQ7QUFDMUQsMERBQXdEO0FBQ3hELDBEQUF3RDtBQWdDeEQ7SUFNSSw2QkFDWSxlQUFnQyxFQUNoQyxZQUEwQixFQUMxQixXQUF3QixFQUN4QixXQUF3QjtRQUpwQyxpQkEwQkM7UUF6Qlcsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUnBDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLHFCQUFnQixHQUFXLElBQUksQ0FBQztRQUNKLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBUzlDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUMxQyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3BELEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQSxD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Q0FBQyxLQUFLLEVBQUUsa0JBQUssQ0FBQzt3QkFDZixXQUFXLEVBQUUsT0FBTztxQkFDdkIsQ0FBQyxDQUFDO29CQUNILHVCQUFVLENBQUMsV0FBVyxFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDckQsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUN4RCxDQUFDO2FBRUw7U0FDSixDQUFDO3lDQVErQixrQ0FBZTtZQUNsQiw0QkFBWTtZQUNiLDBCQUFXO1lBQ1gsMEJBQVc7T0FWM0IsbUJBQW1CLENBdUYvQjtJQUFELDBCQUFDO0NBdkZELEFBdUZDLElBQUE7QUF2Rlksa0RBQW1CIiwiZmlsZSI6ImFwcC9lZGl0b3ItbWVudS9lZGl0b3ItbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSG9zdExpc3RlbmVyLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VudGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL3NlbnRlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy9jbGljay5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy9maWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcImVkaXRvci1tZW51LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZWRpdG9yLW1lbnUuY29tcG9uZW50LmNzcyddLFxuICAgIHNlbGVjdG9yOiAnZWRpdG9yLW1lbnUnLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYXJjaGl2ZU1lbnVTbGlkZUluT3V0JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ291dCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbiA9PiBvdXQnLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ291dCA9PiBpbicsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpXG4gICAgICAgIF0pLFxuICAgICAgICB0cmlnZ2VyKCdlZGl0b3JNZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjBweFwiXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMzAwcHgnXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbiA9PiBvdXQnLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ291dCA9PiBpbicsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpXG4gICAgICAgIF0pLFxuXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JNZW51Q29tcG9uZW50e1xuICAgIG51bU9mTmV3U2VudGVuY2VzOiBudW1iZXI7XG4gICAgbmV3U2VudGVuY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhcmNoaXZlTWVudVN0YXRlOiBzdHJpbmcgPSBcImluXCI7XG4gICAgQEhvc3RCaW5kaW5nKCdAZWRpdG9yTWVudScpIG1vdmVFZGl0b3JNZW51ID0gJ2luJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNlbnRlbmNlU2VydmljZTogU2VudGVuY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNsaWNrU2VydmljZTogQ2xpY2tTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2VcblxuICAgICl7XG4gICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnNlbnRlbmNlTnVtJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1dXRlIGxhdXNldGUgYXJ2IC0+IFwiLCB2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMubnVtT2ZOZXdTZW50ZW5jZXMgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UuaXNOZXdTZW5BY3RpdmUkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImthcyBuZXcgc2VudGVuY2Ugb24gYWN0aXZlIC0+IFwiLCB2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMubmV3U2VudGVuY2UgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2UuYXJjaGl2ZUNsaWNrJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGl0b3IgbWVudSBhcmNoaXZlLXNsaWRlciBzdGF0dXMgLT4gXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmKHZhbHVlID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVNZW51U3RhdGUgPSAnaW4nO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUVkaXRvck1lbnUgPSBcImluXCI7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVNZW51U3RhdGUgPSAnb3V0JztcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFZGl0b3JNZW51ID0gXCJvdXRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5kZUFjdGl2YXRlTmV3U2VuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHpvb21Jbigpe1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS56b29tSW4oKTtcbiAgICB9XG4gICAgem9vbU91dCgpe1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS56b29tT3V0KCk7XG4gICAgfVxuICAgIHRvZ2dsZUFyY2hpdmVNZW51KCl7XG4gICAgICAgIHRoaXMuYXJjaGl2ZU1lbnVTdGF0ZSA9IHRoaXMuYXJjaGl2ZU1lbnVTdGF0ZSA9PT0gJ291dCcgPyAnaW4nIDogJ291dCc7XG4gICAgfVxuICAgIHRvZ2dsZUFyY2hpdmUoKXtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uub3BlbkFyY2hpdmUoKTtcbiAgICB9XG4gICAgb25GaWxlQ2hhbmdlKGV2ZW50KXtcbiAgICAgICAgaWYodGhpcy5zZW50ZW5jZVNlcnZpY2UuZ2V0U2VudGVuY2VTdHJpbmdMZW5ndGgoKSA+IDApe1xuICAgICAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uub3BlbkNvbmZpcm1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWxlcyA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICAgICAgdGhpcy5zYXZlRmlsZXMoZmlsZXMpO1xuICAgIH1cbiAgICByZW1vdmVMYXN0KCl7XG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnVuZG9MYXN0KCk7XG4gICAgfVxuICAgIHNhdmVGaWxlcyhmaWxlcyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2F2ZUZpbGUgaW5pdGlhdGVkIGZyb20gdGhlIGVkaXRvci1tZW51XCIpO1xuICAgICAgICBpZihmaWxlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHZhciBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZXNbMF0sIGZpbGVzWzBdLm5hbWUpO1xuXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UudXBsb2FkKGZvcm1EYXRhLCBwYXJhbWV0ZXJzKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZSB1cGxvYWQgZnJvbSBlZGl0b3ItbWVudVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVNlcnZpY2UudXBsb2FkRnJvbVNpZGUoZGF0YS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRpdG9yIG1lbnUgdXNlciBpZCAtPiBcIiwgaWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRvciBtZW51IGRhdGEgLT5cIiwgZGF0YS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UuYWRkVXNlckxhc3RGaWxlKGlkLCBkYXRhLmZpbGVuYW1lKS5zdWJzY3JpYmUoZGF0YT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGQgdXNlciBsYXN0IGZpbGUgaW4gZWRpdG9yIG1lbnVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB1cGxvYWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxufVxuIl19
