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
                target.innerHTML = targetText.substring(0, allIndexes[0] + 1) + "<span style='background: yellow'>" +
                    target.substring(allIndexes[0] + 1) + "</span>";
                console.log("%c" + lause, "background: #222 ; color: #bada55");
            }
            if (allIndexes[0] > wordStartIndex) {
                if (targetText.charAt(0) == targetText.charAt(0).toUpperCase()) {
                    var suureAlgusega = targetText.substring(0, allIndexes[0]);
                    this.sentenceService.publishData(suureAlgusega);
                    target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, allIndexes[0]) +
                        "</span>" + targetText.substring(allIndexes[0]);
                    console.log("%c" + suureAlgusega, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, allIndexes[0] + 1));
                    this.sentenceService.publishData(lause);
                    target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, allIndexes[0]) +
                        "</span>" + targetText.substring(allIndexes[0]);
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
                target.innerHTML = targetText.substring(0, isBetweenIndexesResult[0] + 1) +
                    "<span style='background: yellow;'>" + targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1] + 1) +
                    "</span>" + targetText.substring(isBetweenIndexesResult[1] + 1);
                /*var spanNode = document.createElement('span');
                var beforeNode = document.createElement('span');
                var afterNode = document.createElement('span');
                var holderDiv = document.createElement('div');

                beforeNode.innerText = targetText.substring(0, isBetweenIndexesResult[0]+1);
                afterNode.innerText = targetText.substring(isBetweenIndexesResult[1]+1);
                spanNode.innerText = targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1]+1);
                spanNode.style.background = 'red';

                holderDiv.appendChild(afterNode);
                holderDiv.insertBefore(spanNode, afterNode);
                holderDiv.insertBefore(beforeNode, spanNode);
                target.appendChild(holderDiv);*/
                /*
                var text = target.innerHTML;
                console.log("this is the text -> ", text);
                var newText = text.replace(/\./g, '<span class="get-position-of-it"></span>');
                target.innerHTML = newText;
                var offset1 = target.getElementsByClassName("get-position-of-it")[0].offsetLeft + 12;
                var offset2 = target.getElementsByClassName("get-position-of-it")[1].offsetLeft + 12;
                var newNode = document.createElement('div');
                newNode.style.display = "block";
                newNode.style.background = "yellow";
                newNode.style.width = offset2 - offset1 + 12 + "px";
                newNode.style.height = "10px";
                newNode.style.marginTop = "-10px"
                newNode.style.marginLeft = offset1  + "px";
                target.appendChild(newNode);
                //target.innerHTML = text;*/
                //target.innerText = this.sanitizer.bypassSecurityTrustHtml('<span style="background:red;">'+this.archiveString+'</span>');
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] > wordStartIndex) {
                //tagurpidi rekursioon
                if (!event.target.previousElementSibling) {
                    var lause = event.target.innerText.substring(0, isBetweenIndexesResult[0] + 1);
                    this.sentenceService.publishData(lause);
                    target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0] + 1) +
                        "</span>" + targetText.substring(isBetweenIndexesResult[0] + 1);
                    console.log("%c" + lause, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, isBetweenIndexesResult[0] + 1));
                    this.sentenceService.publishData(lause);
                    target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0] + 1) +
                        "</span>" + targetText.substring(isBetweenIndexesResult[0] + 1);
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
                return prev.innerText.substring(indexesForCheck[indexesForCheck.length - 1] + 1) + " " + text;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNHO0FBQ3RHLDhEQUF5RDtBQUN6RCxzQ0FBMEU7QUFDMUUsa0RBQWdGO0FBR2hGLDBEQUF3RDtBQUN4RCxrRUFBZ0U7QUFDaEUsNERBQTBEO0FBRTFELDBEQUF3RDtBQUV4RCw4REFBcUQ7QUFDckQsOERBQXFEO0FBR3JELGlDQUErQjtBQXdCL0I7SUFpQkksdUJBQ1ksV0FBd0IsRUFDeEIsSUFBVSxFQUNWLEdBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ04sUUFBa0IsRUFDcEIsTUFBYyxFQUM5QixVQUFzQixFQUN0QixTQUF1QjtRQVZuQyxpQkE2QkU7UUE1QlUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNOLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUF4Qm5DLFVBQUssR0FBVyxFQUFFLENBQUM7UUFJbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFrQjFCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxV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ekIsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDakMsVUFBVSxFQUFDO2dCQUNQLG9CQUFPLENBQUMsWUFBWSxFQUFFO29CQUNsQixrQkFBSyxDQUFDLElBQUksRUFBRSxrQkFBSyxDQUFDO3dCQUNkLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxRQUFRO3FCQUNqQixDQUFDLENBQUM7b0JBQ0gsa0JBQUssQ0FBQyxLQUFLLEVBQUUsa0JBQUssQ0FBQzt3QkFDZixLQUFLLEVBQUUsT0FBTzt3QkFDZCxJQUFJLEVBQUUsR0FBRztxQkFDWixDQUFDLENBQUM7b0JBQ0gsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNyRCx1QkFBVSxDQUFDLFdBQVcsRUFBRSxvQkFBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7aUJBQ3hELENBQUM7YUFDTDtTQUVKLENBQUM7UUEwQk8sV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBO1FBQ2hCLFdBQUEsYUFBTSxDQUFDLHVCQUFNLENBQUMsQ0FBQTt5Q0FQTSwwQkFBVztZQUNsQixXQUFJO1lBQ0wsd0JBQWlCO1lBQ0wsa0NBQWU7WUFDbEIsNEJBQVk7WUFDYiwwQkFBVztZQUNJLFFBQVE7WUFDWixNQUFNO1lBQ2xCLGlCQUFVO1lBQ1gsK0JBQVk7T0EzQjFCLGFBQWEsQ0ErbEJ2QjtJQUFELG9CQUFDO0NBL2xCSCxBQStsQkcsSUFBQTtBQS9sQlUsc0NBQWEiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7IEh0dHAsIEh0dHBNb2R1bGUsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vX21vZGVscy91c2VyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL19zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VudGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL3NlbnRlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL2NsaWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBGaWxlU2VydmljZSB9IGZyb20gXCIuLi9fc2VydmljZXMvZmlsZS5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7IFdJTkRPVyB9IGZyb20gXCIuLi9fc2VydmljZXMvd2luZG93LnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbIEh0dHBNb2R1bGUgXSxcbiAgICBzdHlsZVVybHM6IFsnaG9tZS5jb21wb25lbnQuY3NzJ10sXG4gICAgYW5pbWF0aW9uczpbXG4gICAgICAgIHRyaWdnZXIoJ3NsaWRlSW5PdXQnLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICc0NTBweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogXCItNDUwcHhcIlxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ291dCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIlxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaW4gPT4gb3V0JywgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdvdXQgPT4gaW4nLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpKVxuICAgICAgICBdKVxuICAgIF1cblxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgY3VycmVudFVzZXI6IFVzZXI7XG4gICAgY3VycmVudFVzZXJOYW1lOiBzdHJpbmc7XG4gICAgdXNlcnM6IFVzZXJbXSA9IFtdO1xuICAgIGNvZGVGcm9tU2VydmVyOiBzdHJpbmc7XG4gICAgYXJjaGl2ZVN0cmluZzogc3RyaW5nO1xuICAgIHBkZjphbnk7XG4gICAgaXNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwZGZTcmM6IHN0cmluZyA9IFwiXCI7XG4gICAgbnVtT2ZOZXdTZW50ZW5jZXM6IG51bWJlciA9IDA7XG4gICAgbmV3U2VudGVuY2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB6b29tTGV2ZWw6IG51bWJlciA9IDAuODtcblxuICAgIG1lbnVTdGF0ZTogc3RyaW5nID0gXCJpblwiO1xuICAgIHNob3dMYXN0RmlsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCxcbiAgICAgICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHNlbnRlbmNlU2VydmljZTogU2VudGVuY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNsaWNrU2VydmljZTogQ2xpY2tTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVTZXJ2aWNlOiBGaWxlU2VydmljZSxcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoV0lORE9XKSBwcml2YXRlIHdpbmRvdzogV2luZG93LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcblxuXG4gICAgKXtcblxuICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5zZW50ZW5jZU51bSQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidXV0ZSBsYXVzZXRlIGFydiAtPiBcIiwgdmFsdWUpXG4gICAgICAgICAgICB0aGlzLm51bU9mTmV3U2VudGVuY2VzID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLmlzTmV3U2VuQWN0aXZlJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJrYXMgbmV3IHNlbnRlbmNlIG9uIGFjdGl2ZSAtPiBcIiwgdmFsdWUpXG4gICAgICAgICAgICB0aGlzLm5ld1NlbnRlbmNlID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZmlsZVNlcnZpY2UuZmlsZVNyYyQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGFGcm9tU2VydmVyKHZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uuem9vbUxldmVsJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy56b29tTGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgfVxuICAgICAvKkBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6c2Nyb2xsXCIsIFtdKVxuICAgICBvbldpbmRvd1Njcm9sbCgpe1xuICAgICAgICAgbGV0IG51bWJlciA9IHRoaXMud2luZG93LnBhZ2VZT2Zmc2V0IHx8IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDA7XG5cbiAgICAgfSovXG5cbiAgICBjcmVhdGVIZWFkZXJzKGhlYWRlcnM6IEhlYWRlcnMpe1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy5sb2FkQWxsVXNlcnMoKTtcbiAgICAgICAgdGhpcy51c2VyRGF0YSgpO1xuICAgICAgICB0aGlzLmxhc3RGaWxlKCk7XG4gICAgICAgIGlmKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNzY4KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiem9vbWxldmVsIGJlZm9yZSBhc3NpZ25tZW50IC0+IFwiLCB0aGlzLnpvb21MZXZlbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpbmRvdyBpcyBzbWFsbGVyIHRoYW4gNzY4XCIpO1xuICAgICAgICAgICAgdGhpcy56b29tTGV2ZWwgPSAwLjg7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInpvb21sZXZlbCBhZnRlciBhc3NpZ25tZW50IC0+IFwiLCB0aGlzLnpvb21MZXZlbClcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHVzZXJEYXRhKCl7XG4gICAgICAgIHZhciBpZDogc3RyaW5nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRCeUlkKGlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmFkZFVzZXJUb1Nlc3Npb24oZGF0YS51c2VybmFtZSk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXZhdGUgbGFzdEZpbGUoKXtcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJMYXN0RmlsZShpZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggIT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TGFzdEZpbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGRmU3JjID0gXCJ0bXAvXCIrZGF0YStcIi5wZGZcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TGFzdEZpbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cbiAgICB0cnlUb2dnbGUoKXtcbiAgICAgICAgdGhpcy5jbGlja1NlcnZpY2Uub3BlbkFyY2hpdmUoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkQWxsVXNlcnMoKXtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRBbGwoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHRoaXMudXNlcnMgPSBkYXRhKVxuICAgIH1cbiAgICB1cGxvYWRlZChldmVudCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBtZWFucyB0aGF0IHVwbG9hZCBpcyBjb21wbGV0ZSFcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmFkZFVzZXJMYXN0RmlsZShpZCwgZXZlbnQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xhc3RGaWxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9hZERhdGFGcm9tU2VydmVyKGV2ZW50KTtcbiAgICB9XG4gICAgbG9hZERhdGFGcm9tU2VydmVyKGZpbGVuYW1lOiBzdHJpbmcpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWREYXRhRnJvbVNlcnZlciB0cmlnZ2VyZWRcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9nZXR1cGxvYWQnLHtmaWxlbmFtZTogZmlsZW5hbWV9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5qc29uKCkudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZGZTcmMgPSBkYXRhLmpzb24oKS51cmw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGFmdGVyTG9hZENvbXBsZXRlKHBkZjogUERGRG9jdW1lbnRQcm94eSkge1xuICAgICAgICB0aGlzLnBkZiA9IHBkZjtcbiAgICAgICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudCl7XG5cbiAgICAgICAgdmFyIHRhcmdldFRleHQ6IHN0cmluZztcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50IHx8wqBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG5cbiAgICAgICAgaWYodGFyZ2V0LmlubmVyVGV4dCAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5uZXIgdGV4dCBlaSBvbGUgbnVsbFwiKTtcbiAgICAgICAgICAgIHRhcmdldFRleHQgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlubmVyIHRleHQgb24gbnVsbCFcIik7XG4gICAgICAgICAgICB0YXJnZXRUZXh0ID0gXCJudWxsXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgdmFyIGVuZFF1b3RlTWFya1N1bTogbnVtYmVyID0gMDtcblxuXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB2YXIgbm9kZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIHJhbmdlIC0+IFwiLCByYW5nZSk7XG5cbiAgICAgICAgdmFyIHFNYXJrSW5kZXhlcyA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0VGV4dCwgJz8nKTtcbiAgICAgICAgdmFyIGVNYXJrSW5kZXhlcyA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0VGV4dCwgJyEnKTtcbiAgICAgICAgdmFyIGRvdEluZGV4ZXNUZXN0ID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRUZXh0LCAnLicpO1xuICAgICAgICB2YXIgcXVvdGVJbmRleGVzID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRUZXh0LCAnXCInKTtcbiAgICAgICAgdmFyIGZpcnN0QWxwaGFiZXRpY2FsSW5kZXggPSB0YXJnZXRUZXh0LmluZGV4T2YodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpO1xuXG5cbiAgICAgICAgYWxsSW5kZXhlcyA9IHFNYXJrSW5kZXhlcy5jb25jYXQoZU1hcmtJbmRleGVzLCBkb3RJbmRleGVzVGVzdCk7XG4gICAgICAgIGFsbEluZGV4ZXMgPSBhbGxJbmRleGVzLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJFRk9SRSBBTEdPOiBGaXJzdCBhbHBoYWJldGljYWwgbGV0dGVyIGluIGEgc3RyaW5nIC0+IFwiLCB0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0YXJnZXRUZXh0KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQkVGT1JFIEFMR086IEZpcnN0IGFscGhhYmV0aWNhbCBsZXR0ZXIgaW5kZXggLT4gXCIsIFwiYmFja2dyb3VuZDojMjIyO1wiICx0YXJnZXRUZXh0LmluZGV4T2YodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpKTtcblxuICAgICAgICBpZihhbGxJbmRleGVzLmxlbmd0aCAhPSAwKXtcbiAgICAgICAgICAgIGFsbEluZGV4ZXMgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhhbGxJbmRleGVzLCB0YXJnZXRUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleGVzVGVzdCwgdGFyZ2V0VGV4dCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVtb3ZlSW5kZXhlcyBoZXJlIC0+IFwiLCByZW1vdmVJbmRleGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTcOkcmtpZGUgYXJyYXkgcGVhbGUga29udHJvbGxpIC0+IFwiLCBhbGxJbmRleGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xpY2tpdGF2YSBzw7VuYS9rb2hhIGluZGV4IC0+IFwiLCByYW5nZS5zdGFydE9mZnNldCk7XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzLmxlbmd0aCA9PSAxKXtcbiAgICAgICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdID09IHJlbW92ZUluZGV4ZXNbMF0pe1xuICAgICAgICAgICAgICAgICAgICBhbGxJbmRleGVzID0gW107XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFsbEluZGV4ZXMgPSBhbGxJbmRleGVzLmZpbHRlcigoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZJTFRFUiBGVU46IHggLT4gXCIsIHgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZJTFRFUiBGVU46IHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSAtPiBcIiwgcmVtb3ZlSW5kZXhlcy5pbmRleE9mKHgpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbEluZGV4ZXMgcGVhbGUgZmlsdGVyaXQgLT4gXCIsIGFsbEluZGV4ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdvcmRTdGFydEluZGV4ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgICAgIHZhciBlbmRRdW90ZU1hcmtTdW0gPSBhbGxJbmRleGVzLmxlbmd0aDtcblxuXG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA9PT0gMCl7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRhcmdldFRleHQpID09IHRhcmdldFRleHQuY2hhckF0KGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGF1c2Vsw7VwdW3DpHJrZSBvbiBibG9raXMgMCBqYSBhbGd1c3TDpGh0IG9uIHN1dXIhXCIpO1xuICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0ZvcndhcmQoZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZywgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoZmlyc3RBbHBoYWJldGljYWxJbmRleCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKGxhdXNlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF1c2VUYWdhc2kgPSB0aGlzLmxvb2tCYWNrKGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF1c2VFZGFzaSA9IHRoaXMubG9va0ZvcndhcmQoZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBsYXVzZVRhZ2FzaSArIFwiIFwiICsgdGFyZ2V0VGV4dCArIFwiIFwiICsgbGF1c2VFZGFzaTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YSh0ZXN0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY1wiK3Rlc3QsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA9PT0gMSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFMR09SIGZuOiBpbmRleEFycmF5cyBvbiBhaW51bHQgMSBtw6RyayFcIik7XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdIDwgd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gdGhpcy5sb29rRm9yd2FyZChldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhhbGxJbmRleGVzWzBdKzEpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKGxhdXNlKTtcblxuICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKzEpICsgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDogeWVsbG93Jz5cIiArXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnN1YnN0cmluZyhhbGxJbmRleGVzWzBdKzEpICsgXCI8L3NwYW4+XCI7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdID4gd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0VGV4dC5jaGFyQXQoMCkgPT0gdGFyZ2V0VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1dXJlQWxndXNlZ2EgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEoc3V1cmVBbGd1c2VnYSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSkgK1xuICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKGFsbEluZGV4ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjXCIgKyBzdXVyZUFsZ3VzZWdhLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0JhY2soZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGFsbEluZGV4ZXNbMF0rMSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSkgK1xuICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKGFsbEluZGV4ZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA+PSAyKXtcblxuICAgICAgICAgICAgdmFyIGlzQmV0d2VlbkluZGV4ZXNMZW5ndGggPSB0aGlzLmlzQmV0d2VlbkluZGV4ZXMod29yZFN0YXJ0SW5kZXgsIGFsbEluZGV4ZXMpLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCAtPiBcIiwgaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCk7XG4gICAgICAgICAgICB2YXIgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdCA9IHRoaXMuaXNCZXR3ZWVuSW5kZXhlcyh3b3JkU3RhcnRJbmRleCwgYWxsSW5kZXhlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklzQmV0d2VlbkluZGV4ZXNBcnJheSAtPiBcIiwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdCk7XG5cblxuICAgICAgICAgICAgLy9NZWFucyB0aGF0IHNlbnRlbmNlIGlzIGJldHdlZW4gdHdvIGRvdHMgaW4gYmxvY2tcbiAgICAgICAgICAgIGlmKGlzQmV0d2VlbkluZGV4ZXNMZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGV4dCBiZWZvcmUgc3Vic3RyaW5nIC0+IFwiLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRleHQgYWZ0ZXIgc3Vic3RyaW5nIC0+IFwiLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyY2hpdmVTdHJpbmcgPSB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdICsgMSwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFsxXSsxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YSh0aGlzLmFyY2hpdmVTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXJjaGl2ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkgK1xuICAgICAgICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdzsnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSArIDEsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMV0gKyAxKSArXG4gICAgICAgICAgICAgICAgXCI8L3NwYW4+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpO1xuICAgICAgICAgICAgICAgIC8qdmFyIHNwYW5Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHZhciBiZWZvcmVOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHZhciBhZnRlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdmFyIGhvbGRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICAgICAgYmVmb3JlTm9kZS5pbm5lclRleHQgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgIGFmdGVyTm9kZS5pbm5lclRleHQgPSB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpO1xuICAgICAgICAgICAgICAgIHNwYW5Ob2RlLmlubmVyVGV4dCA9IHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gKyAxLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpO1xuICAgICAgICAgICAgICAgIHNwYW5Ob2RlLnN0eWxlLmJhY2tncm91bmQgPSAncmVkJztcblxuICAgICAgICAgICAgICAgIGhvbGRlckRpdi5hcHBlbmRDaGlsZChhZnRlck5vZGUpO1xuICAgICAgICAgICAgICAgIGhvbGRlckRpdi5pbnNlcnRCZWZvcmUoc3Bhbk5vZGUsIGFmdGVyTm9kZSk7XG4gICAgICAgICAgICAgICAgaG9sZGVyRGl2Lmluc2VydEJlZm9yZShiZWZvcmVOb2RlLCBzcGFuTm9kZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGhvbGRlckRpdik7Ki9cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gdGFyZ2V0LmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHRleHQgLT4gXCIsIHRleHQpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdUZXh0ID0gdGV4dC5yZXBsYWNlKC9cXC4vZywgJzxzcGFuIGNsYXNzPVwiZ2V0LXBvc2l0aW9uLW9mLWl0XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBuZXdUZXh0O1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQxID0gdGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnZXQtcG9zaXRpb24tb2YtaXRcIilbMF0ub2Zmc2V0TGVmdCArIDEyO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQyID0gdGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJnZXQtcG9zaXRpb24tb2YtaXRcIilbMV0ub2Zmc2V0TGVmdCArIDEyO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIG5ld05vZGUuc3R5bGUuYmFja2dyb3VuZCA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zdHlsZS53aWR0aCA9IG9mZnNldDIgLSBvZmZzZXQxICsgMTIgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5zdHlsZS5oZWlnaHQgPSBcIjEwcHhcIjtcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnN0eWxlLm1hcmdpblRvcCA9IFwiLTEwcHhcIlxuICAgICAgICAgICAgICAgIG5ld05vZGUuc3R5bGUubWFyZ2luTGVmdCA9IG9mZnNldDEgICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChuZXdOb2RlKTtcbiAgICAgICAgICAgICAgICAvL3RhcmdldC5pbm5lckhUTUwgPSB0ZXh0OyovXG5cblxuXG4gICAgICAgICAgICAgICAgLy90YXJnZXQuaW5uZXJUZXh0ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZDpyZWQ7XCI+Jyt0aGlzLmFyY2hpdmVTdHJpbmcrJzwvc3Bhbj4nKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0JldHdlZW5JbmRleGVzTGVuZ3RoID09PSAxICYmIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gPiB3b3JkU3RhcnRJbmRleCl7XG5cbiAgICAgICAgICAgICAgICAvL3RhZ3VycGlkaSByZWt1cnNpb29uXG4gICAgICAgICAgICAgICAgaWYoIWV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tCYWNrKGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0JldHdlZW5JbmRleGVzTGVuZ3RoID09PSAxICYmIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gPCB3b3JkU3RhcnRJbmRleCl7XG5cbiAgICAgICAgICAgICAgICAvL2VkYXNwaWRpIHJla3Vyc2lvb25cbiAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tGb3J3YXJkKGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKGxhdXNlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9va0ZvcndhcmQobmV4dEJsb2NrLCBidWlsZGVyOiBzdHJpbmcpe1xuICAgICAgICB2YXIgdGV4dCA9IGJ1aWxkZXI7XG4gICAgICAgIHZhciBuZXh0ID0gbmV4dEJsb2NrO1xuXG4gICAgICAgIGlmKHRoaXMuY291bnRNYXJrcyhuZXh0LmlubmVyVGV4dCwgJ1tcXFxcLlxcXFw/XFxcXCFdJykgPiAwKXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogaW5uZXJUZXh0IC0+IFwiLCBuZXh0LmlubmVyVGV4dCk7XG5cbiAgICAgICAgICAgIHZhciBkb3RJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKG5leHQuaW5uZXJUZXh0LCAnLicpO1xuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihuZXh0LmlubmVyVGV4dCwgJz8nKTtcbiAgICAgICAgICAgIHZhciBleGNsSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihuZXh0LmlubmVyVGV4dCwgJyEnKTtcbiAgICAgICAgICAgIHZhciBpbmRleGVzRm9yQ2hlY2s6IG51bWJlcltdID0gZG90SW5kZXguY29uY2F0KHF1ZXN0aW9uSW5kZXgsIGV4Y2xJbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9SV0FSRCBSRUs6IGluZGV4ZXNGb3JDaGVjayAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKTtcblxuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gaW5kZXhlc0ZvckNoZWNrLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gdGhpcy5jaGVja0FiYnJldmlhdGlvbnMoaW5kZXhlc0ZvckNoZWNrLCBuZXh0LmlubmVyVGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSW5kZXhlcyA9IHRoaXMuY2hlY2tOdW0oZG90SW5kZXgsIG5leHQuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9SV0FSRCBSRUs6IHJlbW92ZUluZGV4ZXMgLT4gXCIsIHJlbW92ZUluZGV4ZXMpO1xuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gaW5kZXhlc0ZvckNoZWNrLmZpbHRlcigoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgPCAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRk9SV0FSRCBSRUs6IGluZGV4ZXMgYWZ0ZXIgZmlsdGVyIC0+IFwiLCBpbmRleGVzRm9yQ2hlY2spO1xuXG4gICAgICAgICAgICBpZihpbmRleGVzRm9yQ2hlY2subGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgIHRleHQgKz0gXCIgXCIgKyBuZXh0LmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb29rRm9yd2FyZChuZXh0Lm5leHRFbGVtZW50U2libGluZywgdGV4dCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dCArIFwiIFwiICsgbmV4dC5pbm5lclRleHQuc3Vic3RyaW5nKDAsIGluZGV4ZXNGb3JDaGVja1swXSsxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuZXh0LnN0eWxlLmJhY2tncm91bmQgPSBcInllbGxvd1wiO1xuICAgICAgICAgICAgdGV4dCArPSBcIiBcIiArIG5leHQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmQobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvb2tCYWNrKHByZXZpb3VzQmxvY2ssIGJ1aWxkZXI6IHN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIHByZXYgPSBwcmV2aW91c0Jsb2NrO1xuXG4gICAgICAgIGlmKHRoaXMuY291bnRNYXJrcyhwcmV2LmlubmVyVGV4dCwgJ1tcXFxcLlxcXFw/XFxcXCFdJykgPiAwKXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogaW5uZXJUZXh0IC0+IFwiLCBwcmV2LmlubmVyVGV4dCk7XG5cbiAgICAgICAgICAgIHZhciBkb3RJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnLicpO1xuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihwcmV2LmlubmVyVGV4dCwgJz8nKTtcbiAgICAgICAgICAgIHZhciBleGNsSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihwcmV2LmlubmVyVGV4dCwgJyEnKTtcbiAgICAgICAgICAgIHZhciBpbmRleGVzRm9yQ2hlY2s6IG51bWJlcltdID0gZG90SW5kZXguY29uY2F0KHF1ZXN0aW9uSW5kZXgsIGV4Y2xJbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQkFDSyBSRUs6IGluZGV4ZXNGb3JDaGVjayAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKVxuXG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhpbmRleGVzRm9yQ2hlY2ssIHByZXYuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleCwgcHJldi5pbm5lclRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCQUNLIFJFSzogaW5kZXhlcyBhZnRlciBmaWx0ZXIgLT4gXCIsIGluZGV4ZXNGb3JDaGVjayk7XG5cbiAgICAgICAgICAgIGlmKGluZGV4ZXNGb3JDaGVjay5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgcHJldi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gcHJldi5pbm5lclRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0JhY2socHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0ZXh0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LmlubmVyVGV4dC5zdWJzdHJpbmcoaW5kZXhlc0ZvckNoZWNrW2luZGV4ZXNGb3JDaGVjay5sZW5ndGgtMV0rMSkgKyBcIiBcIiArIHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJldi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgICAgIHRleHQgPSBwcmV2LmlubmVyVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvb2tCYWNrKHByZXYucHJldmlvdXNFbGVtZW50U2libGluZywgdGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tOdW0oZG90SW5kZXhBcnJheTogbnVtYmVyW10sIHRleHQ6IHN0cmluZyl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogY2hlY2tOdW0gbMOka3Mga8OkaW1hIVwiKTtcblxuICAgICAgICB2YXIgc3BhY2VJbmRleDogbnVtYmVyO1xuICAgICAgICB2YXIgcmV0dXJuSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIgXCIpe1xuICAgICAgICAgICAgICAgIHNwYWNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dC5jaGFyQXQoaSkgPT09IFwiLlwiKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBsZWlkaXMgw7xsZXNzZSBwdW5rdGlcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogcHVua3Rpc3QgZWVsbWluZSBjaGFyIC0+IFwiLCB0ZXh0LmNoYXJBdChpLTEpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBrYXMgZWVsbWluZSBvbiBudW1iZXIgLT4gXCIsIHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGktMSkpKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNMZXR0ZXIgPSB0ZXh0LmNoYXJBdChpLTEpO1xuICAgICAgICAgICAgICAgIHZhciBpc0luVGhlRW5kID0gdGhpcy5sb29rRm9yQmlnTGV0dGVyKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkpLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RBbHBoYWJldGljYWxJbmRleCA9IHRleHQuaW5kZXhPZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0ZXh0LnN1YnN0cmluZyhpKzEpKSk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB0ZXh0IC0+IFwiLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBpIC0+IFwiLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBpc0luVGhlRW5kIHZhcmlhYmxlIC0+IFwiLCBpc0luVGhlRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB0ZXh0LnN1YnN0cmluZyhpKzEpIC0+IFwiLCB0ZXh0LnN1YnN0cmluZyhpKzEpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBmaXJzdCBhbHBoYWJldGljYWwgLT4gXCIsIHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRleHQuc3Vic3RyaW5nKGkrMSkpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNIRUNLTlVNOiB1cHBlcmNhc2UgLT4gXCIsIHRleHQuY2hhckF0KGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFS0NOVU06IHRleHQuY2hhckF0KGkrMSkgLT4gXCIsIHRleHQuY2hhckF0KGkrMSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGlzTnVtZXJpYyAtPiBcIiwgdGhpcy5pc051bWVyaWModGV4dC5jaGFyQXQoaSsxKSkpO1xuICAgICAgICAgICAgICAgIGlmKHRleHQuY2hhckF0KGkrMSkgPT09IFwiIFwiICYmIHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRleHQuc3Vic3RyaW5nKGkrMSkpICE9XG4gICAgICAgICAgICAgICAgdGV4dC5jaGFyQXQoZmlyc3RBbHBoYWJldGljYWxJbmRleCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGVpIG9sZSBsYXVzZSBsw7VwdXNcIik7XG4gICAgICAgICAgICAgICAgfWlmKHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGkrMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdW5rdGlzdCBqw6RyZ21pbmUgb24gbnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleGVzLnB1c2goaSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyppZih0aGlzLmlzTnVtZXJpYyhwcmV2aW91c0xldHRlcikgJiYgdGV4dC5jaGFyQXQoaSsxKSA9PT0gXCIgXCIgJiYgaXNJblRoZUVuZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VlIHB1bmt0IG9uIGxhdXNlIGzDtXB1cyBpbmRleCAtPiBcIiwgaSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc051bWVyaWMocHJldmlvdXNMZXR0ZXIpICYmIHRleHQuY2hhckF0KGkrMSkgPT09IFwiIFwiICYmIGlzSW5UaGVFbmQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhdXNlbMO1cHUgcHVua3QgdMOkaGVnYSBrb29zIC0+IFwiLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogY2hlY2tudW1pc3QgdGFnYXN0YXRhdmFkIGVlbWFsZGFtaXNlbGUgbWluZXZhZCBpbmRleGlkIC0+IFwiLCByZXR1cm5JbmRleGVzKTtcbiAgICAgICAgcmV0dXJuIHJldHVybkluZGV4ZXM7XG4gICAgfVxuICAgIGlzTnVtZXJpYyh2YWx1ZTogYW55KXtcbiAgICAgICAgcmV0dXJuICFpc05hTih2YWx1ZSAtcGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgIH1cbiAgICBjaGVja0FiYnJldmlhdGlvbnMoaW5kZXhBcnJheTogbnVtYmVyW10sIHRleHQ6IHN0cmluZyl7XG4gICAgICAgIHZhciBzcGFjZUluZGV4OiBudW1iZXI7XG4gICAgICAgIHZhciByZXR1cm5JbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICB2YXIgc3BhY2VJbmRleEFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHRleHQuY2hhckF0KGkpID09PSBcIiBcIil7XG4gICAgICAgICAgICAgICAgc3BhY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIuXCIgfHwgdGV4dC5jaGFyQXQoaSkgPT09IFwiP1wiIHx8IHRleHQuY2hhckF0KGkpID09PSBcIiFcIil7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQUJSIGZuOiBjaGFyIGtvaGFsIGkgb24gLT4gXCIsIHRleHQuY2hhckF0KGkpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFCUiBmbjogZWVsbWlzZXN0IHTDvGhpa3VzdCBrdW5pIHB1bmt0aW5pIC0+IFwiLFxuICAgICAgICAgICAgICAgIHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkrMSkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lbW9yeUNoZWNrTmFtZTogYm9vbGVhbiA9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01lbW9yeU5hbWVBYih0ZXh0LnN1YnN0cmluZyhzcGFjZUluZGV4LCBpKzEpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIHZhciBtZW1vcnlDaGVja0VuZDogYm9vbGVhbiA9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01lbW9yeU90aGVyKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkrMSkudG9Mb3dlckNhc2UoKSwgdGV4dCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFCUiBmbjogbmFtZUNoZWNrRm4gcmVzdWx0IC0+IFwiLCBtZW1vcnlDaGVja05hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYoIW1lbW9yeUNoZWNrTmFtZSAmJiAhbWVtb3J5Q2hlY2tFbmQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkFCUiBmbjogdGFnYXN0YXRhdmFkIGluZGV4aWQgLT4gXCIsIHJldHVybkluZGV4ZXMpO1xuICAgICAgICByZXR1cm4gcmV0dXJuSW5kZXhlcztcbiAgICB9XG4gICAgY2hlY2tNZW1vcnlOYW1lQWIod29yZDogc3RyaW5nKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNIRUNLTkFNRSBmbjogYWJydiAtPiBcIiwgd29yZCk7XG5cbiAgICAgICAgdmFyIG5hbWVBYkFycmF5OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgIFwibXIuXCIsIFwibXJzLlwiLCBcIm1pc3MuXCIsXG4gICAgICAgICAgICBcImRyLlwiLCBcInJldi5cIiwgXCJob24uXCIsXG4gICAgICAgICAgICBcInByb2YuXCIsIFwiZ2VuLlwiLCBcInJlcC5cIixcbiAgICAgICAgICAgIFwic2VuLlwiLCBcInN0LlwiLCBcImNhcHQuXCIsXG4gICAgICAgICAgICBcInNndC5cIiwgXCJwdnQuXCIsIFwic2lyLlwiLFxuICAgICAgICAgICAgXCJjb21kci5cIiwgXCJjb3JwLlwiLCBcImNwbC5cIixcbiAgICAgICAgICAgIFwiZ292LlwiLCBcImFrYWQuXCIsIFwiYXJoLlwiLFxuICAgICAgICAgICAgXCJkaXIuXCIsIFwiaHIuXCIsIFwiaS5cIiwgXCJscC5cIixcbiAgICAgICAgICAgIFwicHIuXCIsIFwicHJsLlwiLCBcInJua2wuXCIsXG4gICAgICAgICAgICBcInJ2a2wuXCIsIFwidi5hXCIsIFwiw7VwLlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBsID0gbmFtZUFiQXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgICAgIGlmKG5hbWVBYkFycmF5W2ldID09IHdvcmQudHJpbSgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrTWVtb3J5T3RoZXIod29yZDogc3RyaW5nLCBzZW50ZW5jZTogc3RyaW5nKXtcbiAgICAgICAgdmFyIG1lbW9yeUFycmF5OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgIFwiZS5nXCIsIFwiYS5pLlwiLCBcImEubS5cIixcbiAgICAgICAgICAgIFwiY2NhLlwiLCBcImMuXCIsIFwiY2EuXCIsXG4gICAgICAgICAgICBcImNhcC5cIiwgXCJjZi5cIiwgXCJjcC5cIixcbiAgICAgICAgICAgIFwiYy52LlwiLCBcImN3dC5cIiwgXCJkLnYuXCIsXG4gICAgICAgICAgICBcImVhZC5cIiwgXCJhbC5cIiwgXCJldGMuXCIsXG4gICAgICAgICAgICBcImZsLlwiLCBcImYuXCIsIFwiZmYuXCIsXG4gICAgICAgICAgICBcImliaWQuXCIsIFwiaWQuXCIsIFwiaS5hLlwiLFxuICAgICAgICAgICAgXCJpLmUuXCIsIFwibGIuXCIsIFwibGJzLlwiLFxuICAgICAgICAgICAgXCJsbC5iLlwiLCBcIm0uYS5cIiwgXCJtLm8uXCIsXG4gICAgICAgICAgICBcIm5lbS5cIiwgXCJjb24uXCIsIFwib3AuXCIsXG4gICAgICAgICAgICBcImNpdC5cIiwgXCJwLmEuXCIsIFwiY2VudC5cIixcbiAgICAgICAgICAgIFwicGguZC5cIiwgXCJwLm0uXCIsIFwicC5tLmEuXCIsXG4gICAgICAgICAgICBcInAucC5cIixcInRlbS5cIiwgXCJwLnMuXCIsXG4gICAgICAgICAgICBcInAucC5zLlwiLCBcInEuZC5cIiwgXCJxLmUuZC5cIixcbiAgICAgICAgICAgIFwicS52LlwiLCBcInIuXCIsIFwici5pLnAuXCIsXG4gICAgICAgICAgICBcInMuYS5cIiwgXCJzLmwuXCIsIFwicy5zLlwiLFxuICAgICAgICAgICAgXCJzLm8ucy5cIiwgXCJzdGF0LlwiLCBcInZpei5cIixcbiAgICAgICAgICAgIFwidnMuXCIsIFwiYi5jLlwiLCBcImEuZC5cIiwgXCJiLmMuZS5cIixcbiAgICAgICAgICAgIFwiYy5lLlwiLCBcImwucS5cIiwgXCJpZ24uXCIsXCJpLm8uXCIsXG4gICAgICAgICAgICBcImEuYy5cIiwgXCJhLnAuXCIsIFwiYXEuXCIsIFwicC5tLnZcIixcbiAgICAgICAgICAgIFwicHJveC5cIiwgXCJxLmwuXCIsIFwicS5lLmYuXCIsIFwicy5kLmcuXCIsXG4gICAgICAgICAgICBcIm5vbS5cIiwgXCJzLnYuXCIsXCJ0LmkuZC5cIiwgXCJ1bHQuXCIsXG4gICAgICAgICAgICBcInYuXCIsIFwiZy5cIiwgXCJnci5cIiwgXCJpLlwiLCBcInMuXCIsIFwiaS5cIixcbiAgICAgICAgICAgIFwiYS5jLmgucy5cIiwgXCJhZGQuXCIsIFwiYWQuXCIsXG4gICAgICAgICAgICBcImxpYi5cIiwgXCJhZG1vdi5cIiwgXCJ1cy5cIiwgXCJhZ2l0LlwiLFxuICAgICAgICAgICAgXCJhbHQuXCIsIFwiZC5cIiwgXCJkaWViLlwiLCBcImguXCIsXG4gICAgICAgICAgICBcImhvci5cIiwgXCJhbXAuXCIsIFwiYXEuXCIsIFwiYnVsbC5cIixcbiAgICAgICAgICAgIFwiY29tLlwiLCBcImRlc3QuXCIsIFwiZmVydi5cIixcbiAgICAgICAgICAgIFwiYS5zLlwiLCBcImEubC5cIiwgXCJha2FkLlwiLFxuICAgICAgICAgICAgXCJhcmguXCIsIFwiZGVtLlwiLCBcImRldHMuXCIsIFwiZGlyLlwiLFxuICAgICAgICAgICAgXCJhLlwiLCBcInBoaWwuXCIsIFwibmF0LlwiLCBcImUuXCIsIFwiay5cIixcbiAgICAgICAgICAgIFwibC5cIiwgXCJraGsuXCIsIFwia2wuXCIsIFwibGQuXCIsIFwibHAuXCIsXG4gICAgICAgICAgICBcInByLlwiLCBcInBybC5cIiwgXCJybmtsLlwiLCBcInJ2a2wuXCIsXG4gICAgICAgICAgICBcIsO1cC5cIiwgXCJpbmdsLlwiXG4gICAgICAgIF07XG4gICAgICAgIHZhciBsZW5ndGggPSBtZW1vcnlBcnJheS5sZW5ndGg7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZihtZW1vcnlBcnJheVtpXSA9PSB3b3JkLnRyaW0oKSl7XG4gICAgICAgICAgICAgICAgdmFyIGlzSW5UaGVFbmQgPSB0aGlzLmxvb2tGb3JCaWdMZXR0ZXIod29yZCwgc2VudGVuY2UpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VlIG9uIGlzSW5UaGVFbmQgdmFyaWFibGUgLT4gXCIsIGlzSW5UaGVFbmQpO1xuICAgICAgICAgICAgICAgIGlmKGlzSW5UaGVFbmQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbG9va0ZvckJpZ0xldHRlcih3b3JkOiBzdHJpbmcsIHRleHQ6IHN0cmluZyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTE9PSyBGT1IgQklHIEZOOiBzw7VuYSAtPiBcIiwgd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTE9PSyBGT1IgQklHIEZOOiB0ZWtzdCAtPiBcIiwgdGV4dCk7XG4gICAgICAgIHZhciB3b3JkSW5kZXggPSB0ZXh0LmluZGV4T2Yod29yZCk7XG4gICAgICAgIHZhciBsb29wVmFyID0gdGV4dC5zdWJzdHJpbmcod29yZEluZGV4ICsgd29yZC5sZW5ndGgtMSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxPT0sgRk9SIEJJRyBGTjogbG9vcFZhciAtPiBcIiwgbG9vcFZhcik7XG5cbiAgICAgICAgaWYodGV4dC5sZW5ndGggPD0gd29yZEluZGV4ICsgd29yZC5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgbG9vcFZhci5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgaWYobG9vcFZhci5jaGFyQXQoaSkgPT09IFwiIFwiICYmXG4gICAgICAgICAgICAgICAgbG9vcFZhci5jaGFyQXQoaS0xKSA9PT0gXCIuXCIgJiZcbiAgICAgICAgICAgICAgICBsb29wVmFyLmNoYXJBdChpKzEpID09IGxvb3BWYXIuY2hhckF0KGkrMSkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQmV0d2VlbkluZGV4ZXModGFyZ2V0SW5kZXg6IG51bWJlciwgbWFya0luZGV4OiBudW1iZXJbXSl7XG4gICAgICAgIHZhciByZXR1cm5BcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBpZih0YXJnZXRJbmRleCA8IG1hcmtJbmRleFswXSl7XG4gICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFswXSlcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgICAgICAgfVxuICAgICAgICBpZih0YXJnZXRJbmRleCA+IG1hcmtJbmRleFttYXJrSW5kZXgubGVuZ3RoLTFdKXtcbiAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W21hcmtJbmRleC5sZW5ndGgtMV0pXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1hcmtJbmRleC5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldEluZGV4ID4gbWFya0luZGV4W2ldICYmIHRhcmdldEluZGV4IDwgbWFya0luZGV4W2krMV0pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W2krMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvdW50TWFya3ModGV4dDogc3RyaW5nLCBsZXR0ZXI6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiAodGV4dC5tYXRjaChSZWdFeHAobGV0dGVyLCAnZycpKSB8fCBbXSkubGVuZ3RoO1xuICAgIH1cbiAgICBpbmRleEZpbmRlcihzdHIsIGNoYXIpe1xuICAgICAgICByZXR1cm4gc3RyLnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbihjLCBpKXtcbiAgICAgICAgICAgIGlmKGMgPT0gY2hhcikgcmV0dXJuIGk7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbih2KXtcbiAgICAgICAgICAgIHJldHVybiB2ID49MFxuICAgICAgICB9KVxuICAgIH1cbiAgICBmaW5kRmlyc3RBbHBoYWJldGljYWwodGV4dDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuICh0ZXh0Lm1hdGNoKC9bYS16QS16XS8pIHx8wqBbXSkucG9wKCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==
