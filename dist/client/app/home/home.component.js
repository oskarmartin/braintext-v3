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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/animations");
var user_service_1 = require("../_services/user.service");
var sentence_service_1 = require("../_services/sentence.service");
var click_service_1 = require("../_services/click.service");
var file_service_1 = require("../_services/file.service");
var platform_browser_2 = require("@angular/platform-browser");
var window_service_1 = require("../_services/window.service");
require("rxjs/add/operator/map");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, http, ref, sentenceService, clickService, fileService, document, window, elementRef, sanitizer) {
        var _this = this;
        this.userService = userService;
        this.http = http;
        this.ref = ref;
        this.sentenceService = sentenceService;
        this.clickService = clickService;
        this.fileService = fileService;
        this.document = document;
        this.window = window;
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
        this.users = [];
        this.isLoaded = false;
        this.pdfSrc = "";
        this.numOfNewSentences = 0;
        this.newSentence = false;
        this.zoomLevel = 0.8;
        this.menuState = "in";
        this.showLastFile = false;
        this.sentenceService.sentenceNum$.subscribe(function (value) {
            console.log("uute lausete arv -> ", value);
            _this.numOfNewSentences = value;
        });
        this.sentenceService.isNewSenActive$.subscribe(function (value) {
            console.log("kas new sentence on active -> ", value);
            _this.newSentence = value;
        });
        this.fileService.fileSrc$.subscribe(function (value) {
            _this.loadDataFromServer(value);
        });
        this.clickService.zoomLevel$.subscribe(function (value) {
            _this.zoomLevel = value;
        });
    }
    /*@HostListener("window:scroll", [])
    onWindowScroll(){
        let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    }*/
    HomeComponent.prototype.createHeaders = function (headers) {
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.userData();
        this.lastFile();
    };
    HomeComponent.prototype.userData = function () {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('user'));
        this.userService.getById(id).subscribe(function (data) {
            _this.userService.addUserToSession(data.username);
        });
    };
    HomeComponent.prototype.lastFile = function () {
        var _this = this;
        var id = JSON.parse(localStorage.getItem('user'));
        this.userService.getUserLastFile(id).subscribe(function (data) {
            if (data.length != 0) {
                _this.showLastFile = true;
                _this.pdfSrc = "tmp/" + data + ".pdf";
            }
            else {
                _this.showLastFile = false;
            }
        });
    };
    HomeComponent.prototype.tryToggle = function () {
        this.clickService.openArchive();
    };
    HomeComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll()
            .subscribe(function (data) { return _this.users = data; });
    };
    HomeComponent.prototype.uploaded = function (event) {
        var _this = this;
        console.log("this means that upload is complete!");
        console.log(event);
        var id = JSON.parse(localStorage.getItem('user'));
        this.userService.addUserLastFile(id, event).subscribe(function (data) {
            _this.showLastFile = true;
        });
        this.loadDataFromServer(event);
    };
    HomeComponent.prototype.loadDataFromServer = function (filename) {
        var _this = this;
        console.log("loadDataFromServer triggered");
        return this.http.post('/api/getupload', { filename: filename })
            .subscribe(function (data) {
            console.log(data.json().url);
            _this.pdfSrc = data.json().url;
        });
    };
    HomeComponent.prototype.afterLoadComplete = function (pdf) {
        this.pdf = pdf;
        this.isLoaded = true;
    };
    HomeComponent.prototype.onClick = function (event) {
        var targetText;
        var target = event.target || event.srcElement || event.currentTarget;
        if (target.innerText != null) {
            console.log("inner text ei ole null");
            targetText = event.target.innerText;
        }
        else {
            console.log("inner text on null!");
            targetText = "null";
        }
        var allIndexes = [];
        var endQuoteMarkSum = 0;
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var node = selection.anchorNode;
        var qMarkIndexes = this.indexFinder(targetText, '?');
        var eMarkIndexes = this.indexFinder(targetText, '!');
        var dotIndexesTest = this.indexFinder(targetText, '.');
        var quoteIndexes = this.indexFinder(targetText, '"');
        var firstAlphabeticalIndex = targetText.indexOf(this.findFirstAlphabetical(targetText));
        allIndexes = qMarkIndexes.concat(eMarkIndexes, dotIndexesTest);
        allIndexes = allIndexes.sort(function (a, b) { return a - b; });
        console.log("BEFORE ALGO: First alphabetical letter in a string -> ", this.findFirstAlphabetical(targetText));
        console.log("BEFORE ALGO: First alphabetical letter index -> ", "background:#222;", targetText.indexOf(this.findFirstAlphabetical(targetText)));
        if (allIndexes.length != 0) {
            allIndexes = this.checkAbbreviations(allIndexes, targetText);
            var removeIndexes = this.checkNum(dotIndexesTest, targetText);
            console.log("removeIndexes here -> ", removeIndexes);
            console.log("Märkide array peale kontrolli -> ", allIndexes);
            console.log("Clickitava sõna/koha index -> ", range.startOffset);
            if (allIndexes.length == 1) {
                if (allIndexes[0] == removeIndexes[0]) {
                    allIndexes = [];
                }
                else {
                    console.log("m");
                }
            }
            else {
                allIndexes = allIndexes.filter(function (x) {
                    console.log("FILTER FUN: x -> ", x);
                    console.log("FILTER FUN: removeIndexes.indexOf(x) -> ", removeIndexes.indexOf(x));
                    return removeIndexes.indexOf(x) < 0;
                });
            }
            console.log("allIndexes peale filterit -> ", allIndexes);
        }
        var wordStartIndex = range.startOffset;
        var endQuoteMarkSum = allIndexes.length;
        if (endQuoteMarkSum === 0) {
            if (this.findFirstAlphabetical(targetText) == targetText.charAt(firstAlphabeticalIndex).toUpperCase()) {
                console.log("lauselõpumärke on blokis 0 ja algustäht on suur!");
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(firstAlphabeticalIndex));
                this.sentenceService.publishData(lause);
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
            else {
                var lauseTagasi = this.lookBack(event.target.previousElementSibling, "");
                var lauseEdasi = this.lookForward(event.target.nextElementSibling, "");
                var test = lauseTagasi + " " + targetText + " " + lauseEdasi;
                this.sentenceService.publishData(test);
                console.log("%c" + test, "background: #222 ; color: #bada55");
            }
        }
        if (endQuoteMarkSum === 1) {
            console.log("ALGOR fn: indexArrays on ainult 1 märk!");
            if (allIndexes[0] < wordStartIndex) {
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(allIndexes[0] + 1));
                this.sentenceService.publishData(lause);
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
            if (allIndexes[0] > wordStartIndex) {
                if (targetText.charAt(0) == targetText.charAt(0).toUpperCase()) {
                    var suureAlgusega = targetText.substring(0, allIndexes[0]);
                    this.sentenceService.publishData(suureAlgusega);
                    console.log("%c" + suureAlgusega, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, allIndexes[0] + 1));
                    this.sentenceService.publishData(lause);
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
            }
        }
        if (endQuoteMarkSum >= 2) {
            var isBetweenIndexesLength = this.isBetweenIndexes(wordStartIndex, allIndexes).length;
            console.log("IsBetweenIndexesLength -> ", isBetweenIndexesLength);
            var isBetweenIndexesResult = this.isBetweenIndexes(wordStartIndex, allIndexes);
            console.log("IsBetweenIndexesArray -> ", isBetweenIndexesResult);
            //Means that sentence is between two dots in block
            if (isBetweenIndexesLength === 2) {
                this.archiveString = targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1] + 1);
                this.sentenceService.publishData(this.archiveString);
                console.log(this.archiveString);
                target.innerText = this.sanitizer.bypassSecurityTrustHtml('<span style="background:red;">' + this.archiveString + '</span>');
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] > wordStartIndex) {
                //tagurpidi rekursioon
                if (!event.target.previousElementSibling) {
                    var lause = event.target.innerText.substring(0, isBetweenIndexesResult[0] + 1);
                    this.sentenceService.publishData(lause);
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, isBetweenIndexesResult[0] + 1));
                    this.sentenceService.publishData(lause);
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] < wordStartIndex) {
                //edaspidi rekursioon
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(isBetweenIndexesResult[0] + 1));
                this.sentenceService.publishData(lause);
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
        }
    };
    HomeComponent.prototype.lookForward = function (nextBlock, builder) {
        var text = builder;
        var next = nextBlock;
        if (this.countMarks(next.innerText, '[\\.\\?\\!]') > 0) {
            console.log("FORWARD REK: innerText -> ", next.innerText);
            var dotIndex = this.indexFinder(next.innerText, '.');
            var questionIndex = this.indexFinder(next.innerText, '?');
            var exclIndex = this.indexFinder(next.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            console.log("FORWARD REK: indexesForCheck -> ", indexesForCheck);
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, next.innerText);
            var removeIndexes = this.checkNum(dotIndex, next.innerText);
            console.log("FORWARD REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            console.log("FORWARD REK: indexes after filter -> ", indexesForCheck);
            if (indexesForCheck.length == 0) {
                text += " " + next.innerText;
                return this.lookForward(next.nextElementSibling, text);
            }
            else {
                return text + " " + next.innerText.substring(0, indexesForCheck[0] + 1);
            }
        }
        else {
            text += " " + next.innerText;
            return this.lookForward(next.nextElementSibling, text);
        }
    };
    HomeComponent.prototype.lookBack = function (previousBlock, builder) {
        var text = builder;
        var prev = previousBlock;
        if (this.countMarks(prev.innerText, '[\\.\\?\\!]') > 0) {
            console.log("BACK REK: innerText -> ", prev.innerText);
            var dotIndex = this.indexFinder(prev.innerText, '.');
            var questionIndex = this.indexFinder(prev.innerText, '?');
            var exclIndex = this.indexFinder(prev.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            console.log("BACK REK: indexesForCheck -> ", indexesForCheck);
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, prev.innerText);
            var removeIndexes = this.checkNum(dotIndex, prev.innerText);
            console.log("BACK REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            console.log("BACK REK: indexes after filter -> ", indexesForCheck);
            if (indexesForCheck.length == 0) {
                text = prev.innerText + " " + text;
                return this.lookBack(prev.previousElementSibling, text);
            }
            else {
                return prev.innerText.substring(indexesForCheck[indexesForCheck.length - 1] + 1) + " " + text;
            }
        }
        else {
            text = prev.innerText + " " + text;
            return this.lookBack(prev.previousElementSibling, text);
        }
    };
    HomeComponent.prototype.checkNum = function (dotIndexArray, text) {
        console.log("CHECKNUM: checkNum läks käima!");
        var spaceIndex;
        var returnIndexes = [];
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) === " ") {
                spaceIndex = i;
            }
            if (text.charAt(i) === ".") {
                console.log("CHECKNUM: leidis ülesse punkti");
                console.log("CHECKNUM: punktist eelmine char -> ", text.charAt(i - 1));
                console.log("CHECKNUM: kas eelmine on number -> ", this.isNumeric(text.charAt(i - 1)));
                var previousLetter = text.charAt(i - 1);
                var isInTheEnd = this.lookForBigLetter(text.substring(spaceIndex, i), text);
                var firstAlphabeticalIndex = text.indexOf(this.findFirstAlphabetical(text.substring(i + 1)));
                console.log("CHECKNUM: text -> ", text);
                console.log("CHECKNUM: i -> ", i);
                console.log("CHECKNUM: isInTheEnd variable -> ", isInTheEnd);
                console.log("CHECKNUM: text.substring(i+1) -> ", text.substring(i + 1));
                console.log("CHECKNUM: first alphabetical -> ", this.findFirstAlphabetical(text.substring(i + 1)));
                console.log("CHECKNUM: uppercase -> ", text.charAt(firstAlphabeticalIndex).toUpperCase());
                console.log("CHEKCNUM: text.charAt(i+1) -> ", text.charAt(i + 1));
                console.log("CHECKNUM: isNumeric -> ", this.isNumeric(text.charAt(i + 1)));
                if (text.charAt(i + 1) === " " && this.findFirstAlphabetical(text.substring(i + 1)) !=
                    text.charAt(firstAlphabeticalIndex).toUpperCase()) {
                    console.log("CHECKNUM: ei ole lause lõpus");
                }
                if (this.isNumeric(text.charAt(i + 1))) {
                    console.log("punktist järgmine on number");
                    returnIndexes.push(i);
                }
                /*if(this.isNumeric(previousLetter) && text.charAt(i+1) === " " && isInTheEnd){
                    console.log("see punkt on lause lõpus index -> ", i);
                    break;
                }
                if(!this.isNumeric(previousLetter) && text.charAt(i+1) === " " && isInTheEnd){
                    console.log("lauselõpu punkt tähega koos -> ", i);
                }
                else{

                    returnIndexes.push(i);
                }*/
            }
        }
        console.log("CHECKNUM: checknumist tagastatavad eemaldamisele minevad indexid -> ", returnIndexes);
        return returnIndexes;
    };
    HomeComponent.prototype.isNumeric = function (value) {
        return !isNaN(value - parseFloat(value));
    };
    HomeComponent.prototype.checkAbbreviations = function (indexArray, text) {
        var spaceIndex;
        var returnIndexes = [];
        var spaceIndexArray = [];
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) === " ") {
                spaceIndex = i;
            }
            if (text.charAt(i) === "." || text.charAt(i) === "?" || text.charAt(i) === "!") {
                //console.log("ABR fn: char kohal i on -> ", text.charAt(i));
                console.log("ABR fn: eelmisest tühikust kuni punktini -> ", text.substring(spaceIndex, i + 1));
                var memoryCheckName = this.checkMemoryNameAb(text.substring(spaceIndex, i + 1).toLowerCase());
                var memoryCheckEnd = this.checkMemoryOther(text.substring(spaceIndex, i + 1).toLowerCase(), text);
                //console.log("ABR fn: nameCheckFn result -> ", memoryCheckName);
                if (!memoryCheckName && !memoryCheckEnd) {
                    console.log(i);
                    returnIndexes.push(i);
                }
            }
        }
        console.log("ABR fn: tagastatavad indexid -> ", returnIndexes);
        return returnIndexes;
    };
    HomeComponent.prototype.checkMemoryNameAb = function (word) {
        //console.log("CHECKNAME fn: abrv -> ", word);
        var nameAbArray = [
            "mr.", "mrs.", "miss.",
            "dr.", "rev.", "hon.",
            "prof.", "gen.", "rep.",
            "sen.", "st.", "capt.",
            "sgt.", "pvt.", "sir.",
            "comdr.", "corp.", "cpl.",
            "gov.", "akad.", "arh.",
            "dir.", "hr.", "i.", "lp.",
            "pr.", "prl.", "rnkl.",
            "rvkl.", "v.a", "õp."
        ];
        var l = nameAbArray.length;
        for (var i = 0; i < l; i++) {
            if (nameAbArray[i] == word.trim()) {
                return true;
            }
        }
        return false;
    };
    HomeComponent.prototype.checkMemoryOther = function (word, sentence) {
        var memoryArray = [
            "e.g", "a.i.", "a.m.",
            "cca.", "c.", "ca.",
            "cap.", "cf.", "cp.",
            "c.v.", "cwt.", "d.v.",
            "ead.", "al.", "etc.",
            "fl.", "f.", "ff.",
            "ibid.", "id.", "i.a.",
            "i.e.", "lb.", "lbs.",
            "ll.b.", "m.a.", "m.o.",
            "nem.", "con.", "op.",
            "cit.", "p.a.", "cent.",
            "ph.d.", "p.m.", "p.m.a.",
            "p.p.", "tem.", "p.s.",
            "p.p.s.", "q.d.", "q.e.d.",
            "q.v.", "r.", "r.i.p.",
            "s.a.", "s.l.", "s.s.",
            "s.o.s.", "stat.", "viz.",
            "vs.", "b.c.", "a.d.", "b.c.e.",
            "c.e.", "l.q.", "ign.", "i.o.",
            "a.c.", "a.p.", "aq.", "p.m.v",
            "prox.", "q.l.", "q.e.f.", "s.d.g.",
            "nom.", "s.v.", "t.i.d.", "ult.",
            "v.", "g.", "gr.", "i.", "s.", "i.",
            "a.c.h.s.", "add.", "ad.",
            "lib.", "admov.", "us.", "agit.",
            "alt.", "d.", "dieb.", "h.",
            "hor.", "amp.", "aq.", "bull.",
            "com.", "dest.", "ferv.",
            "a.s.", "a.l.", "akad.",
            "arh.", "dem.", "dets.", "dir.",
            "a.", "phil.", "nat.", "e.", "k.",
            "l.", "khk.", "kl.", "ld.", "lp.",
            "pr.", "prl.", "rnkl.", "rvkl.",
            "õp.", "ingl."
        ];
        var length = memoryArray.length;
        for (var i = 0; i < length; i++) {
            if (memoryArray[i] == word.trim()) {
                var isInTheEnd = this.lookForBigLetter(word, sentence);
                console.log("see on isInTheEnd variable -> ", isInTheEnd);
                if (isInTheEnd) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    HomeComponent.prototype.lookForBigLetter = function (word, text) {
        console.log("LOOK FOR BIG FN: sõna -> ", word);
        console.log("LOOK FOR BIG FN: tekst -> ", text);
        var wordIndex = text.indexOf(word);
        var loopVar = text.substring(wordIndex + word.length - 1).replace(/\s+/g, ' ');
        console.log("LOOK FOR BIG FN: loopVar -> ", loopVar);
        if (text.length <= wordIndex + word.length - 1) {
            return false;
        }
        else {
            for (var i = 1; i < loopVar.length; i++) {
                if (loopVar.charAt(i) === " " &&
                    loopVar.charAt(i - 1) === "." &&
                    loopVar.charAt(i + 1) == loopVar.charAt(i + 1).toUpperCase()) {
                    return true;
                }
            }
            return false;
        }
    };
    HomeComponent.prototype.isBetweenIndexes = function (targetIndex, markIndex) {
        var returnArray = [];
        if (targetIndex < markIndex[0]) {
            returnArray.push(markIndex[0]);
            return returnArray;
        }
        if (targetIndex > markIndex[markIndex.length - 1]) {
            returnArray.push(markIndex[markIndex.length - 1]);
            return returnArray;
        }
        else {
            for (var i = 0; i < markIndex.length; i++) {
                if (targetIndex > markIndex[i] && targetIndex < markIndex[i + 1]) {
                    returnArray.push(markIndex[i]);
                    returnArray.push(markIndex[i + 1]);
                    break;
                }
                else {
                    continue;
                }
            }
            return returnArray;
        }
    };
    HomeComponent.prototype.countMarks = function (text, letter) {
        return (text.match(RegExp(letter, 'g')) || []).length;
    };
    HomeComponent.prototype.indexFinder = function (str, char) {
        return str.split("").map(function (c, i) {
            if (c == char)
                return i;
        }).filter(function (v) {
            return v >= 0;
        });
    };
    HomeComponent.prototype.findFirstAlphabetical = function (text) {
        return (text.match(/[a-zA-z]/) || []).pop();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html',
            providers: [http_1.HttpModule],
            styleUrls: ['home.component.css'],
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
        __param(6, core_1.Inject(platform_browser_2.DOCUMENT)),
        __param(7, core_1.Inject(window_service_1.WINDOW)),
        __metadata("design:paramtypes", [user_service_1.UserService,
            http_1.Http,
            core_1.ChangeDetectorRef,
            sentence_service_1.SentenceService,
            click_service_1.ClickService,
            file_service_1.FileService,
            Document,
            Window,
            core_1.ElementRef,
            platform_browser_1.DomSanitizer])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
