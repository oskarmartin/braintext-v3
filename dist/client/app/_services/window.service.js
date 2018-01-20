"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function _window() {
    return window;
}
exports.WINDOW = new core_1.InjectionToken("WindowToken");
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "NativeWindow", {
        get: function () {
            throw new Error("Not implemented.");
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());
exports.WindowRef = WindowRef;
var BrowserWindowRef = /** @class */ (function (_super) {
    __extends(BrowserWindowRef, _super);
    function BrowserWindowRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    return BrowserWindowRef;
}(WindowRef));
exports.BrowserWindowRef = BrowserWindowRef;
var browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
var windowProvider = {
    provide: exports.WINDOW,
    useFactory: _window,
    deps: []
};
exports.WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvd2luZG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQStFO0FBRS9FO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ1ksUUFBQSxNQUFNLEdBQUcsSUFBSSxxQkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXhEO0lBQUE7SUFLQSxDQUFDO0lBSkcsc0JBQUksbUNBQVk7YUFBaEI7WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFTCxnQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTHFCLDhCQUFTO0FBTS9CO0lBQXNDLG9DQUFTO0lBQzNDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBQ0Qsc0JBQUksMENBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCx1QkFBQztBQUFELENBUEEsQUFPQyxDQVBxQyxTQUFTLEdBTzlDO0FBUFksNENBQWdCO0FBUTdCLElBQU0scUJBQXFCLEdBQWtCO0lBQ3pDLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxnQkFBZ0I7Q0FDN0IsQ0FBQTtBQUNELElBQU0sY0FBYyxHQUFvQjtJQUNwQyxPQUFPLEVBQUUsY0FBTTtJQUNmLFVBQVUsRUFBRSxPQUFPO0lBQ25CLElBQUksRUFBRSxFQUFFO0NBQ1gsQ0FBQztBQUNXLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIscUJBQXFCO0lBQ3JCLGNBQWM7Q0FDakIsQ0FBQSIsImZpbGUiOiJhcHAvX3NlcnZpY2VzL3dpbmRvdy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0wqB7IENsYXNzUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5mdW5jdGlvbiBfd2luZG93KCk6IGFueXtcbiAgICByZXR1cm4gd2luZG93O1xufVxuZXhwb3J0IGNvbnN0IFdJTkRPVyA9IG5ldyBJbmplY3Rpb25Ub2tlbihcIldpbmRvd1Rva2VuXCIpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2luZG93UmVme1xuICAgIGdldCBOYXRpdmVXaW5kb3coKTogV2luZG93e1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH1cblxufVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYgZXh0ZW5kcyBXaW5kb3dSZWZ7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKVxuICAgIH1cbiAgICBnZXQgbmF0aXZlV2luZG93KCk6IFdpbmRvd3tcbiAgICAgICAgcmV0dXJuIF93aW5kb3coKTtcbiAgICB9XG59XG5jb25zdCBicm93c2VyV2luZG93UHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7XG4gICAgcHJvdmlkZTogV2luZG93UmVmLFxuICAgIHVzZUNsYXNzOiBCcm93c2VyV2luZG93UmVmXG59XG5jb25zdCB3aW5kb3dQcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6IFdJTkRPVyxcbiAgICB1c2VGYWN0b3J5OiBfd2luZG93LFxuICAgIGRlcHM6IFtdXG59O1xuZXhwb3J0IGNvbnN0IFdJTkRPV19QUk9WSURFUlMgPSBbXG4gICAgYnJvd3NlcldpbmRvd1Byb3ZpZGVyLFxuICAgIHdpbmRvd1Byb3ZpZGVyXG5dXG4iXX0=
