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

//# sourceMappingURL=sidemenutext.pipe.js.map
