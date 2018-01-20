"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        return Object.keys(value);
    };
    KeysPipe = __decorate([
        core_1.Pipe({
            name: 'keys',
            pure: false
        })
    ], KeysPipe);
    return KeysPipe;
}());
exports.KeysPipe = KeysPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fcGlwZXMva2V5c3BpcGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQU1wRDtJQUFBO0lBSUEsQ0FBQztJQUhHLDRCQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsSUFBYztRQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBSFEsUUFBUTtRQUpwQixXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQztPQUNXLFFBQVEsQ0FJcEI7SUFBRCxlQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksNEJBQVEiLCJmaWxlIjoiYXBwL19waXBlcy9rZXlzcGlwZS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAna2V5cycsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgS2V5c1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3Jte1xuICAgIHRyYW5zZm9ybSh2YWx1ZSwgYXJnczogc3RyaW5nW10pOiBhbnl7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgfVxufVxuIl19
