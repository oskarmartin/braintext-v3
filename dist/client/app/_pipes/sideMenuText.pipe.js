"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sideMenuTextPipe = /** @class */ (function () {
    function sideMenuTextPipe() {
    }
    sideMenuTextPipe.prototype.transform = function (value) {
        if (value.length > 25) {
            var text = value.substring(0, 15) + "..." + value.substring(value.length - 8, value.length);
            return text;
        }
        else {
            return value;
        }
    };
    sideMenuTextPipe = __decorate([
        core_1.Pipe({
            name: 'sideMenuDoc',
            pure: false
        })
    ], sideMenuTextPipe);
    return sideMenuTextPipe;
}());
exports.sideMenuTextPipe = sideMenuTextPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fcGlwZXMvc2lkZW1lbnV0ZXh0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFNcEQ7SUFBQTtJQVVBLENBQUM7SUFURyxvQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDbEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBRUwsQ0FBQztJQVRRLGdCQUFnQjtRQUo1QixXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsS0FBSztTQUNkLENBQUM7T0FDVyxnQkFBZ0IsQ0FVNUI7SUFBRCx1QkFBQztDQVZELEFBVUMsSUFBQTtBQVZZLDRDQUFnQiIsImZpbGUiOiJhcHAvX3BpcGVzL3NpZGVtZW51dGV4dC5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnc2lkZU1lbnVEb2MnLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIHNpZGVNZW51VGV4dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3Jte1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5ne1xuICAgICAgICBpZih2YWx1ZS5sZW5ndGggPiAyNSl7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHZhbHVlLnN1YnN0cmluZygwLCAxNSkgKyBcIi4uLlwiICsgdmFsdWUuc3Vic3RyaW5nKHZhbHVlLmxlbmd0aC04LCB2YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=
