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
        if (window.screen.width <= 768) {
            console.log("zoomlevel before assignment -> ", this.zoomLevel);
            console.log("window is smaller than 768");
            this.zoomLevel = 0.8;
            console.log("zoomlevel after assignment -> ", this.zoomLevel);
        }
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
        console.log("click range -> ", range);
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
                target.style.background = "yellow";
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
            else {
                var lauseTagasi = this.lookBack(event.target.previousElementSibling, "");
                var lauseEdasi = this.lookForward(event.target.nextElementSibling, "");
                var test = lauseTagasi + " " + targetText + " " + lauseEdasi;
                this.sentenceService.publishData(test);
                target.style.background = "yellow";
                console.log("%c" + test, "background: #222 ; color: #bada55");
            }
        }
        if (endQuoteMarkSum === 1) {
            console.log("ALGOR fn: indexArrays on ainult 1 märk!");
            if (allIndexes[0] < wordStartIndex) {
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(allIndexes[0] + 1));
                this.sentenceService.publishData(lause);
                var replaceString = targetText.substring(allIndexes[0] + 1);
                var re = new RegExp(replaceString, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                /*target.innerHTML = targetText.substring(0, allIndexes[0]+1) + "<span style='background: yellow'>" +
                targetText.substring(allIndexes[0]+1) + "</span>";*/
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
            if (allIndexes[0] > wordStartIndex) {
                if (targetText.charAt(0) == targetText.charAt(0).toUpperCase()) {
                    var suureAlgusega = targetText.substring(0, allIndexes[0]);
                    this.sentenceService.publishData(suureAlgusega);
                    var replaceString = targetText.substring(0, allIndexes[0]);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, allIndexes[0]) +
                    "</span>" + targetText.substring(allIndexes[0]);*/
                    console.log("%c" + suureAlgusega, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, allIndexes[0] + 1));
                    this.sentenceService.publishData(lause);
                    var replaceString = targetText.substring(0, allIndexes[0]);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, allIndexes[0]) +
                    "</span>" + targetText.substring(allIndexes[0]);*/
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
                console.log("text before substring -> ", targetText.substring(0, isBetweenIndexesResult[0] + 1));
                console.log("text after substring -> ", targetText.substring(isBetweenIndexesResult[1] + 1));
                this.archiveString = targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1] + 1);
                this.sentenceService.publishData(this.archiveString);
                console.log(this.archiveString);
                var replaceString = targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1] + 1);
                var re = new RegExp(replaceString, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background: yellow'>" + replaceString + "</span>");
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] > wordStartIndex) {
                //tagurpidi rekursioon
                if (!event.target.previousElementSibling) {
                    var lause = event.target.innerText.substring(0, isBetweenIndexesResult[0] + 1);
                    this.sentenceService.publishData(lause);
                    var replaceString = targetText.substring(0, isBetweenIndexesResult[0] + 1);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0]+1) +
                    "</span>" + targetText.substring(isBetweenIndexesResult[0]+1);*/
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, isBetweenIndexesResult[0] + 1));
                    this.sentenceService.publishData(lause);
                    var replaceString = targetText.substring(0, isBetweenIndexesResult[0] + 1);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0]+1) +
                    "</span>" + targetText.substring(isBetweenIndexesResult[0]+1);*/
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] < wordStartIndex) {
                //edaspidi rekursioon
                console.log("siin on vea koht !!!!");
                var replaceString = targetText.substring(isBetweenIndexesResult[0] + 1);
                var re = new RegExp(replaceString, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
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
                next.style.background = "yellow";
                text += " " + next.innerText;
                return this.lookForward(next.nextElementSibling, text);
            }
            else {
                console.log("tekstis on punkt või vahemärk");
                var forwardText = next.innerText.substring(0, indexesForCheck[0] + 1);
                var re = new RegExp(forwardText, "g");
                console.log("edasi rekursiooni regular expression -> ", re);
                console.log("edasi rekursioonis forwardText -> ", forwardText);
                console.log("edasi rekursioon pärast replace innerHTML -> ", next.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>"));
                next.innerHTML = next.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>");
                return text + " " + forwardText;
            }
        }
        else {
            next.style.background = "yellow";
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
                prev.style.background = "yellow";
                text = prev.innerText + " " + text;
                return this.lookBack(prev.previousElementSibling, text);
            }
            else {
                var backText = prev.innerText.substring(indexesForCheck[indexesForCheck.length - 1] + 1);
                var re = new RegExp(backText, "g");
                console.log("tagasi rekursiooni regular expression -> ", re);
                console.log("tagasi rekursioonis forwardText -> ", backText);
                console.log("tagasi rekursioon pärast replace innerHTML -> ", prev.innerHTML.replace(re, "<span style='background:yellow'>" + backText + "</span>"));
                prev.innerHTML = prev.innerHTML.replace(backText, "<span style='background:yellow'>" + backText + "</span>");
                return backText + " " + text;
            }
        }
        else {
            prev.style.background = "yellow";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNHO0FBQ3RHLDhEQUF5RDtBQUN6RCxzQ0FBMEU7QUFDMUUsa0RBQWdGO0FBR2hGLDBEQUF3RDtBQUN4RCxrRUFBZ0U7QUFDaEUsNERBQTBEO0FBRTFELDBEQUF3RDtBQUV4RCw4REFBcUQ7QUFDckQsOERBQXFEO0FBR3JELGlDQUErQjtBQXdCL0I7SUFpQkksdUJBQ1ksV0FBd0IsRUFDeEIsSUFBVSxFQUNWLEdBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ04sUUFBa0IsRUFDcEIsTUFBYyxFQUM5QixVQUFzQixFQUN0QixTQUF1QjtRQVZuQyxpQkE2QkU7UUE1QlUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNOLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUF4Qm5DLFVBQUssR0FBVyxFQUFFLENBQUM7UUFJbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFrQjFCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxV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QUFDO29CQUNILGtCQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFLLENBQUM7d0JBQ2YsS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLEdBQUc7cUJBQ1osQ0FBQyxDQUFDO29CQUNILHVCQUFVLENBQUMsV0FBVyxFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDckQsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUN4RCxDQUFDO2FBQ0w7U0FFSixDQUFDO1FBMEJPLFdBQUEsYUFBTSxDQUFDLDJCQUFRLENBQUMsQ0FBQTtRQUNoQixXQUFBLGFBQU0sQ0FBQyx1QkFBTSxDQUFDLENBQUE7eUNBUE0sMEJBQVc7WUFDbEIsV0FBSTtZQUNMLHdCQUFpQjtZQUNMLGtDQUFlO1lBQ2xCLDRCQUFZO1lBQ2IsMEJBQVc7WUFDSSxRQUFRO1lBQ1osTUFBTTtZQUNsQixpQkFBVTtZQUNYLCtCQUFZO09BM0IxQixhQUFhLENBOGxCdkI7SUFBRCxvQkFBQztDQTlsQkgsQUE4bEJHLElBQUE7QUE5bEJVLHNDQUFhIiwiZmlsZSI6ImFwcC9ob21lL2hvbWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmLCBJbmplY3QsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQgeyBIdHRwLCBIdHRwTW9kdWxlLCBSZXF1ZXN0T3B0aW9ucywgSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL19tb2RlbHMvdXNlclwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbnRlbmNlU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy9zZW50ZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IENsaWNrU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy9jbGljay5zZXJ2aWNlJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9uc1wiO1xuaW1wb3J0IHsgRmlsZVNlcnZpY2UgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL2ZpbGUuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQgeyBXSU5ET1cgfSBmcm9tIFwiLi4vX3NlcnZpY2VzL3dpbmRvdy5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogWyBIdHRwTW9kdWxlIF0sXG4gICAgc3R5bGVVcmxzOiBbJ2hvbWUuY29tcG9uZW50LmNzcyddLFxuICAgIGFuaW1hdGlvbnM6W1xuICAgICAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6IFwiLTQ1MHB4XCJcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCdvdXQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICc0NTBweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogXCIwXCJcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2luID0+IG91dCcsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignb3V0ID0+IGluJywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSlcbiAgICAgICAgXSlcbiAgICBdXG5cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIGN1cnJlbnRVc2VyOiBVc2VyO1xuICAgIGN1cnJlbnRVc2VyTmFtZTogc3RyaW5nO1xuICAgIHVzZXJzOiBVc2VyW10gPSBbXTtcbiAgICBjb2RlRnJvbVNlcnZlcjogc3RyaW5nO1xuICAgIGFyY2hpdmVTdHJpbmc6IHN0cmluZztcbiAgICBwZGY6YW55O1xuICAgIGlzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcGRmU3JjOiBzdHJpbmcgPSBcIlwiO1xuICAgIG51bU9mTmV3U2VudGVuY2VzOiBudW1iZXIgPSAwO1xuICAgIG5ld1NlbnRlbmNlOiBib29sZWFuID0gZmFsc2U7XG4gICAgem9vbUxldmVsOiBudW1iZXIgPSAwLjg7XG5cbiAgICBtZW51U3RhdGU6IHN0cmluZyA9IFwiaW5cIjtcbiAgICBzaG93TGFzdEZpbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHAsXG4gICAgICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBzZW50ZW5jZVNlcnZpY2U6IFNlbnRlbmNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjbGlja1NlcnZpY2U6IENsaWNrU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmaWxlU2VydmljZTogRmlsZVNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgICAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvdyxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyXG5cblxuICAgICl7XG5cbiAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2Uuc2VudGVuY2VOdW0kLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInV1dGUgbGF1c2V0ZSBhcnYgLT4gXCIsIHZhbHVlKVxuICAgICAgICAgICAgdGhpcy5udW1PZk5ld1NlbnRlbmNlcyA9IHZhbHVlO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5pc05ld1NlbkFjdGl2ZSQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2FzIG5ldyBzZW50ZW5jZSBvbiBhY3RpdmUgLT4gXCIsIHZhbHVlKVxuICAgICAgICAgICAgdGhpcy5uZXdTZW50ZW5jZSA9IHZhbHVlO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmZpbGVTZXJ2aWNlLmZpbGVTcmMkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhRnJvbVNlcnZlcih2YWx1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLnpvb21MZXZlbCQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgIH1cbiAgICAgLypASG9zdExpc3RlbmVyKFwid2luZG93OnNjcm9sbFwiLCBbXSlcbiAgICAgb25XaW5kb3dTY3JvbGwoKXtcbiAgICAgICAgIGxldCBudW1iZXIgPSB0aGlzLndpbmRvdy5wYWdlWU9mZnNldCB8fCB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgdGhpcy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuXG4gICAgIH0qL1xuXG4gICAgY3JlYXRlSGVhZGVycyhoZWFkZXJzOiBIZWFkZXJzKXtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJyk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCl7XG4gICAgICAgIHRoaXMubG9hZEFsbFVzZXJzKCk7XG4gICAgICAgIHRoaXMudXNlckRhdGEoKTtcbiAgICAgICAgdGhpcy5sYXN0RmlsZSgpO1xuICAgICAgICBpZih3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDc2OCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInpvb21sZXZlbCBiZWZvcmUgYXNzaWdubWVudCAtPiBcIiwgdGhpcy56b29tTGV2ZWwpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3cgaXMgc21hbGxlciB0aGFuIDc2OFwiKTtcbiAgICAgICAgICAgIHRoaXMuem9vbUxldmVsID0gMC44O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ6b29tbGV2ZWwgYWZ0ZXIgYXNzaWdubWVudCAtPiBcIiwgdGhpcy56b29tTGV2ZWwpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSB1c2VyRGF0YSgpe1xuICAgICAgICB2YXIgaWQ6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0QnlJZChpZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5hZGRVc2VyVG9TZXNzaW9uKGRhdGEudXNlcm5hbWUpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBwcml2YXRlIGxhc3RGaWxlKCl7XG4gICAgICAgIHZhciBpZDogc3RyaW5nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRVc2VyTGFzdEZpbGUoaWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoICE9IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xhc3RGaWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBkZlNyYyA9IFwidG1wL1wiK2RhdGErXCIucGRmXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xhc3RGaWxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgdHJ5VG9nZ2xlKCl7XG4gICAgICAgIHRoaXMuY2xpY2tTZXJ2aWNlLm9wZW5BcmNoaXZlKCk7XG4gICAgfVxuICAgIHByaXZhdGUgbG9hZEFsbFVzZXJzKCl7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0QWxsKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLnVzZXJzID0gZGF0YSlcbiAgICB9XG4gICAgdXBsb2FkZWQoZXZlbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgbWVhbnMgdGhhdCB1cGxvYWQgaXMgY29tcGxldGUhXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIHZhciBpZDogc3RyaW5nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5hZGRVc2VyTGFzdEZpbGUoaWQsIGV2ZW50KS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dMYXN0RmlsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvYWREYXRhRnJvbVNlcnZlcihldmVudCk7XG4gICAgfVxuICAgIGxvYWREYXRhRnJvbVNlcnZlcihmaWxlbmFtZTogc3RyaW5nKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkRGF0YUZyb21TZXJ2ZXIgdHJpZ2dlcmVkXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvZ2V0dXBsb2FkJyx7ZmlsZW5hbWU6IGZpbGVuYW1lfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuanNvbigpLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGRmU3JjID0gZGF0YS5qc29uKCkudXJsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBhZnRlckxvYWRDb21wbGV0ZShwZGY6IFBERkRvY3VtZW50UHJveHkpIHtcbiAgICAgICAgdGhpcy5wZGYgPSBwZGY7XG4gICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQpe1xuXG4gICAgICAgIHZhciB0YXJnZXRUZXh0OiBzdHJpbmc7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fMKgZXZlbnQuY3VycmVudFRhcmdldDtcblxuXG4gICAgICAgIGlmKHRhcmdldC5pbm5lclRleHQgIT0gbnVsbCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlubmVyIHRleHQgZWkgb2xlIG51bGxcIik7XG4gICAgICAgICAgICB0YXJnZXRUZXh0ID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbm5lciB0ZXh0IG9uIG51bGwhXCIpO1xuICAgICAgICAgICAgdGFyZ2V0VGV4dCA9IFwibnVsbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFsbEluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgICAgIHZhciBlbmRRdW90ZU1hcmtTdW06IG51bWJlciA9IDA7XG5cblxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdmFyIG5vZGUgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayByYW5nZSAtPiBcIiwgcmFuZ2UpO1xuXG4gICAgICAgIHZhciBxTWFya0luZGV4ZXMgPSB0aGlzLmluZGV4RmluZGVyKHRhcmdldFRleHQsICc/Jyk7XG4gICAgICAgIHZhciBlTWFya0luZGV4ZXMgPSB0aGlzLmluZGV4RmluZGVyKHRhcmdldFRleHQsICchJyk7XG4gICAgICAgIHZhciBkb3RJbmRleGVzVGVzdCA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0VGV4dCwgJy4nKTtcbiAgICAgICAgdmFyIHF1b3RlSW5kZXhlcyA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0VGV4dCwgJ1wiJyk7XG4gICAgICAgIHZhciBmaXJzdEFscGhhYmV0aWNhbEluZGV4ID0gdGFyZ2V0VGV4dC5pbmRleE9mKHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRhcmdldFRleHQpKTtcblxuXG4gICAgICAgIGFsbEluZGV4ZXMgPSBxTWFya0luZGV4ZXMuY29uY2F0KGVNYXJrSW5kZXhlcywgZG90SW5kZXhlc1Rlc3QpO1xuICAgICAgICBhbGxJbmRleGVzID0gYWxsSW5kZXhlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe3JldHVybiBhLWJ9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJCRUZPUkUgQUxHTzogRmlyc3QgYWxwaGFiZXRpY2FsIGxldHRlciBpbiBhIHN0cmluZyAtPiBcIiwgdGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJFRk9SRSBBTEdPOiBGaXJzdCBhbHBoYWJldGljYWwgbGV0dGVyIGluZGV4IC0+IFwiLCBcImJhY2tncm91bmQ6IzIyMjtcIiAsdGFyZ2V0VGV4dC5pbmRleE9mKHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRhcmdldFRleHQpKSk7XG5cbiAgICAgICAgaWYoYWxsSW5kZXhlcy5sZW5ndGggIT0gMCl7XG4gICAgICAgICAgICBhbGxJbmRleGVzID0gdGhpcy5jaGVja0FiYnJldmlhdGlvbnMoYWxsSW5kZXhlcywgdGFyZ2V0VGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSW5kZXhlcyA9IHRoaXMuY2hlY2tOdW0oZG90SW5kZXhlc1Rlc3QsIHRhcmdldFRleHQpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92ZUluZGV4ZXMgaGVyZSAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk3DpHJraWRlIGFycmF5IHBlYWxlIGtvbnRyb2xsaSAtPiBcIiwgYWxsSW5kZXhlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsaWNraXRhdmEgc8O1bmEva29oYSBpbmRleCAtPiBcIiwgcmFuZ2Uuc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgaWYoYWxsSW5kZXhlcy5sZW5ndGggPT0gMSl7XG4gICAgICAgICAgICAgICAgaWYoYWxsSW5kZXhlc1swXSA9PSByZW1vdmVJbmRleGVzWzBdKXtcbiAgICAgICAgICAgICAgICAgICAgYWxsSW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1cIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhbGxJbmRleGVzID0gYWxsSW5kZXhlcy5maWx0ZXIoKHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGSUxURVIgRlVOOiB4IC0+IFwiLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGSUxURVIgRlVOOiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgLT4gXCIsIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgPCAwO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGxJbmRleGVzIHBlYWxlIGZpbHRlcml0IC0+IFwiLCBhbGxJbmRleGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3b3JkU3RhcnRJbmRleCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuICAgICAgICB2YXIgZW5kUXVvdGVNYXJrU3VtID0gYWxsSW5kZXhlcy5sZW5ndGg7XG5cblxuICAgICAgICBpZihlbmRRdW90ZU1hcmtTdW0gPT09IDApe1xuXG4gICAgICAgICAgICBpZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0YXJnZXRUZXh0KSA9PSB0YXJnZXRUZXh0LmNoYXJBdChmaXJzdEFscGhhYmV0aWNhbEluZGV4KS50b1VwcGVyQ2FzZSgpKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhdXNlbMO1cHVtw6Rya2Ugb24gYmxva2lzIDAgamEgYWxndXN0w6RodCBvbiBzdXVyIVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tGb3J3YXJkKGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG5cbiAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgdmFyIGxhdXNlVGFnYXNpID0gdGhpcy5sb29rQmFjayhldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIGxhdXNlRWRhc2kgPSB0aGlzLmxvb2tGb3J3YXJkKGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gbGF1c2VUYWdhc2kgKyBcIiBcIiArIHRhcmdldFRleHQgKyBcIiBcIiArIGxhdXNlRWRhc2k7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEodGVzdCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIit0ZXN0LCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlbmRRdW90ZU1hcmtTdW0gPT09IDEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBTEdPUiBmbjogaW5kZXhBcnJheXMgb24gYWludWx0IDEgbcOkcmshXCIpO1xuICAgICAgICAgICAgaWYoYWxsSW5kZXhlc1swXSA8IHdvcmRTdGFydEluZGV4KXtcblxuICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0ZvcndhcmQoZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZywgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSsxKSlcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VTdHJpbmcgPSB0YXJnZXRUZXh0LnN1YnN0cmluZyhhbGxJbmRleGVzWzBdKzEpO1xuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIityZXBsYWNlU3RyaW5nK1wiPC9zcGFuPlwiKTtcbiAgICAgICAgICAgICAgICAvKnRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKzEpICsgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDogeWVsbG93Jz5cIiArXG4gICAgICAgICAgICAgICAgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSsxKSArIFwiPC9zcGFuPlwiOyovXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdID4gd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0VGV4dC5jaGFyQXQoMCkgPT0gdGFyZ2V0VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1dXJlQWxndXNlZ2EgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEoc3V1cmVBbGd1c2VnYSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8qdGFyZ2V0LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY1wiICsgc3V1cmVBbGd1c2VnYSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tCYWNrKGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGFsbEluZGV4ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKHJlcGxhY2VTdHJpbmcsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK3JlcGxhY2VTdHJpbmcrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgICAgICAvKnRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSkgK1xuICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKGFsbEluZGV4ZXNbMF0pOyovXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZW5kUXVvdGVNYXJrU3VtID49IDIpe1xuXG4gICAgICAgICAgICB2YXIgaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9IHRoaXMuaXNCZXR3ZWVuSW5kZXhlcyh3b3JkU3RhcnRJbmRleCwgYWxsSW5kZXhlcykubGVuZ3RoO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJc0JldHdlZW5JbmRleGVzTGVuZ3RoIC0+IFwiLCBpc0JldHdlZW5JbmRleGVzTGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBpc0JldHdlZW5JbmRleGVzUmVzdWx0ID0gdGhpcy5pc0JldHdlZW5JbmRleGVzKHdvcmRTdGFydEluZGV4LCBhbGxJbmRleGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXNCZXR3ZWVuSW5kZXhlc0FycmF5IC0+IFwiLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0KTtcblxuXG4gICAgICAgICAgICAvL01lYW5zIHRoYXQgc2VudGVuY2UgaXMgYmV0d2VlbiB0d28gZG90cyBpbiBibG9ja1xuICAgICAgICAgICAgaWYoaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZXh0IGJlZm9yZSBzdWJzdHJpbmcgLT4gXCIsIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGV4dCBhZnRlciBzdWJzdHJpbmcgLT4gXCIsIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMV0rMSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJjaGl2ZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gKyAxLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKHRoaXMuYXJjaGl2ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hcmNoaXZlU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gKyAxLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdICsgMSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXBsYWNlU3RyaW5nLCBcImdcIik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDogeWVsbG93Jz5cIiArIHJlcGxhY2VTdHJpbmcgKyBcIjwvc3Bhbj5cIik7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9PT0gMSAmJiBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdID4gd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgLy90YWd1cnBpZGkgcmVrdXJzaW9vblxuICAgICAgICAgICAgICAgIGlmKCFldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZyl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8qdGFyZ2V0LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpICtcbiAgICAgICAgICAgICAgICAgICAgXCI8L3NwYW4+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpOyovXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gdGhpcy5sb29rQmFjayhldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZywgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCxpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8qdGFyZ2V0LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpICtcbiAgICAgICAgICAgICAgICAgICAgXCI8L3NwYW4+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpOyovXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9PT0gMSAmJiBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdIDwgd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgLy9lZGFzcGlkaSByZWt1cnNpb29uXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzaWluIG9uIHZlYSBrb2h0ICEhISFcIik7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VTdHJpbmcgPSB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIityZXBsYWNlU3RyaW5nICsgXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0ZvcndhcmQoZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZywgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBsb29rRm9yd2FyZChuZXh0QmxvY2ssIGJ1aWxkZXI6IHN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIG5leHQgPSBuZXh0QmxvY2s7XG5cbiAgICAgICAgaWYodGhpcy5jb3VudE1hcmtzKG5leHQuaW5uZXJUZXh0LCAnW1xcXFwuXFxcXD9cXFxcIV0nKSA+IDApe1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZPUldBUkQgUkVLOiBpbm5lclRleHQgLT4gXCIsIG5leHQuaW5uZXJUZXh0KTtcblxuICAgICAgICAgICAgdmFyIGRvdEluZGV4OiBudW1iZXJbXSA9IHRoaXMuaW5kZXhGaW5kZXIobmV4dC5pbm5lclRleHQsICcuJyk7XG4gICAgICAgICAgICB2YXIgcXVlc3Rpb25JbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKG5leHQuaW5uZXJUZXh0LCAnPycpO1xuICAgICAgICAgICAgdmFyIGV4Y2xJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKG5leHQuaW5uZXJUZXh0LCAnIScpO1xuICAgICAgICAgICAgdmFyIGluZGV4ZXNGb3JDaGVjazogbnVtYmVyW10gPSBkb3RJbmRleC5jb25jYXQocXVlc3Rpb25JbmRleCwgZXhjbEluZGV4KTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogaW5kZXhlc0ZvckNoZWNrIC0+IFwiLCBpbmRleGVzRm9yQ2hlY2spO1xuXG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhpbmRleGVzRm9yQ2hlY2ssIG5leHQuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleCwgbmV4dC5pbm5lclRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogaW5kZXhlcyBhZnRlciBmaWx0ZXIgLT4gXCIsIGluZGV4ZXNGb3JDaGVjayk7XG5cbiAgICAgICAgICAgIGlmKGluZGV4ZXNGb3JDaGVjay5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgbmV4dC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiIFwiICsgbmV4dC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmQobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIHRleHQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZWtzdGlzIG9uIHB1bmt0IHbDtWkgdmFoZW3DpHJrXCIpO1xuICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IG5leHQuaW5uZXJUZXh0LnN1YnN0cmluZygwLCBpbmRleGVzRm9yQ2hlY2tbMF0rMSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChmb3J3YXJkVGV4dCwgXCJnXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWRhc2kgcmVrdXJzaW9vbmkgcmVndWxhciBleHByZXNzaW9uIC0+IFwiLCByZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlZGFzaSByZWt1cnNpb29uaXMgZm9yd2FyZFRleHQgLT4gXCIsIGZvcndhcmRUZXh0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkYXNpIHJla3Vyc2lvb24gcMOkcmFzdCByZXBsYWNlIGlubmVySFRNTCAtPiBcIiwgbmV4dC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKSk7XG4gICAgICAgICAgICAgICAgbmV4dC5pbm5lckhUTUwgPSBuZXh0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrZm9yd2FyZFRleHQrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0ICsgXCIgXCIgKyBmb3J3YXJkVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuZXh0LnN0eWxlLmJhY2tncm91bmQgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgdGV4dCArPSBcIiBcIiArIG5leHQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmQobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvb2tCYWNrKHByZXZpb3VzQmxvY2ssIGJ1aWxkZXI6IHN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIHByZXYgPSBwcmV2aW91c0Jsb2NrO1xuXG4gICAgICAgIGlmKHRoaXMuY291bnRNYXJrcyhwcmV2LmlubmVyVGV4dCwgJ1tcXFxcLlxcXFw/XFxcXCFdJykgPiAwKXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogaW5uZXJUZXh0IC0+IFwiLCBwcmV2LmlubmVyVGV4dCk7XG5cbiAgICAgICAgICAgIHZhciBkb3RJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnLicpO1xuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihwcmV2LmlubmVyVGV4dCwgJz8nKTtcbiAgICAgICAgICAgIHZhciBleGNsSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihwcmV2LmlubmVyVGV4dCwgJyEnKTtcbiAgICAgICAgICAgIHZhciBpbmRleGVzRm9yQ2hlY2s6IG51bWJlcltdID0gZG90SW5kZXguY29uY2F0KHF1ZXN0aW9uSW5kZXgsIGV4Y2xJbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQkFDSyBSRUs6IGluZGV4ZXNGb3JDaGVjayAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKVxuXG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhpbmRleGVzRm9yQ2hlY2ssIHByZXYuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleCwgcHJldi5pbm5lclRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogaW5kZXhlcyBhZnRlciBmaWx0ZXIgLT4gXCIsIGluZGV4ZXNGb3JDaGVjayk7XG5cbiAgICAgICAgICAgIGlmKGluZGV4ZXNGb3JDaGVjay5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgcHJldi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gcHJldi5pbm5lclRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0JhY2socHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0ZXh0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciBiYWNrVGV4dCA9IHByZXYuaW5uZXJUZXh0LnN1YnN0cmluZyhpbmRleGVzRm9yQ2hlY2tbaW5kZXhlc0ZvckNoZWNrLmxlbmd0aC0xXSsxKTtcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKGJhY2tUZXh0LCBcImdcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWdhc2kgcmVrdXJzaW9vbmkgcmVndWxhciBleHByZXNzaW9uIC0+IFwiLCByZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWdhc2kgcmVrdXJzaW9vbmlzIGZvcndhcmRUZXh0IC0+IFwiLCBiYWNrVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YWdhc2kgcmVrdXJzaW9vbiBww6RyYXN0IHJlcGxhY2UgaW5uZXJIVE1MIC0+IFwiLCBwcmV2LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrYmFja1RleHQrXCI8L3NwYW4+XCIpKTtcbiAgICAgICAgICAgICAgICBwcmV2LmlubmVySFRNTCA9IHByZXYuaW5uZXJIVE1MLnJlcGxhY2UoYmFja1RleHQsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIitiYWNrVGV4dCtcIjwvc3Bhbj5cIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYmFja1RleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJldi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgIHRleHQgPSBwcmV2LmlubmVyVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvb2tCYWNrKHByZXYucHJldmlvdXNFbGVtZW50U2libGluZywgdGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tOdW0oZG90SW5kZXhBcnJheTogbnVtYmVyW10sIHRleHQ6IHN0cmluZyl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogY2hlY2tOdW0gbMOka3Mga8OkaW1hIVwiKTtcblxuICAgICAgICB2YXIgc3BhY2VJbmRleDogbnVtYmVyO1xuICAgICAgICB2YXIgcmV0dXJuSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIgXCIpe1xuICAgICAgICAgICAgICAgIHNwYWNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dC5jaGFyQXQoaSkgPT09IFwiLlwiKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBsZWlkaXMgw7xsZXNzZSBwdW5rdGlcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogcHVua3Rpc3QgZWVsbWluZSBjaGFyIC0+IFwiLCB0ZXh0LmNoYXJBdChpLTEpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBrYXMgZWVsbWluZSBvbiBudW1iZXIgLT4gXCIsIHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGktMSkpKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNMZXR0ZXIgPSB0ZXh0LmNoYXJBdChpLTEpO1xuICAgICAgICAgICAgICAgIHZhciBpc0luVGhlRW5kID0gdGhpcy5sb29rRm9yQmlnTGV0dGVyKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkpLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RBbHBoYWJldGljYWxJbmRleCA9IHRleHQuaW5kZXhPZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0ZXh0LnN1YnN0cmluZyhpKzEpKSk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB0ZXh0IC0+IFwiLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBpIC0+IFwiLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBpc0luVGhlRW5kIHZhcmlhYmxlIC0+IFwiLCBpc0luVGhlRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB0ZXh0LnN1YnN0cmluZyhpKzEpIC0+IFwiLCB0ZXh0LnN1YnN0cmluZyhpKzEpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBmaXJzdCBhbHBoYWJldGljYWwgLT4gXCIsIHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRleHQuc3Vic3RyaW5nKGkrMSkpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB1cHBlcmNhc2UgLT4gXCIsIHRleHQuY2hhckF0KGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFS0NOVU06IHRleHQuY2hhckF0KGkrMSkgLT4gXCIsIHRleHQuY2hhckF0KGkrMSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGlzTnVtZXJpYyAtPiBcIiwgdGhpcy5pc051bWVyaWModGV4dC5jaGFyQXQoaSsxKSkpO1xuICAgICAgICAgICAgICAgIGlmKHRleHQuY2hhckF0KGkrMSkgPT09IFwiIFwiICYmIHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRleHQuc3Vic3RyaW5nKGkrMSkpICE9XG4gICAgICAgICAgICAgICAgdGV4dC5jaGFyQXQoZmlyc3RBbHBoYWJldGljYWxJbmRleCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGVpIG9sZSBsYXVzZSBsw7VwdXNcIik7XG4gICAgICAgICAgICAgICAgfWlmKHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGkrMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdW5rdGlzdCBqw6RyZ21pbmUgb24gbnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleGVzLnB1c2goaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyppZih0aGlzLmlzTnVtZXJpYyhwcmV2aW91c0xldHRlcikgJiYgdGV4dC5jaGFyQXQoaSsxKSA9PT0gXCIgXCIgJiYgaXNJblRoZUVuZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VlIHB1bmt0IG9uIGxhdXNlIGzDtXB1cyBpbmRleCAtPiBcIiwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc051bWVyaWMocHJldmlvdXNMZXR0ZXIpICYmIHRleHQuY2hhckF0KGkrMSkgPT09IFwiIFwiICYmIGlzSW5UaGVFbmQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhdXNlbMO1cHUgcHVua3QgdMOkaGVnYSBrb29zIC0+IFwiLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogY2hlY2tudW1pc3QgdGFnYXN0YXRhdmFkIGVlbWFsZGFtaXNlbGUgbWluZXZhZCBpbmRleGlkIC0+IFwiLCByZXR1cm5JbmRleGVzKTtcbiAgICAgICAgcmV0dXJuIHJldHVybkluZGV4ZXM7XG4gICAgfVxuICAgIGlzTnVtZXJpYyh2YWx1ZTogYW55KXtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtcGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgIH1cbiAgICBjaGVja0FiYnJldmlhdGlvbnMoaW5kZXhBcnJheTogbnVtYmVyW10sIHRleHQ6IHN0cmluZyl7XG4gICAgICAgIHZhciBzcGFjZUluZGV4OiBudW1iZXI7XG4gICAgICAgIHZhciByZXR1cm5JbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICB2YXIgc3BhY2VJbmRleEFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHRleHQuY2hhckF0KGkpID09PSBcIiBcIil7XG4gICAgICAgICAgICAgICAgc3BhY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIuXCIgfHwgdGV4dC5jaGFyQXQoaSkgPT09IFwiP1wiIHx8IHRleHQuY2hhckF0KGkpID09PSBcIiFcIil7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQUJSIGZuOiBjaGFyIGtvaGFsIGkgb24gLT4gXCIsIHRleHQuY2hhckF0KGkpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFCUiBmbjogZWVsbWlzZXN0IHTDvGhpa3VzdCBrdW5pIHB1bmt0aW5pIC0+IFwiLFxuICAgICAgICAgICAgICAgIHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkrMSkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lbW9yeUNoZWNrTmFtZTogYm9vbGVhbiA9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01lbW9yeU5hbWVBYih0ZXh0LnN1YnN0cmluZyhzcGFjZUluZGV4LCBpKzEpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIHZhciBtZW1vcnlDaGVja0VuZDogYm9vbGVhbiA9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01lbW9yeU90aGVyKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkrMSkudG9Mb3dlckNhc2UoKSwgdGV4dCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFCUiBmbjogbmFtZUNoZWNrRm4gcmVzdWx0IC0+IFwiLCBtZW1vcnlDaGVja05hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYoIW1lbW9yeUNoZWNrTmFtZSAmJiAhbWVtb3J5Q2hlY2tFbmQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkFCUiBmbjogdGFnYXN0YXRhdmFkIGluZGV4aWQgLT4gXCIsIHJldHVybkluZGV4ZXMpO1xuICAgICAgICByZXR1cm4gcmV0dXJuSW5kZXhlcztcbiAgICB9XG4gICAgY2hlY2tNZW1vcnlOYW1lQWIod29yZDogc3RyaW5nKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNIRUNLTkFNRSBmbjogYWJydiAtPiBcIiwgd29yZCk7XG5cbiAgICAgICAgdmFyIG5hbWVBYkFycmF5OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgIFwibXIuXCIsIFwibXJzLlwiLCBcIm1pc3MuXCIsXG4gICAgICAgICAgICBcImRyLlwiLCBcInJldi5cIiwgXCJob24uXCIsXG4gICAgICAgICAgICBcInByb2YuXCIsIFwiZ2VuLlwiLCBcInJlcC5cIixcbiAgICAgICAgICAgIFwic2VuLlwiLCBcInN0LlwiLCBcImNhcHQuXCIsXG4gICAgICAgICAgICBcInNndC5cIiwgXCJwdnQuXCIsIFwic2lyLlwiLFxuICAgICAgICAgICAgXCJjb21kci5cIiwgXCJjb3JwLlwiLCBcImNwbC5cIixcbiAgICAgICAgICAgIFwiZ292LlwiLCBcImFrYWQuXCIsIFwiYXJoLlwiLFxuICAgICAgICAgICAgXCJkaXIuXCIsIFwiaHIuXCIsIFwiaS5cIiwgXCJscC5cIixcbiAgICAgICAgICAgIFwicHIuXCIsIFwicHJsLlwiLCBcInJua2wuXCIsXG4gICAgICAgICAgICBcInJ2a2wuXCIsIFwidi5hXCIsIFwiw7VwLlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBsID0gbmFtZUFiQXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgICAgIGlmKG5hbWVBYkFycmF5W2ldID09IHdvcmQudHJpbSgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrTWVtb3J5T3RoZXIod29yZDogc3RyaW5nLCBzZW50ZW5jZTogc3RyaW5nKXtcbiAgICAgICAgdmFyIG1lbW9yeUFycmF5OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgIFwiZS5nXCIsIFwiYS5pLlwiLCBcImEubS5cIixcbiAgICAgICAgICAgIFwiY2NhLlwiLCBcImMuXCIsIFwiY2EuXCIsXG4gICAgICAgICAgICBcImNhcC5cIiwgXCJjZi5cIiwgXCJjcC5cIixcbiAgICAgICAgICAgIFwiYy52LlwiLCBcImN3dC5cIiwgXCJkLnYuXCIsXG4gICAgICAgICAgICBcImVhZC5cIiwgXCJhbC5cIiwgXCJldGMuXCIsXG4gICAgICAgICAgICBcImZsLlwiLCBcImYuXCIsIFwiZmYuXCIsXG4gICAgICAgICAgICBcImliaWQuXCIsIFwiaWQuXCIsIFwiaS5hLlwiLFxuICAgICAgICAgICAgXCJpLmUuXCIsIFwibGIuXCIsIFwibGJzLlwiLFxuICAgICAgICAgICAgXCJsbC5iLlwiLCBcIm0uYS5cIiwgXCJtLm8uXCIsXG4gICAgICAgICAgICBcIm5lbS5cIiwgXCJjb24uXCIsIFwib3AuXCIsXG4gICAgICAgICAgICBcImNpdC5cIiwgXCJwLmEuXCIsIFwiY2VudC5cIixcbiAgICAgICAgICAgIFwicGguZC5cIiwgXCJwLm0uXCIsIFwicC5tLmEuXCIsXG4gICAgICAgICAgICBcInAucC5cIixcInRlbS5cIiwgXCJwLnMuXCIsXG4gICAgICAgICAgICBcInAucC5zLlwiLCBcInEuZC5cIiwgXCJxLmUuZC5cIixcbiAgICAgICAgICAgIFwicS52LlwiLCBcInIuXCIsIFwici5pLnAuXCIsXG4gICAgICAgICAgICBcInMuYS5cIiwgXCJzLmwuXCIsIFwicy5zLlwiLFxuICAgICAgICAgICAgXCJzLm8ucy5cIiwgXCJzdGF0LlwiLCBcInZpei5cIixcbiAgICAgICAgICAgIFwidnMuXCIsIFwiYi5jLlwiLCBcImEuZC5cIiwgXCJiLmMuZS5cIixcbiAgICAgICAgICAgIFwiYy5lLlwiLCBcImwucS5cIiwgXCJpZ24uXCIsXCJpLm8uXCIsXG4gICAgICAgICAgICBcImEuYy5cIiwgXCJhLnAuXCIsIFwiYXEuXCIsIFwicC5tLnZcIixcbiAgICAgICAgICAgIFwicHJveC5cIiwgXCJxLmwuXCIsIFwicS5lLmYuXCIsIFwicy5kLmcuXCIsXG4gICAgICAgICAgICBcIm5vbS5cIiwgXCJzLnYuXCIsXCJ0LmkuZC5cIiwgXCJ1bHQuXCIsXG4gICAgICAgICAgICBcInYuXCIsIFwiZy5cIiwgXCJnci5cIiwgXCJpLlwiLCBcInMuXCIsIFwiaS5cIixcbiAgICAgICAgICAgIFwiYS5jLmgucy5cIiwgXCJhZGQuXCIsIFwiYWQuXCIsXG4gICAgICAgICAgICBcImxpYi5cIiwgXCJhZG1vdi5cIiwgXCJ1cy5cIiwgXCJhZ2l0LlwiLFxuICAgICAgICAgICAgXCJhbHQuXCIsIFwiZC5cIiwgXCJkaWViLlwiLCBcImguXCIsXG4gICAgICAgICAgICBcImhvci5cIiwgXCJhbXAuXCIsIFwiYXEuXCIsIFwiYnVsbC5cIixcbiAgICAgICAgICAgIFwiY29tLlwiLCBcImRlc3QuXCIsIFwiZmVydi5cIixcbiAgICAgICAgICAgIFwiYS5zLlwiLCBcImEubC5cIiwgXCJha2FkLlwiLFxuICAgICAgICAgICAgXCJhcmguXCIsIFwiZGVtLlwiLCBcImRldHMuXCIsIFwiZGlyLlwiLFxuICAgICAgICAgICAgXCJhLlwiLCBcInBoaWwuXCIsIFwibmF0LlwiLCBcImUuXCIsIFwiay5cIixcbiAgICAgICAgICAgIFwibC5cIiwgXCJraGsuXCIsIFwia2wuXCIsIFwibGQuXCIsIFwibHAuXCIsXG4gICAgICAgICAgICBcInByLlwiLCBcInBybC5cIiwgXCJybmtsLlwiLCBcInJ2a2wuXCIsXG4gICAgICAgICAgICBcIsO1cC5cIiwgXCJpbmdsLlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBsZW5ndGggPSBtZW1vcnlBcnJheS5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihtZW1vcnlBcnJheVtpXSA9PSB3b3JkLnRyaW0oKSl7XG4gICAgICAgICAgICAgICAgdmFyIGlzSW5UaGVFbmQgPSB0aGlzLmxvb2tGb3JCaWdMZXR0ZXIod29yZCwgc2VudGVuY2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VlIG9uIGlzSW5UaGVFbmQgdmFyaWFibGUgLT4gXCIsIGlzSW5UaGVFbmQpO1xuICAgICAgICAgICAgICAgIGlmKGlzSW5UaGVFbmQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbG9va0ZvckJpZ0xldHRlcih3b3JkOiBzdHJpbmcsIHRleHQ6IHN0cmluZyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTE9PSyBGT1IgQklHIEZOOiBzw7VuYSAtPiBcIiwgd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTE9PSyBGT1IgQklHIEZOOiB0ZWtzdCAtPiBcIiwgdGV4dCk7XG4gICAgICAgIHZhciB3b3JkSW5kZXggPSB0ZXh0LmluZGV4T2Yod29yZCk7XG4gICAgICAgIHZhciBsb29wVmFyID0gdGV4dC5zdWJzdHJpbmcod29yZEluZGV4ICsgd29yZC5sZW5ndGgtMSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxPT0sgRk9SIEJJRyBGTjogbG9vcFZhciAtPiBcIiwgbG9vcFZhcik7XG5cbiAgICAgICAgaWYodGV4dC5sZW5ndGggPD0gd29yZEluZGV4ICsgd29yZC5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgbG9vcFZhci5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgaWYobG9vcFZhci5jaGFyQXQoaSkgPT09IFwiIFwiICYmXG4gICAgICAgICAgICAgICAgbG9vcFZhci5jaGFyQXQoaS0xKSA9PT0gXCIuXCIgJiZcbiAgICAgICAgICAgICAgICBsb29wVmFyLmNoYXJBdChpKzEpID09IGxvb3BWYXIuY2hhckF0KGkrMSkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQmV0d2VlbkluZGV4ZXModGFyZ2V0SW5kZXg6IG51bWJlciwgbWFya0luZGV4OiBudW1iZXJbXSl7XG4gICAgICAgIHZhciByZXR1cm5BcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBpZih0YXJnZXRJbmRleCA8IG1hcmtJbmRleFswXSl7XG4gICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFswXSlcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgICAgICAgfVxuICAgICAgICBpZih0YXJnZXRJbmRleCA+IG1hcmtJbmRleFttYXJrSW5kZXgubGVuZ3RoLTFdKXtcbiAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W21hcmtJbmRleC5sZW5ndGgtMV0pXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1hcmtJbmRleC5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldEluZGV4ID4gbWFya0luZGV4W2ldICYmIHRhcmdldEluZGV4IDwgbWFya0luZGV4W2krMV0pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W2krMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvdW50TWFya3ModGV4dDogc3RyaW5nLCBsZXR0ZXI6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiAodGV4dC5tYXRjaChSZWdFeHAobGV0dGVyLCAnZycpKSB8fCBbXSkubGVuZ3RoO1xuICAgIH1cbiAgICBpbmRleEZpbmRlcihzdHIsIGNoYXIpe1xuICAgICAgICByZXR1cm4gc3RyLnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbihjLCBpKXtcbiAgICAgICAgICAgIGlmKGMgPT0gY2hhcikgcmV0dXJuIGk7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbih2KXtcbiAgICAgICAgICAgIHJldHVybiB2ID49MFxuICAgICAgICB9KVxuICAgIH1cbiAgICBmaW5kRmlyc3RBbHBoYWJldGljYWwodGV4dDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuICh0ZXh0Lm1hdGNoKC9bYS16QS16XS8pIHx8wqBbXSkucG9wKCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==
