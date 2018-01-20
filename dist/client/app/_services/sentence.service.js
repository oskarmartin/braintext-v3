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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvc2VudGVuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyx3Q0FBdUM7QUFHdkM7SUFEQTtRQUVJLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVqQyxnQkFBVyxHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBQ3BDLFlBQU8sR0FBWSxDQUFDLENBQUM7UUFDN0IsaUJBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXZDLG1CQUFjLEdBQUcsSUFBSSxpQkFBTyxFQUFXLENBQUM7UUFDaEQsb0JBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTdDLGlCQUFZLEdBQUcsSUFBSSxpQkFBTyxFQUFXLENBQUM7UUFDOUMsa0JBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBaUNyRCxDQUFDO0lBL0JHLHFDQUFXLEdBQVgsVUFBWSxJQUFZO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCwwQ0FBZ0IsR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHFDQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUV4QixJQUFJLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaURBQXVCLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFDRCw2Q0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsMkNBQWlCLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUNELHNDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUNRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTtPQUNBLGVBQWUsQ0E4QzNCO0lBQUQsc0JBQUM7Q0E5Q0QsQUE4Q0MsSUFBQTtBQTlDWSwwQ0FBZSIsImZpbGUiOiJhcHAvX3NlcnZpY2VzL3NlbnRlbmNlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZW50ZW5jZVNlcnZpY2V7XG4gICAgc2VudGVuY2VTdHJpbmc6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBzZW50ZW5jZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBzZW50ZW5jZSQgPSB0aGlzLnNlbnRlbmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBzZW50ZW5jZU51bSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBwcml2YXRlIGNvdW50ZXIgOiBudW1iZXIgPSAwO1xuICAgIHNlbnRlbmNlTnVtJCA9IHRoaXMuc2VudGVuY2VOdW0uYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBwcml2YXRlIGlzTmV3U2VuQWN0aXZlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgICBpc05ld1NlbkFjdGl2ZSQgPSB0aGlzLmlzTmV3U2VuQWN0aXZlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBlbXB0eUFyY2hpdmUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIGVtcHR5QXJjaGl2ZSQgPSB0aGlzLmVtcHR5QXJjaGl2ZS5hc09ic2VydmFibGUoKTtcblxuICAgIHB1Ymxpc2hEYXRhKGRhdGE6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuYWRkU2VudGVuY2UoZGF0YSk7XG4gICAgICAgIHRoaXMuc2VudGVuY2UubmV4dChkYXRhKTtcbiAgICAgICAgdGhpcy5jb3VudGVyKys7XG4gICAgICAgIHRoaXMuc2VudGVuY2VOdW0ubmV4dCh0aGlzLmNvdW50ZXIpO1xuICAgICAgICB0aGlzLmlzTmV3U2VuQWN0aXZlLm5leHQodHJ1ZSk7XG4gICAgfVxuICAgIGRlQWN0aXZhdGVOZXdTZW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJkZWFjdGl2YXRlIG5ldyBzZW50ZW5jZSFcIik7XG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuaXNOZXdTZW5BY3RpdmUubmV4dChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2VudGVuY2VOdW0ubmV4dCgwKTtcbiAgICB9XG4gICAgYWRkU2VudGVuY2Uoc2VudGVuY2U6IHN0cmluZyl7XG5cbiAgICAgICAgdGhpcy5zZW50ZW5jZVN0cmluZyArPSBzZW50ZW5jZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZW50ZW5jZVN0cmluZyk7XG4gICAgfVxuICAgIGdldFNlbnRlbmNlU3RyaW5nTGVuZ3RoKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbnRlbmNlU3RyaW5nLmxlbmd0aDtcbiAgICB9XG4gICAgY2xlYXJTZW50ZW5jZVN0cmluZygpe1xuICAgICAgICB0aGlzLnNlbnRlbmNlU3RyaW5nID0gXCJcIjtcbiAgICB9XG4gICAgZ2V0U2VudGVuY2VTdHJpbmcoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VudGVuY2VTdHJpbmc7XG4gICAgfVxuICAgIGNsZWFyQXJjaGl2ZSgpe1xuICAgICAgICB0aGlzLmVtcHR5QXJjaGl2ZS5uZXh0KHRydWUpO1xuICAgIH1cblxufVxuIl19
