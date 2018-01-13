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

//# sourceMappingURL=window.service.js.map
