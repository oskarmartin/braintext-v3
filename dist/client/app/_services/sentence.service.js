"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var SentenceService = /** @class */ (function () {
    function SentenceService() {
        this.sentenceString = "";
        this.sentence = new Subject_1.Subject();
        this.sentence$ = this.sentence.asObservable();
        this.sentenceNum = new Subject_1.Subject();
        this.counter = 0;
        this.sentenceNum$ = this.sentenceNum.asObservable();
        this.isNewSenActive = new Subject_1.Subject();
        this.isNewSenActive$ = this.isNewSenActive.asObservable();
        this.emptyArchive = new Subject_1.Subject();
        this.emptyArchive$ = this.emptyArchive.asObservable();
    }
    SentenceService.prototype.publishData = function (data) {
        this.addSentence(data);
        this.sentence.next(data);
        this.counter++;
        this.sentenceNum.next(this.counter);
        this.isNewSenActive.next(true);
    };
    SentenceService.prototype.deActivateNewSen = function () {
        console.log("deactivate new sentence!");
        this.counter = 0;
        this.isNewSenActive.next(false);
        this.sentenceNum.next(0);
    };
    SentenceService.prototype.addSentence = function (sentence) {
        this.sentenceString += sentence;
        console.log(this.sentenceString);
    };
    SentenceService.prototype.getSentenceStringLength = function () {
        return this.sentenceString.length;
    };
    SentenceService.prototype.clearSentenceString = function () {
        this.sentenceString = "";
    };
    SentenceService.prototype.getSentenceString = function () {
        return this.sentenceString;
    };
    SentenceService.prototype.clearArchive = function () {
        this.emptyArchive.next(true);
    };
    SentenceService = __decorate([
        core_1.Injectable()
    ], SentenceService);
    return SentenceService;
}());
exports.SentenceService = SentenceService;

//# sourceMappingURL=sentence.service.js.map
