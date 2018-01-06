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
var animations_1 = require("@angular/animations");
var click_service_1 = require("../_services/click.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(clickService) {
        var _this = this;
        this.clickService = clickService;
        this.menuState = 'in';
        this.saveFileActive = false;
        this.saveFileAlert = false;
        this.confirmationActive = false;
        this.clickService.saveFile$.subscribe(function (value) {
            _this.saveFileActive = value;
        });
        this.clickService.sideMenu$.subscribe(function (value) {
            _this.menuState = value;
        });
        this.clickService.alertBox$.subscribe(function (value) {
            _this.saveFileAlert = value;
        });
        this.clickService.archiveConfirmation$.subscribe(function (value) {
            console.log("confirmationActive state -> ", value);
            _this.confirmationActive = value;
        });
    }
    DashboardComponent.prototype.ngOnInit = function () { };
    DashboardComponent.prototype.toggleMenu = function () {
        console.log("this.menuState", this.menuState);
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
        this.clickService.moveBody();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css'],
            animations: [
                animations_1.trigger('slideInOut', [
                    animations_1.state('in', animations_1.style({
                        width: '450px',
                        left: "-450px"
                    })),
                    animations_1.state('out', animations_1.style({
                        width: '450px',
                        left: "0"
                    })),
                    animations_1.transition('in => out', animations_1.animate('400ms ease-in-out')),
                    animations_1.transition('out => in', animations_1.animate('400ms ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [click_service_1.ClickService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxrREFBZ0Y7QUFHaEYsNERBQTBEO0FBc0IxRDtJQUtFLDRCQUNVLFlBQTBCO1FBRHBDLGlCQWdCRztRQWZPLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTHBDLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBSTlCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDdkMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUE7UUFDL0IsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ3ZDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN2QyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUgscUNBQVEsR0FBUixjQUFZLENBQUM7SUFDYix1Q0FBVSxHQUFWO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBNUJVLGtCQUFrQjtRQXBCOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ3RDLFVBQVUsRUFBQztnQkFDUCxvQkFBTyxDQUFDLFlBQVksRUFBRTtvQkFDbEIsa0JBQUssQ0FBQyxJQUFJLEVBQUUsa0JBQUssQ0FBQzt3QkFDZCxLQUFLLEVBQUUsT0FBTzt3QkFDZCxJQUFJLEVBQUUsUUFBUTtxQkFDakIsQ0FBQyxDQUFDO29CQUNILGtCQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFLLENBQUM7d0JBQ2YsS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLEdBQUc7cUJBQ1osQ0FBQyxDQUFDO29CQUNILHVCQUFVLENBQUMsV0FBVyxFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDckQsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUN4RCxDQUFDO2FBQ0w7U0FDRixDQUFDO3lDQU93Qiw0QkFBWTtPQU56QixrQkFBa0IsQ0E2QjlCO0lBQUQseUJBQUM7Q0E3QkQsQUE2QkMsSUFBQTtBQTdCWSxnREFBa0IiLCJmaWxlIjoiYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cblxuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL2NsaWNrLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxuICB0ZW1wbGF0ZVVybDogJ2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXNoYm9hcmQuY29tcG9uZW50LmNzcyddLFxuICBhbmltYXRpb25zOltcbiAgICAgIHRyaWdnZXIoJ3NsaWRlSW5PdXQnLCBbXG4gICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgICAgbGVmdDogXCItNDUwcHhcIlxuICAgICAgICAgIH0pKSxcbiAgICAgICAgICBzdGF0ZSgnb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgICAgbGVmdDogXCIwXCJcbiAgICAgICAgICB9KSksXG4gICAgICAgICAgdHJhbnNpdGlvbignaW4gPT4gb3V0JywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSksXG4gICAgICAgICAgdHJhbnNpdGlvbignb3V0ID0+IGluJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSlcbiAgICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbWVudVN0YXRlOiBzdHJpbmcgPSAnaW4nO1xuICBzYXZlRmlsZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBzYXZlRmlsZUFsZXJ0OiBib29sZWFuID0gZmFsc2U7XG4gIGNvbmZpcm1hdGlvbkFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNsaWNrU2VydmljZTogQ2xpY2tTZXJ2aWNlXG4gICkge1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5zYXZlRmlsZSQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUZpbGVBY3RpdmUgPSB2YWx1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5zaWRlTWVudSQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVudVN0YXRlID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFsZXJ0Qm94JC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zYXZlRmlsZUFsZXJ0ID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLmFyY2hpdmVDb25maXJtYXRpb24kLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbmZpcm1hdGlvbkFjdGl2ZSBzdGF0ZSAtPiBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb25BY3RpdmUgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgbmdPbkluaXQoKSB7fVxuICB0b2dnbGVNZW51KCl7XG4gICAgICBjb25zb2xlLmxvZyhcInRoaXMubWVudVN0YXRlXCIsIHRoaXMubWVudVN0YXRlKTtcbiAgICAgIHRoaXMubWVudVN0YXRlID0gdGhpcy5tZW51U3RhdGUgPT09ICdvdXQnID8gJ2luJyA6ICdvdXQnO1xuICAgICAgdGhpcy5jbGlja1NlcnZpY2UubW92ZUJvZHkoKTtcbiAgfVxufVxuIl19
