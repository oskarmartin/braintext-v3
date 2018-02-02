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
            return;
        }
        if (target.tagName === "SPAN") {
            console.log("CLICKED ELEMENT IS IN SPAN!");
            /*var text = target.innerHTML;
            target.parentNode.innerHTML = text;*/
            var holder = target.parentNode.innerHTML;
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var node = selection.anchorNode;
            targetText = target.innerHTML;
            var targetParent = target.parentNode.innerText;
            console.log("target-parent -> ", targetParent);
            var allIndexes = [];
            var endQuoteMarkSum = 0;
            var qMarkIndexes = this.indexFinder(targetParent, '?');
            var eMarkIndexes = this.indexFinder(targetParent, '!');
            var dotIndexesTest = this.indexFinder(targetParent, '.');
            var quoteIndexes = this.indexFinder(targetParent, '"');
            var firstAlphabeticalIndex = targetParent.indexOf(this.findFirstAlphabetical(targetParent));
            allIndexes = qMarkIndexes.concat(eMarkIndexes, dotIndexesTest);
            allIndexes = allIndexes.sort(function (a, b) { return a - b; });
            if (allIndexes.length != 0) {
                allIndexes = this.checkAbbreviations(allIndexes, targetParent);
                var removeIndexes = this.checkNum(dotIndexesTest, targetParent);
                //console.log("removeIndexes here -> ", removeIndexes);
                //console.log("Märkide array peale kontrolli -> ", allIndexes);
                //console.log("Clickitava sõna/koha index -> ", range.startOffset);
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
                        //console.log("FILTER FUN: x -> ", x);
                        //console.log("FILTER FUN: removeIndexes.indexOf(x) -> ", removeIndexes.indexOf(x));
                        return removeIndexes.indexOf(x) < 0;
                    });
                }
                //console.log("allIndexes peale filterit -> ", allIndexes);
            }
            //var wordStartIndex = range.startOffset;
            var wordStartIndex = range.startOffset;
            var endQuoteMarkSum = allIndexes.length;
            console.log("SPAN REMOVAL: allIndexes -> ", allIndexes);
            console.log("SPAN REMOVAL: endQuoteMarkSum -> ", endQuoteMarkSum);
            console.log("SPAN REMOVAL: wordStartIndex -> ", range.startOffset);
            if (endQuoteMarkSum === 0) {
                if (this.findFirstAlphabetical(targetText) == targetText.charAt(firstAlphabeticalIndex).toUpperCase()) {
                    //var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(firstAlphabeticalIndex));
                    //this.sentenceService.publishData(lause);
                    var parent = target.parentNode;
                    var forwardText = parent.innerHTML;
                    parent.innerHTML = forwardText.replace(/<\/?span[^>]*>/, "");
                    var removalLause = this.lookForwardAndRemove(parent.nextElementSibling, "random hetkel");
                    return;
                    //var re  = new RegExp(forwardText, "g");
                    //target.innerHTML = target.innerHTML.replace(/<?span[^>]*>/, "<span style='background:yellow'>"+forwardText+"</span>");
                }
                else {
                    console.log("else statement");
                    var parent = target.parentNode;
                    console.log("else statement parent -> ", parent);
                    var lauseTagasi = this.lookBackAndRemove(parent.previousElementSibling, "");
                    var lauseEdasi = this.lookForwardAndRemove(parent.nextElementSibling, "");
                    /*var test = lauseTagasi + " " + targetText + " " + lauseEdasi;
                    this.sentenceService.publishData(test);

                    var forwardText = target.innerText.substring(0);
                    var re  = new RegExp(forwardText, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>"+forwardText+"</span>");*/
                    var forwardText = parent.innerHTML;
                    console.log("else statement forwardText -> ", forwardText);
                    parent.innerHTML = forwardText.replace(/<\/?span[^>]*>/, "");
                    return;
                }
            }
            if (endQuoteMarkSum === 1) {
                //console.log("ALGOR fn: indexArrays on ainult 1 märk!");
                console.log("SPAN: siin on ainult 1 lause märk");
                if (allIndexes[0] < wordStartIndex) {
                    var parent = target.parentNode;
                    var parentInner = target.innerText;
                    parent.innerHTML = parentInner;
                    this.lookForwardAndRemove(parent.nextElementSibling, "");
                    return;
                }
                if (allIndexes[0] > wordStartIndex) {
                    console.log("INDEX ON VÄIKSEM KUI PUNKT!");
                    if (targetText.charAt(0) == targetText.charAt(0).toUpperCase()) {
                        var parent = target.parentNode;
                        var parentInner = target.innerText;
                        parent.innerHTML = parentInner;
                        return;
                    }
                    else {
                        console.log("TULEN SIIA SISSE");
                        var parent = target.parentNode;
                        var parentInner = target.innerText;
                        parent.innerHTML = parentInner;
                        this.lookBackAndRemove(parent.previousElementSibling, "");
                        return;
                    }
                }
            }
            if (endQuoteMarkSum >= 2) {
                console.log("SPAN REMOVAL: rohkem kui kaks lauselõpumärki!");
                var isBetweenIndexesLength = this.isBetweenIndexes(wordStartIndex, allIndexes).length;
                console.log(" SPAN: IsBetweenIndexesLength -> ", isBetweenIndexesLength);
                var isBetweenIndexesResult = this.isBetweenIndexes(wordStartIndex, allIndexes);
                console.log("SPAN: IsBetweenIndexesArray -> ", isBetweenIndexesResult);
                console.log("what!");
                //Means that sentence is between two dots in block
                if (isBetweenIndexesLength === 2) {
                    //console.log("text before substring -> ", targetText.substring(0, isBetweenIndexesResult[0]+1));
                    //console.log("text after substring -> ", targetText.substring(isBetweenIndexesResult[1]+1));
                    var parent = target.parentNode;
                    console.log("SPAN REMOVAL: target -> ", target);
                    //var re = new RegExp()
                    parent.innerHTML = parent.innerHTML.replace();
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
                        //console.log("%c"+lause, "background: #222 ; color: #bada55");
                    }
                    else {
                        var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, isBetweenIndexesResult[0] + 1));
                        this.sentenceService.publishData(lause);
                        var replaceString = targetText.substring(0, isBetweenIndexesResult[0] + 1);
                        var re = new RegExp(replaceString, "g");
                        target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                        /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0]+1) +
                        "</span>" + targetText.substring(isBetweenIndexesResult[0]+1);*/
                        //console.log("%c"+lause, "background: #222 ; color: #bada55");
                    }
                }
                if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] < wordStartIndex) {
                    //edaspidi rekursioon
                    //console.log("siin on vea koht !!!!");
                    var replaceString = targetText.substring(isBetweenIndexesResult[0] + 1);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(isBetweenIndexesResult[0] + 1));
                    this.sentenceService.publishData(lause);
                    //console.log("%c"+lause, "background: #222 ; color: #bada55");
                }
            }
            return;
        } //END OF REMOVAL PART
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
        //console.log("BEFORE ALGO: First alphabetical letter in a string -> ", this.findFirstAlphabetical(targetText));
        //console.log("BEFORE ALGO: First alphabetical letter index -> ", "background:#222;" ,targetText.indexOf(this.findFirstAlphabetical(targetText)));
        if (allIndexes.length != 0) {
            allIndexes = this.checkAbbreviations(allIndexes, targetText);
            var removeIndexes = this.checkNum(dotIndexesTest, targetText);
            //console.log("removeIndexes here -> ", removeIndexes);
            //console.log("Märkide array peale kontrolli -> ", allIndexes);
            //console.log("Clickitava sõna/koha index -> ", range.startOffset);
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
                    //console.log("FILTER FUN: x -> ", x);
                    //console.log("FILTER FUN: removeIndexes.indexOf(x) -> ", removeIndexes.indexOf(x));
                    return removeIndexes.indexOf(x) < 0;
                });
            }
            //console.log("allIndexes peale filterit -> ", allIndexes);
        }
        var wordStartIndex = range.startOffset;
        var endQuoteMarkSum = allIndexes.length;
        if (endQuoteMarkSum === 0) {
            if (this.findFirstAlphabetical(targetText) == targetText.charAt(firstAlphabeticalIndex).toUpperCase()) {
                //console.log("lauselõpumärke on blokis 0 ja algustäht on suur!");
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(firstAlphabeticalIndex));
                this.sentenceService.publishData(lause);
                var forwardText = target.innerText.substring(0);
                var re = new RegExp(forwardText, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>");
                //console.log("%c"+lause, "background: #222 ; color: #bada55");
            }
            else {
                var lauseTagasi = this.lookBack(event.target.previousElementSibling, "");
                var lauseEdasi = this.lookForward(event.target.nextElementSibling, "");
                var test = lauseTagasi + " " + targetText + " " + lauseEdasi;
                this.sentenceService.publishData(test);
                var forwardText = target.innerText.substring(0);
                var re = new RegExp(forwardText, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>");
                //console.log("%c"+test, "background: #222 ; color: #bada55");
            }
        }
        if (endQuoteMarkSum === 1) {
            //console.log("ALGOR fn: indexArrays on ainult 1 märk!");
            if (allIndexes[0] < wordStartIndex) {
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(allIndexes[0] + 1));
                this.sentenceService.publishData(lause);
                var replaceString = targetText.substring(allIndexes[0] + 1);
                var re = new RegExp(replaceString, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                /*target.innerHTML = targetText.substring(0, allIndexes[0]+1) + "<span style='background: yellow'>" +
                targetText.substring(allIndexes[0]+1) + "</span>";*/
                //console.log("%c"+lause, "background: #222 ; color: #bada55");
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
                    //console.log("%c" + suureAlgusega, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, allIndexes[0] + 1));
                    this.sentenceService.publishData(lause);
                    var replaceString = targetText.substring(0, allIndexes[0]);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, allIndexes[0]) +
                    "</span>" + targetText.substring(allIndexes[0]);*/
                    //console.log("%c"+lause, "background: #222 ; color: #bada55");
                }
            }
        }
        if (endQuoteMarkSum >= 2) {
            var isBetweenIndexesLength = this.isBetweenIndexes(wordStartIndex, allIndexes).length;
            //console.log("IsBetweenIndexesLength -> ", isBetweenIndexesLength);
            var isBetweenIndexesResult = this.isBetweenIndexes(wordStartIndex, allIndexes);
            //console.log("IsBetweenIndexesArray -> ", isBetweenIndexesResult);
            //Means that sentence is between two dots in block
            if (isBetweenIndexesLength === 2) {
                //console.log("text before substring -> ", targetText.substring(0, isBetweenIndexesResult[0]+1));
                //console.log("text after substring -> ", targetText.substring(isBetweenIndexesResult[1]+1));
                this.archiveString = targetText.substring(isBetweenIndexesResult[0] + 1, isBetweenIndexesResult[1] + 1);
                this.sentenceService.publishData(this.archiveString);
                //console.log(this.archiveString);
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
                    //console.log("%c"+lause, "background: #222 ; color: #bada55");
                }
                else {
                    var lause = this.lookBack(event.target.previousElementSibling, targetText.substring(0, isBetweenIndexesResult[0] + 1));
                    this.sentenceService.publishData(lause);
                    var replaceString = targetText.substring(0, isBetweenIndexesResult[0] + 1);
                    var re = new RegExp(replaceString, "g");
                    target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                    /*target.innerHTML = "<span style='background: yellow'>" + targetText.substring(0, isBetweenIndexesResult[0]+1) +
                    "</span>" + targetText.substring(isBetweenIndexesResult[0]+1);*/
                    //console.log("%c"+lause, "background: #222 ; color: #bada55");
                }
            }
            if (isBetweenIndexesLength === 1 && isBetweenIndexesResult[0] < wordStartIndex) {
                //edaspidi rekursioon
                //console.log("siin on vea koht !!!!");
                var replaceString = targetText.substring(isBetweenIndexesResult[0] + 1);
                var re = new RegExp(replaceString, "g");
                target.innerHTML = target.innerHTML.replace(re, "<span style='background:yellow'>" + replaceString + "</span>");
                var lause = this.lookForward(event.target.nextElementSibling, targetText.substring(isBetweenIndexesResult[0] + 1));
                this.sentenceService.publishData(lause);
                //console.log("%c"+lause, "background: #222 ; color: #bada55");
            }
        }
    };
    HomeComponent.prototype.lookForwardAndRemove = function (nextBlock, builder) {
        var text = builder;
        var next = nextBlock;
        console.log("block ->", next);
        console.log("block innerText -> ", next.innerText);
        console.log("block quote marks ->", this.countMarks(next.innerHTML, '[\\.\\?\\!]'));
        console.log("count marks boolean -> ", this.countMarks(next.innerHTML, '[\\.\\?\\!]') > 0);
        if (this.countMarks(next.innerHTML, '[\\.\\?\\!]') > 0) {
            console.log("tuleb count marksi sisse ");
            var dotIndex = this.indexFinder(next.innerText, '.');
            var questionIndex = this.indexFinder(next.innerText, '?');
            var exclIndex = this.indexFinder(next.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            //console.log("FORWARD REK: indexesForCheck -> ", indexesForCheck);
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, next.innerText);
            var removeIndexes = this.checkNum(dotIndex, next.innerText);
            //console.log("FORWARD REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            if (indexesForCheck.length == 0) {
                var forwardText = next.innerHTML;
                next.innerHTML = forwardText.replace(/<\/?span[^>]*>/, "");
                return this.lookForward(next.nextElementSibling, "suvaasi");
            }
            else {
                //console.log("tekstis on punkt või vahemärk");
                var spans = next.getElementsByTagName('span');
                if (spans.length == 0) {
                    return;
                }
                console.log("next spans -> ", spans);
                var re = new RegExp(spans[0].outerHTML, "g");
                next.innerHTML = next.innerHTML.replace(re, spans[0].innerText);
                /*var forwardText = next.innerText.substring(0, indexesForCheck[0]+1);
                var re = new RegExp(forwardText, "g");
                //console.log("edasi rekursiooni regular expression -> ", re);
                //console.log("edasi rekursioonis forwardText -> ", forwardText);
                //console.log("edasi rekursioon pärast replace innerHTML -> ", next.innerHTML.replace(re, "<span style='background:yellow'>"+forwardText+"</span>"));
                next.innerHTML = next.innerHTML.replace(re, "<span style='background:yellow'>"+forwardText+"</span>");*/
                return;
            }
        }
        else {
            console.log("puuduvad lauselõpumärgid rekursioonis! Next block -> ", next.nextElementSibling);
            var forwardText = next.innerHTML;
            next.innerHTML = forwardText.replace(/<\/?span[^>]*>/, "");
            //text += " " + next.innerText;
            return this.lookForwardAndRemove(next.nextElementSibling, "suvaasi");
        }
    };
    HomeComponent.prototype.lookBackAndRemove = function (previousBlock, builder) {
        var text = builder;
        var prev = previousBlock;
        console.log("prev block -> ", prev);
        if (this.countMarks(prev.innerHTML, '[\\.\\?\\!]') > 0) {
            //console.log("BACK REK: innerText -> ", prev.innerText);
            var dotIndex = this.indexFinder(prev.innerText, '.');
            var questionIndex = this.indexFinder(prev.innerText, '?');
            var exclIndex = this.indexFinder(prev.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            //console.log("BACK REK: indexesForCheck -> ", indexesForCheck)
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, prev.innerText);
            var removeIndexes = this.checkNum(dotIndex, prev.innerText);
            //console.log("BACK REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            //console.log("BACK REK: indexes after filter -> ", indexesForCheck);
            if (indexesForCheck.length == 0) {
                var backText = prev.innerHTML;
                prev.innerHTML = backText.replace(/<\/?span[^>]*>/, "");
                return this.lookBackAndRemove(prev.nextElementSibling, "suvaasi");
            }
            else {
                console.log("tulen siia else statementi");
                var spans = prev.getElementsByTagName('span');
                console.log("prev spans -> ", spans);
                if (spans.length == 0) {
                    console.log("spans is zero");
                    return;
                }
                var re = new RegExp(spans[spans.length - 1].outerHTML, "g");
                prev.innerHTML = prev.innerHTML.replace(re, spans[spans.length - 1].innerText);
                return;
            }
        }
        else {
            var targetText = prev.innerText;
            var backText = prev.innerHTML;
            var firstAlphabeticalIndex = targetText.indexOf(this.findFirstAlphabetical(targetText));
            if (this.findFirstAlphabetical(targetText) == targetText.charAt(firstAlphabeticalIndex).toUpperCase()) {
                prev.innerHTML = backText.replace(/<\/?span[^>]*>/, "");
                return;
            }
            prev.innerHTML = backText.replace(/<\/?span[^>]*>/, "");
            //text += " " + next.innerText;
            return this.lookBackAndRemove(prev.previousElementSibling, "suvaasi");
        }
    };
    HomeComponent.prototype.lookForward = function (nextBlock, builder) {
        var text = builder;
        var next = nextBlock;
        if (this.countMarks(next.innerText, '[\\.\\?\\!]') > 0) {
            //console.log("FORWARD REK: innerText -> ", next.innerText);
            var dotIndex = this.indexFinder(next.innerText, '.');
            var questionIndex = this.indexFinder(next.innerText, '?');
            var exclIndex = this.indexFinder(next.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            //console.log("FORWARD REK: indexesForCheck -> ", indexesForCheck);
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, next.innerText);
            var removeIndexes = this.checkNum(dotIndex, next.innerText);
            //console.log("FORWARD REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            //console.log("FORWARD REK: indexes after filter -> ", indexesForCheck);
            if (indexesForCheck.length == 0) {
                next.style.background = "yellow";
                text += " " + next.innerText;
                return this.lookForward(next.nextElementSibling, text);
            }
            else {
                //console.log("tekstis on punkt või vahemärk");
                var forwardText = next.innerText.substring(0, indexesForCheck[0] + 1);
                var re = new RegExp(forwardText, "g");
                //console.log("edasi rekursiooni regular expression -> ", re);
                //console.log("edasi rekursioonis forwardText -> ", forwardText);
                //console.log("edasi rekursioon pärast replace innerHTML -> ", next.innerHTML.replace(re, "<span style='background:yellow'>"+forwardText+"</span>"));
                next.innerHTML = next.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>");
                return text + " " + forwardText;
            }
        }
        else {
            var forwardText = next.innerText.substring(0);
            var re = new RegExp(forwardText, "g");
            next.innerHTML = next.innerHTML.replace(re, "<span style='background:yellow'>" + forwardText + "</span>");
            text += " " + next.innerText;
            return this.lookForward(next.nextElementSibling, text);
        }
    };
    HomeComponent.prototype.lookBack = function (previousBlock, builder) {
        var text = builder;
        var prev = previousBlock;
        if (this.countMarks(prev.innerText, '[\\.\\?\\!]') > 0) {
            //console.log("BACK REK: innerText -> ", prev.innerText);
            var dotIndex = this.indexFinder(prev.innerText, '.');
            var questionIndex = this.indexFinder(prev.innerText, '?');
            var exclIndex = this.indexFinder(prev.innerText, '!');
            var indexesForCheck = dotIndex.concat(questionIndex, exclIndex);
            //console.log("BACK REK: indexesForCheck -> ", indexesForCheck)
            indexesForCheck = indexesForCheck.sort(function (a, b) { return a - b; });
            indexesForCheck = this.checkAbbreviations(indexesForCheck, prev.innerText);
            var removeIndexes = this.checkNum(dotIndex, prev.innerText);
            //console.log("BACK REK: removeIndexes -> ", removeIndexes);
            indexesForCheck = indexesForCheck.filter(function (x) {
                return removeIndexes.indexOf(x) < 0;
            });
            //console.log("BACK REK: indexes after filter -> ", indexesForCheck);
            if (indexesForCheck.length == 0) {
                var backText = prev.innerText.substring(0);
                var re = new RegExp(backText, "g");
                prev.innerHTML = prev.innerHTML.replace(re, "<span style='background:yellow'>" + backText + "</span>");
                text = prev.innerText + " " + text;
                return this.lookBack(prev.previousElementSibling, text);
            }
            else {
                var backText = prev.innerText.substring(indexesForCheck[indexesForCheck.length - 1] + 1);
                var re = new RegExp(backText, "g");
                //console.log("tagasi rekursiooni regular expression -> ", re);
                //console.log("tagasi rekursioonis forwardText -> ", backText);
                //console.log("tagasi rekursioon pärast replace innerHTML -> ", prev.innerHTML.replace(re, "<span style='background:yellow'>"+backText+"</span>"));
                prev.innerHTML = prev.innerHTML.replace(backText, "<span style='background:yellow'>" + backText + "</span>");
                return backText + " " + text;
            }
        }
        else {
            var backText = prev.innerText.substring(0);
            var re = new RegExp(backText, "g");
            prev.innerHTML = prev.innerHTML.replace(re, "<span style='background:yellow'>" + backText + "</span>");
            text = prev.innerText + " " + text;
            return this.lookBack(prev.previousElementSibling, text);
        }
    };
    HomeComponent.prototype.checkNum = function (dotIndexArray, text) {
        //console.log("CHECKNUM: checkNum läks käima!");
        var spaceIndex;
        var returnIndexes = [];
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i) === " ") {
                spaceIndex = i;
            }
            if (text.charAt(i) === ".") {
                //console.log("CHECKNUM: leidis ülesse punkti");
                //console.log("CHECKNUM: punktist eelmine char -> ", text.charAt(i-1));
                //console.log("CHECKNUM: kas eelmine on number -> ", this.isNumeric(text.charAt(i-1)));
                var previousLetter = text.charAt(i - 1);
                var isInTheEnd = this.lookForBigLetter(text.substring(spaceIndex, i), text);
                var firstAlphabeticalIndex = text.indexOf(this.findFirstAlphabetical(text.substring(i + 1)));
                /*console.log("CHECKNUM: text -> ", text);
                console.log("CHECKNUM: i -> ", i);
                console.log("CHECKNUM: isInTheEnd variable -> ", isInTheEnd);
                console.log("CHECKNUM: text.substring(i+1) -> ", text.substring(i+1));
                console.log("CHECKNUM: first alphabetical -> ", this.findFirstAlphabetical(text.substring(i+1)));
                console.log("CHECKNUM: uppercase -> ", text.charAt(firstAlphabeticalIndex).toUpperCase());
                console.log("CHEKCNUM: text.charAt(i+1) -> ", text.charAt(i+1));
                console.log("CHECKNUM: isNumeric -> ", this.isNumeric(text.charAt(i+1)));*/
                if (text.charAt(i + 1) === " " && this.findFirstAlphabetical(text.substring(i + 1)) !=
                    text.charAt(firstAlphabeticalIndex).toUpperCase()) {
                    //console.log("CHECKNUM: ei ole lause lõpus");
                }
                if (this.isNumeric(text.charAt(i + 1))) {
                    //console.log("punktist järgmine on number");
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
        //console.log("CHECKNUM: checknumist tagastatavad eemaldamisele minevad indexid -> ", returnIndexes);
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
                //console.log("ABR fn: eelmisest tühikust kuni punktini -> ",
                //text.substring(spaceIndex, i+1));
                var memoryCheckName = this.checkMemoryNameAb(text.substring(spaceIndex, i + 1).toLowerCase());
                var memoryCheckEnd = this.checkMemoryOther(text.substring(spaceIndex, i + 1).toLowerCase(), text);
                //console.log("ABR fn: nameCheckFn result -> ", memoryCheckName);
                if (!memoryCheckName && !memoryCheckEnd) {
                    console.log(i);
                    returnIndexes.push(i);
                }
            }
        }
        //console.log("ABR fn: tagastatavad indexid -> ", returnIndexes);
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
                //console.log("see on isInTheEnd variable -> ", isInTheEnd);
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
        //console.log("LOOK FOR BIG FN: sõna -> ", word);
        //console.log("LOOK FOR BIG FN: tekst -> ", text);
        var wordIndex = text.indexOf(word);
        var loopVar = text.substring(wordIndex + word.length - 1).replace(/\s+/g, ' ');
        //console.log("LOOK FOR BIG FN: loopVar -> ", loopVar);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNHO0FBQ3RHLDhEQUF5RDtBQUN6RCxzQ0FBMEU7QUFDMUUsa0RBQWdGO0FBR2hGLDBEQUF3RDtBQUN4RCxrRUFBZ0U7QUFDaEUsNERBQTBEO0FBRTFELDBEQUF3RDtBQUV4RCw4REFBcUQ7QUFDckQsOERBQXFEO0FBR3JELGlDQUErQjtBQXdCL0I7SUFpQkksdUJBQ1ksV0FBd0IsRUFDeEIsSUFBVSxFQUNWLEdBQXNCLEVBQ3RCLGVBQWdDLEVBQ2hDLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ04sUUFBa0IsRUFDcEIsTUFBYyxFQUM5QixVQUFzQixFQUN0QixTQUF1QjtRQVZuQyxpQkE2QkU7UUE1QlUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNOLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUF4Qm5DLFVBQUssR0FBVyxFQUFFLENBQUM7UUFJbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFrQjFCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxV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QUFDLEtBQUssRUFBRSxrQkFBSyxDQUFDO3dCQUNmLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxHQUFHO3FCQUNaLENBQUMsQ0FBQztvQkFDSCx1QkFBVSxDQUFDLFdBQVcsRUFBRSxvQkFBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3JELHVCQUFVLENBQUMsV0FBVyxFQUFFLG9CQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztpQkFDeEQsQ0FBQzthQUNMO1NBRUosQ0FBQztRQTBCTyxXQUFBLGFBQU0sQ0FBQywyQkFBUSxDQUFDLENBQUE7UUFDaEIsV0FBQSxhQUFNLENBQUMsdUJBQU0sQ0FBQyxDQUFBO3lDQVBNLDBCQUFXO1lBQ2xCLFdBQUk7WUFDTCx3QkFBaUI7WUFDTCxrQ0FBZTtZQUNsQiw0QkFBWTtZQUNiLDBCQUFXO1lBQ0ksUUFBUTtZQUNaLE1BQU07WUFDbEIsaUJBQVU7WUFDWCwrQkFBWTtPQTNCMUIsYUFBYSxDQTg1QnZCO0lBQUQsb0JBQUM7Q0E5NUJILEFBODVCRyxJQUFBO0FBOTVCVSxzQ0FBYSIsImZpbGUiOiJhcHAvaG9tZS9ob21lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE1vZHVsZSwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9fbW9kZWxzL3VzZXJcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vX3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZW50ZW5jZVNlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvc2VudGVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDbGlja1NlcnZpY2UgfSBmcm9tICcuLi9fc2VydmljZXMvY2xpY2suc2VydmljZSc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy9maWxlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHsgV0lORE9XIH0gZnJvbSBcIi4uL19zZXJ2aWNlcy93aW5kb3cuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6ICdob21lLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgSHR0cE1vZHVsZSBdLFxuICAgIHN0eWxlVXJsczogWydob21lLmNvbXBvbmVudC5jc3MnXSxcbiAgICBhbmltYXRpb25zOltcbiAgICAgICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcbiAgICAgICAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgICAgICBsZWZ0OiBcIi00NTBweFwiXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnb3V0Jywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnNDUwcHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdpbiA9PiBvdXQnLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ291dCA9PiBpbicsIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JykpXG4gICAgICAgIF0pXG4gICAgXVxuXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBjdXJyZW50VXNlcjogVXNlcjtcbiAgICBjdXJyZW50VXNlck5hbWU6IHN0cmluZztcbiAgICB1c2VyczogVXNlcltdID0gW107XG4gICAgY29kZUZyb21TZXJ2ZXI6IHN0cmluZztcbiAgICBhcmNoaXZlU3RyaW5nOiBzdHJpbmc7XG4gICAgcGRmOmFueTtcbiAgICBpc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHBkZlNyYzogc3RyaW5nID0gXCJcIjtcbiAgICBudW1PZk5ld1NlbnRlbmNlczogbnVtYmVyID0gMDtcbiAgICBuZXdTZW50ZW5jZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHpvb21MZXZlbDogbnVtYmVyID0gMC44O1xuXG4gICAgbWVudVN0YXRlOiBzdHJpbmcgPSBcImluXCI7XG4gICAgc2hvd0xhc3RGaWxlOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxuICAgICAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgc2VudGVuY2VTZXJ2aWNlOiBTZW50ZW5jZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2xpY2tTZXJ2aWNlOiBDbGlja1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZVNlcnZpY2U6IEZpbGVTZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChXSU5ET1cpIHByaXZhdGUgd2luZG93OiBXaW5kb3csXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuXG5cbiAgICApe1xuXG4gICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnNlbnRlbmNlTnVtJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1dXRlIGxhdXNldGUgYXJ2IC0+IFwiLCB2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMubnVtT2ZOZXdTZW50ZW5jZXMgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UuaXNOZXdTZW5BY3RpdmUkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImthcyBuZXcgc2VudGVuY2Ugb24gYWN0aXZlIC0+IFwiLCB2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMubmV3U2VudGVuY2UgPSB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5maWxlU2VydmljZS5maWxlU3JjJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YUZyb21TZXJ2ZXIodmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS56b29tTGV2ZWwkLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvb21MZXZlbCA9IHZhbHVlO1xuICAgICAgICB9KVxuICAgICB9XG4gICAgIC8qQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpzY3JvbGxcIiwgW10pXG4gICAgIG9uV2luZG93U2Nyb2xsKCl7XG4gICAgICAgICBsZXQgbnVtYmVyID0gdGhpcy53aW5kb3cucGFnZVlPZmZzZXQgfHwgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcblxuICAgICB9Ki9cblxuICAgIGNyZWF0ZUhlYWRlcnMoaGVhZGVyczogSGVhZGVycyl7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpe1xuICAgICAgICB0aGlzLmxvYWRBbGxVc2VycygpO1xuICAgICAgICB0aGlzLnVzZXJEYXRhKCk7XG4gICAgICAgIHRoaXMubGFzdEZpbGUoKTtcbiAgICAgICAgaWYod2luZG93LnNjcmVlbi53aWR0aCA8PSA3Njgpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ6b29tbGV2ZWwgYmVmb3JlIGFzc2lnbm1lbnQgLT4gXCIsIHRoaXMuem9vbUxldmVsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93IGlzIHNtYWxsZXIgdGhhbiA3NjhcIik7XG4gICAgICAgICAgICB0aGlzLnpvb21MZXZlbCA9IDAuODtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiem9vbWxldmVsIGFmdGVyIGFzc2lnbm1lbnQgLT4gXCIsIHRoaXMuem9vbUxldmVsKVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgdXNlckRhdGEoKXtcbiAgICAgICAgdmFyIGlkOiBzdHJpbmcgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldEJ5SWQoaWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UuYWRkVXNlclRvU2Vzc2lvbihkYXRhLnVzZXJuYW1lKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpdmF0ZSBsYXN0RmlsZSgpe1xuICAgICAgICB2YXIgaWQ6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlckxhc3RGaWxlKGlkKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLmxlbmd0aCAhPSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMYXN0RmlsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wZGZTcmMgPSBcInRtcC9cIitkYXRhK1wiLnBkZlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMYXN0RmlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIHRyeVRvZ2dsZSgpe1xuICAgICAgICB0aGlzLmNsaWNrU2VydmljZS5vcGVuQXJjaGl2ZSgpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRBbGxVc2Vycygpe1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy51c2VycyA9IGRhdGEpXG4gICAgfVxuICAgIHVwbG9hZGVkKGV2ZW50KXtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIG1lYW5zIHRoYXQgdXBsb2FkIGlzIGNvbXBsZXRlIVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICB2YXIgaWQ6IHN0cmluZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuYWRkVXNlckxhc3RGaWxlKGlkLCBldmVudCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93TGFzdEZpbGUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YUZyb21TZXJ2ZXIoZXZlbnQpO1xuICAgIH1cbiAgICBsb2FkRGF0YUZyb21TZXJ2ZXIoZmlsZW5hbWU6IHN0cmluZyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZERhdGFGcm9tU2VydmVyIHRyaWdnZXJlZFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2dldHVwbG9hZCcse2ZpbGVuYW1lOiBmaWxlbmFtZX0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmpzb24oKS51cmwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBkZlNyYyA9IGRhdGEuanNvbigpLnVybDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgYWZ0ZXJMb2FkQ29tcGxldGUocGRmOiBQREZEb2N1bWVudFByb3h5KSB7XG4gICAgICAgIHRoaXMucGRmID0gcGRmO1xuICAgICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KXtcblxuICAgICAgICB2YXIgdGFyZ2V0VGV4dDogc3RyaW5nO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHzCoGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgaWYodGFyZ2V0LmlubmVyVGV4dCAhPSBudWxsKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5uZXIgdGV4dCBlaSBvbGUgbnVsbFwiKTtcbiAgICAgICAgICAgIHRhcmdldFRleHQgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlubmVyIHRleHQgb24gbnVsbCFcIik7XG4gICAgICAgICAgICB0YXJnZXRUZXh0ID0gXCJudWxsXCI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYodGFyZ2V0LnRhZ05hbWUgPT09IFwiU1BBTlwiKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0tFRCBFTEVNRU5UIElTIElOIFNQQU4hXCIpO1xuICAgICAgICAgICAgLyp2YXIgdGV4dCA9IHRhcmdldC5pbm5lckhUTUw7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50Tm9kZS5pbm5lckhUTUwgPSB0ZXh0OyovXG4gICAgICAgICAgICB2YXIgaG9sZGVyID0gdGFyZ2V0LnBhcmVudE5vZGUuaW5uZXJIVE1MO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgdGFyZ2V0VGV4dCA9IHRhcmdldC5pbm5lckhUTUw7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0UGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUuaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0YXJnZXQtcGFyZW50IC0+IFwiLCB0YXJnZXRQYXJlbnQpO1xuICAgICAgICAgICAgdmFyIGFsbEluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICB2YXIgZW5kUXVvdGVNYXJrU3VtOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgdmFyIHFNYXJrSW5kZXhlcyA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0UGFyZW50LCAnPycpO1xuICAgICAgICAgICAgdmFyIGVNYXJrSW5kZXhlcyA9IHRoaXMuaW5kZXhGaW5kZXIodGFyZ2V0UGFyZW50LCAnIScpO1xuICAgICAgICAgICAgdmFyIGRvdEluZGV4ZXNUZXN0ID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRQYXJlbnQsICcuJyk7XG4gICAgICAgICAgICB2YXIgcXVvdGVJbmRleGVzID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRQYXJlbnQsICdcIicpO1xuICAgICAgICAgICAgdmFyIGZpcnN0QWxwaGFiZXRpY2FsSW5kZXggPSB0YXJnZXRQYXJlbnQuaW5kZXhPZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0YXJnZXRQYXJlbnQpKTtcbiAgICAgICAgICAgIGFsbEluZGV4ZXMgPSBxTWFya0luZGV4ZXMuY29uY2F0KGVNYXJrSW5kZXhlcywgZG90SW5kZXhlc1Rlc3QpO1xuICAgICAgICAgICAgYWxsSW5kZXhlcyA9IGFsbEluZGV4ZXMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG5cbiAgICAgICAgICAgIGlmKGFsbEluZGV4ZXMubGVuZ3RoICE9IDApe1xuICAgICAgICAgICAgICAgIGFsbEluZGV4ZXMgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhhbGxJbmRleGVzLCB0YXJnZXRQYXJlbnQpO1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleGVzVGVzdCwgdGFyZ2V0UGFyZW50KTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZW1vdmVJbmRleGVzIGhlcmUgLT4gXCIsIHJlbW92ZUluZGV4ZXMpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJNw6Rya2lkZSBhcnJheSBwZWFsZSBrb250cm9sbGkgLT4gXCIsIGFsbEluZGV4ZXMpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDbGlja2l0YXZhIHPDtW5hL2tvaGEgaW5kZXggLT4gXCIsIHJhbmdlLnN0YXJ0T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBpZihhbGxJbmRleGVzLmxlbmd0aCA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxsSW5kZXhlc1swXSA9PSByZW1vdmVJbmRleGVzWzBdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbEluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1cIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBhbGxJbmRleGVzID0gYWxsSW5kZXhlcy5maWx0ZXIoKHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGSUxURVIgRlVOOiB4IC0+IFwiLCB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGSUxURVIgRlVOOiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgLT4gXCIsIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlSW5kZXhlcy5pbmRleE9mKHgpIDwgMDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhbGxJbmRleGVzIHBlYWxlIGZpbHRlcml0IC0+IFwiLCBhbGxJbmRleGVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy92YXIgd29yZFN0YXJ0SW5kZXggPSByYW5nZS5zdGFydE9mZnNldDtcbiAgICAgICAgICAgIHZhciB3b3JkU3RhcnRJbmRleCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuICAgICAgICAgICAgdmFyIGVuZFF1b3RlTWFya1N1bSA9IGFsbEluZGV4ZXMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTUEFOIFJFTU9WQUw6IGFsbEluZGV4ZXMgLT4gXCIsIGFsbEluZGV4ZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTUEFOIFJFTU9WQUw6IGVuZFF1b3RlTWFya1N1bSAtPiBcIiwgZW5kUXVvdGVNYXJrU3VtKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1BBTiBSRU1PVkFMOiB3b3JkU3RhcnRJbmRleCAtPiBcIiwgcmFuZ2Uuc3RhcnRPZmZzZXQpO1xuXG4gICAgICAgICAgICBpZihlbmRRdW90ZU1hcmtTdW0gPT09IDApe1xuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkgPT0gdGFyZ2V0VGV4dC5jaGFyQXQoZmlyc3RBbHBoYWJldGljYWxJbmRleCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGxhdXNlID0gdGhpcy5sb29rRm9yd2FyZChldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhmaXJzdEFscGhhYmV0aWNhbEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcndhcmRUZXh0ID0gcGFyZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmlubmVySFRNTCA9IGZvcndhcmRUZXh0LnJlcGxhY2UoLzxcXC8/c3BhbltePl0qPi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtb3ZhbExhdXNlID0gdGhpcy5sb29rRm9yd2FyZEFuZFJlbW92ZShwYXJlbnQubmV4dEVsZW1lbnRTaWJsaW5nLCBcInJhbmRvbSBoZXRrZWxcIik7XG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlICA9IG5ldyBSZWdFeHAoZm9yd2FyZFRleHQsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy90YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKC88P3NwYW5bXj5dKj4vLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrZm9yd2FyZFRleHQrXCI8L3NwYW4+XCIpO1xuXG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlIHN0YXRlbWVudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVsc2Ugc3RhdGVtZW50IHBhcmVudCAtPiBcIiwgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdXNlVGFnYXNpID0gdGhpcy5sb29rQmFja0FuZFJlbW92ZShwYXJlbnQucHJldmlvdXNFbGVtZW50U2libGluZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXVzZUVkYXNpID0gdGhpcy5sb29rRm9yd2FyZEFuZFJlbW92ZShwYXJlbnQubmV4dEVsZW1lbnRTaWJsaW5nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgLyp2YXIgdGVzdCA9IGxhdXNlVGFnYXNpICsgXCIgXCIgKyB0YXJnZXRUZXh0ICsgXCIgXCIgKyBsYXVzZUVkYXNpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YSh0ZXN0KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9yd2FyZFRleHQgPSB0YXJnZXQuaW5uZXJUZXh0LnN1YnN0cmluZygwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlICA9IG5ldyBSZWdFeHAoZm9yd2FyZFRleHQsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKTsqL1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IHBhcmVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWxzZSBzdGF0ZW1lbnQgZm9yd2FyZFRleHQgLT4gXCIsIGZvcndhcmRUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmlubmVySFRNTCA9IGZvcndhcmRUZXh0LnJlcGxhY2UoLzxcXC8/c3BhbltePl0qPi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlbmRRdW90ZU1hcmtTdW0gPT09IDEpe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBTEdPUiBmbjogaW5kZXhBcnJheXMgb24gYWludWx0IDEgbcOkcmshXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1BBTjogc2lpbiBvbiBhaW51bHQgMSBsYXVzZSBtw6Rya1wiKTtcbiAgICAgICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdIDwgd29yZFN0YXJ0SW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRJbm5lciA9IHRhcmdldC5pbm5lclRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmlubmVySFRNTCA9IHBhcmVudElubmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va0ZvcndhcmRBbmRSZW1vdmUocGFyZW50Lm5leHRFbGVtZW50U2libGluZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGFsbEluZGV4ZXNbMF0gPiB3b3JkU3RhcnRJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5ERVggT04gVsOESUtTRU0gS1VJIFBVTktUIVwiKTtcblxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXRUZXh0LmNoYXJBdCgwKSA9PSB0YXJnZXRUZXh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRJbm5lciA9IHRhcmdldC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gcGFyZW50SW5uZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVFVMRU4gU0lJQSBTSVNTRVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRJbm5lciA9IHRhcmdldC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gcGFyZW50SW5uZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tCYWNrQW5kUmVtb3ZlKHBhcmVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZW5kUXVvdGVNYXJrU3VtID49IDIpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1BBTiBSRU1PVkFMOiByb2hrZW0ga3VpIGtha3MgbGF1c2Vsw7VwdW3DpHJraSFcIik7XG4gICAgICAgICAgICAgICAgdmFyIGlzQmV0d2VlbkluZGV4ZXNMZW5ndGggPSB0aGlzLmlzQmV0d2VlbkluZGV4ZXMod29yZFN0YXJ0SW5kZXgsIGFsbEluZGV4ZXMpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBTUEFOOiBJc0JldHdlZW5JbmRleGVzTGVuZ3RoIC0+IFwiLCBpc0JldHdlZW5JbmRleGVzTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdCA9IHRoaXMuaXNCZXR3ZWVuSW5kZXhlcyh3b3JkU3RhcnRJbmRleCwgYWxsSW5kZXhlcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTUEFOOiBJc0JldHdlZW5JbmRleGVzQXJyYXkgLT4gXCIsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2hhdCFcIik7XG5cbiAgICAgICAgICAgICAgICAvL01lYW5zIHRoYXQgc2VudGVuY2UgaXMgYmV0d2VlbiB0d28gZG90cyBpbiBibG9ja1xuICAgICAgICAgICAgICAgIGlmKGlzQmV0d2VlbkluZGV4ZXNMZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGV4dCBiZWZvcmUgc3Vic3RyaW5nIC0+IFwiLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRleHQgYWZ0ZXIgc3Vic3RyaW5nIC0+IFwiLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNQQU4gUkVNT1ZBTDogdGFyZ2V0IC0+IFwiLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAvL3ZhciByZSA9IG5ldyBSZWdFeHAoKVxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gcGFyZW50LmlubmVySFRNTC5yZXBsYWNlKClcblxuXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9PT0gMSAmJiBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdID4gd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdGFndXJwaWRpIHJla3Vyc2lvb25cbiAgICAgICAgICAgICAgICAgICAgaWYoIWV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKGxhdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK3JlcGxhY2VTdHJpbmcrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyp0YXJnZXQuaW5uZXJIVE1MID0gXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDogeWVsbG93Jz5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L3NwYW4+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpOyovXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tCYWNrKGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VTdHJpbmcgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXBsYWNlU3RyaW5nLCBcImdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKnRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpc0JldHdlZW5JbmRleGVzTGVuZ3RoID09PSAxICYmIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gPCB3b3JkU3RhcnRJbmRleCl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9lZGFzcGlkaSByZWt1cnNpb29uXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzaWluIG9uIHZlYSBrb2h0ICEhISFcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXBsYWNlU3RyaW5nLCBcImdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIityZXBsYWNlU3RyaW5nICsgXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tGb3J3YXJkKGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcblxuXG5cbiAgICAgICAgfS8vRU5EIE9GIFJFTU9WQUwgUEFSVFxuXG4gICAgICAgIHZhciBhbGxJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICB2YXIgZW5kUXVvdGVNYXJrU3VtOiBudW1iZXIgPSAwO1xuXG5cbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIHZhciBub2RlID0gc2VsZWN0aW9uLmFuY2hvck5vZGU7XG5cblxuICAgICAgICB2YXIgcU1hcmtJbmRleGVzID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRUZXh0LCAnPycpO1xuICAgICAgICB2YXIgZU1hcmtJbmRleGVzID0gdGhpcy5pbmRleEZpbmRlcih0YXJnZXRUZXh0LCAnIScpO1xuICAgICAgICB2YXIgZG90SW5kZXhlc1Rlc3QgPSB0aGlzLmluZGV4RmluZGVyKHRhcmdldFRleHQsICcuJyk7XG4gICAgICAgIHZhciBxdW90ZUluZGV4ZXMgPSB0aGlzLmluZGV4RmluZGVyKHRhcmdldFRleHQsICdcIicpO1xuICAgICAgICB2YXIgZmlyc3RBbHBoYWJldGljYWxJbmRleCA9IHRhcmdldFRleHQuaW5kZXhPZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0YXJnZXRUZXh0KSk7XG5cblxuICAgICAgICBhbGxJbmRleGVzID0gcU1hcmtJbmRleGVzLmNvbmNhdChlTWFya0luZGV4ZXMsIGRvdEluZGV4ZXNUZXN0KTtcbiAgICAgICAgYWxsSW5kZXhlcyA9IGFsbEluZGV4ZXMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJCRUZPUkUgQUxHTzogRmlyc3QgYWxwaGFiZXRpY2FsIGxldHRlciBpbiBhIHN0cmluZyAtPiBcIiwgdGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQkVGT1JFIEFMR086IEZpcnN0IGFscGhhYmV0aWNhbCBsZXR0ZXIgaW5kZXggLT4gXCIsIFwiYmFja2dyb3VuZDojMjIyO1wiICx0YXJnZXRUZXh0LmluZGV4T2YodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpKTtcblxuICAgICAgICBpZihhbGxJbmRleGVzLmxlbmd0aCAhPSAwKXtcbiAgICAgICAgICAgIGFsbEluZGV4ZXMgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhhbGxJbmRleGVzLCB0YXJnZXRUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleGVzVGVzdCwgdGFyZ2V0VGV4dCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZW1vdmVJbmRleGVzIGhlcmUgLT4gXCIsIHJlbW92ZUluZGV4ZXMpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk3DpHJraWRlIGFycmF5IHBlYWxlIGtvbnRyb2xsaSAtPiBcIiwgYWxsSW5kZXhlcyk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2xpY2tpdGF2YSBzw7VuYS9rb2hhIGluZGV4IC0+IFwiLCByYW5nZS5zdGFydE9mZnNldCk7XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzLmxlbmd0aCA9PSAxKXtcbiAgICAgICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdID09IHJlbW92ZUluZGV4ZXNbMF0pe1xuICAgICAgICAgICAgICAgICAgICBhbGxJbmRleGVzID0gW107XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFsbEluZGV4ZXMgPSBhbGxJbmRleGVzLmZpbHRlcigoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRklMVEVSIEZVTjogeCAtPiBcIiwgeCk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGSUxURVIgRlVOOiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgLT4gXCIsIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmVJbmRleGVzLmluZGV4T2YoeCkgPCAwO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFsbEluZGV4ZXMgcGVhbGUgZmlsdGVyaXQgLT4gXCIsIGFsbEluZGV4ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdvcmRTdGFydEluZGV4ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgICAgIHZhciBlbmRRdW90ZU1hcmtTdW0gPSBhbGxJbmRleGVzLmxlbmd0aDtcblxuXG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA9PT0gMCl7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZmluZEZpcnN0QWxwaGFiZXRpY2FsKHRhcmdldFRleHQpID09IHRhcmdldFRleHQuY2hhckF0KGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJsYXVzZWzDtXB1bcOkcmtlIG9uIGJsb2tpcyAwIGphIGFsZ3VzdMOkaHQgb24gc3V1ciFcIik7XG4gICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gdGhpcy5sb29rRm9yd2FyZChldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhmaXJzdEFscGhhYmV0aWNhbEluZGV4KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IHRhcmdldC5pbm5lclRleHQuc3Vic3RyaW5nKDApO1xuICAgICAgICAgICAgICAgIHZhciByZSAgPSBuZXcgUmVnRXhwKGZvcndhcmRUZXh0LCBcImdcIik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIlY1wiK2xhdXNlLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF1c2VUYWdhc2kgPSB0aGlzLmxvb2tCYWNrKGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF1c2VFZGFzaSA9IHRoaXMubG9va0ZvcndhcmQoZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3QgPSBsYXVzZVRhZ2FzaSArIFwiIFwiICsgdGFyZ2V0VGV4dCArIFwiIFwiICsgbGF1c2VFZGFzaTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YSh0ZXN0KTtcblxuICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IHRhcmdldC5pbm5lclRleHQuc3Vic3RyaW5nKDApO1xuICAgICAgICAgICAgICAgIHZhciByZSAgPSBuZXcgUmVnRXhwKGZvcndhcmRUZXh0LCBcImdcIik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIlY1wiK3Rlc3QsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA9PT0gMSl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQUxHT1IgZm46IGluZGV4QXJyYXlzIG9uIGFpbnVsdCAxIG3DpHJrIVwiKTtcbiAgICAgICAgICAgIGlmKGFsbEluZGV4ZXNbMF0gPCB3b3JkU3RhcnRJbmRleCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSB0aGlzLmxvb2tGb3J3YXJkKGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKGFsbEluZGV4ZXNbMF0rMSkpXG4gICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEobGF1c2UpO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSsxKTtcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKHJlcGxhY2VTdHJpbmcsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgLyp0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSsxKSArIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgK1xuICAgICAgICAgICAgICAgIHRhcmdldFRleHQuc3Vic3RyaW5nKGFsbEluZGV4ZXNbMF0rMSkgKyBcIjwvc3Bhbj5cIjsqL1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihhbGxJbmRleGVzWzBdID4gd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0VGV4dC5jaGFyQXQoMCkgPT0gdGFyZ2V0VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1dXJlQWxndXNlZ2EgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW50ZW5jZVNlcnZpY2UucHVibGlzaERhdGEoc3V1cmVBbGd1c2VnYSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8qdGFyZ2V0LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiVjXCIgKyBzdXVyZUFsZ3VzZWdhLCBcImJhY2tncm91bmQ6ICMyMjIgOyBjb2xvcjogI2JhZGE1NVwiKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0JhY2soZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGFsbEluZGV4ZXNbMF0rMSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgYWxsSW5kZXhlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVwbGFjZVN0cmluZywgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrcmVwbGFjZVN0cmluZytcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8qdGFyZ2V0LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6IHllbGxvdyc+XCIgKyB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBhbGxJbmRleGVzWzBdKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoYWxsSW5kZXhlc1swXSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGVuZFF1b3RlTWFya1N1bSA+PSAyKXtcblxuICAgICAgICAgICAgdmFyIGlzQmV0d2VlbkluZGV4ZXNMZW5ndGggPSB0aGlzLmlzQmV0d2VlbkluZGV4ZXMod29yZFN0YXJ0SW5kZXgsIGFsbEluZGV4ZXMpLmxlbmd0aDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJJc0JldHdlZW5JbmRleGVzTGVuZ3RoIC0+IFwiLCBpc0JldHdlZW5JbmRleGVzTGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBpc0JldHdlZW5JbmRleGVzUmVzdWx0ID0gdGhpcy5pc0JldHdlZW5JbmRleGVzKHdvcmRTdGFydEluZGV4LCBhbGxJbmRleGVzKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJJc0JldHdlZW5JbmRleGVzQXJyYXkgLT4gXCIsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHQpO1xuXG5cbiAgICAgICAgICAgIC8vTWVhbnMgdGhhdCBzZW50ZW5jZSBpcyBiZXR3ZWVuIHR3byBkb3RzIGluIGJsb2NrXG4gICAgICAgICAgICBpZihpc0JldHdlZW5JbmRleGVzTGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGV4dCBiZWZvcmUgc3Vic3RyaW5nIC0+IFwiLCB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGV4dCBhZnRlciBzdWJzdHJpbmcgLT4gXCIsIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMV0rMSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJjaGl2ZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gKyAxLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzFdKzEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKHRoaXMuYXJjaGl2ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmFyY2hpdmVTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSArIDEsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMV0gKyAxKTtcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKHJlcGxhY2VTdHJpbmcsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgcmVwbGFjZVN0cmluZyArIFwiPC9zcGFuPlwiKTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0JldHdlZW5JbmRleGVzTGVuZ3RoID09PSAxICYmIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0gPiB3b3JkU3RhcnRJbmRleCl7XG5cbiAgICAgICAgICAgICAgICAvL3RhZ3VycGlkaSByZWt1cnNpb29uXG4gICAgICAgICAgICAgICAgaWYoIWV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF1c2UgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlU3RyaW5nID0gdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXBsYWNlU3RyaW5nLCBcImdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5pbm5lckhUTUwgPSB0YXJnZXQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIityZXBsYWNlU3RyaW5nK1wiPC9zcGFuPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgLyp0YXJnZXQuaW5uZXJIVE1MID0gXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDogeWVsbG93Jz5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsIGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSkgK1xuICAgICAgICAgICAgICAgICAgICBcIjwvc3Bhbj5cIiArIHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXVzZSA9IHRoaXMubG9va0JhY2soZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIHRhcmdldFRleHQuc3Vic3RyaW5nKDAsaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VudGVuY2VTZXJ2aWNlLnB1Ymxpc2hEYXRhKGxhdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VTdHJpbmcgPSB0YXJnZXRUZXh0LnN1YnN0cmluZygwLCBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKHJlcGxhY2VTdHJpbmcsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK3JlcGxhY2VTdHJpbmcrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgICAgICAvKnRhcmdldC5pbm5lckhUTUwgPSBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOiB5ZWxsb3cnPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoMCwgaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKSArXG4gICAgICAgICAgICAgICAgICAgIFwiPC9zcGFuPlwiICsgdGFyZ2V0VGV4dC5zdWJzdHJpbmcoaXNCZXR3ZWVuSW5kZXhlc1Jlc3VsdFswXSsxKTsqL1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiJWNcIitsYXVzZSwgXCJiYWNrZ3JvdW5kOiAjMjIyIDsgY29sb3I6ICNiYWRhNTVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNCZXR3ZWVuSW5kZXhlc0xlbmd0aCA9PT0gMSAmJiBpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdIDwgd29yZFN0YXJ0SW5kZXgpe1xuXG4gICAgICAgICAgICAgICAgLy9lZGFzcGlkaSByZWt1cnNpb29uXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInNpaW4gb24gdmVhIGtvaHQgISEhIVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVN0cmluZyA9IHRhcmdldFRleHQuc3Vic3RyaW5nKGlzQmV0d2VlbkluZGV4ZXNSZXN1bHRbMF0rMSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXBsYWNlU3RyaW5nLCBcImdcIik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IHRhcmdldC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK3JlcGxhY2VTdHJpbmcgKyBcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgdmFyIGxhdXNlID0gdGhpcy5sb29rRm9yd2FyZChldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLCB0YXJnZXRUZXh0LnN1YnN0cmluZyhpc0JldHdlZW5JbmRleGVzUmVzdWx0WzBdKzEpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnRlbmNlU2VydmljZS5wdWJsaXNoRGF0YShsYXVzZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiVjXCIrbGF1c2UsIFwiYmFja2dyb3VuZDogIzIyMiA7IGNvbG9yOiAjYmFkYTU1XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9va0ZvcndhcmRBbmRSZW1vdmUobmV4dEJsb2NrLCBidWlsZGVyOnN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIG5leHQgPSBuZXh0QmxvY2s7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgLT5cIiwgbmV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgaW5uZXJUZXh0IC0+IFwiLCBuZXh0LmlubmVyVGV4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxvY2sgcXVvdGUgbWFya3MgLT5cIiwgdGhpcy5jb3VudE1hcmtzKG5leHQuaW5uZXJIVE1MLCAnW1xcXFwuXFxcXD9cXFxcIV0nKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY291bnQgbWFya3MgYm9vbGVhbiAtPiBcIiwgdGhpcy5jb3VudE1hcmtzKG5leHQuaW5uZXJIVE1MLCAnW1xcXFwuXFxcXD9cXFxcIV0nKSA+IDApO1xuICAgICAgICBpZih0aGlzLmNvdW50TWFya3MobmV4dC5pbm5lckhUTUwsICdbXFxcXC5cXFxcP1xcXFwhXScpID4gMCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInR1bGViIGNvdW50IG1hcmtzaSBzaXNzZSBcIik7XG4gICAgICAgICAgICB2YXIgZG90SW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihuZXh0LmlubmVyVGV4dCwgJy4nKTtcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbkluZGV4OiBudW1iZXJbXSA9IHRoaXMuaW5kZXhGaW5kZXIobmV4dC5pbm5lclRleHQsICc/Jyk7XG4gICAgICAgICAgICB2YXIgZXhjbEluZGV4OiBudW1iZXJbXSA9IHRoaXMuaW5kZXhGaW5kZXIobmV4dC5pbm5lclRleHQsICchJyk7XG4gICAgICAgICAgICB2YXIgaW5kZXhlc0ZvckNoZWNrOiBudW1iZXJbXSA9IGRvdEluZGV4LmNvbmNhdChxdWVzdGlvbkluZGV4LCBleGNsSW5kZXgpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRk9SV0FSRCBSRUs6IGluZGV4ZXNGb3JDaGVjayAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKTtcblxuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gaW5kZXhlc0ZvckNoZWNrLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gdGhpcy5jaGVja0FiYnJldmlhdGlvbnMoaW5kZXhlc0ZvckNoZWNrLCBuZXh0LmlubmVyVGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSW5kZXhlcyA9IHRoaXMuY2hlY2tOdW0oZG90SW5kZXgsIG5leHQuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYoaW5kZXhlc0ZvckNoZWNrLmxlbmd0aCA9PSAwKXtcblxuICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IG5leHQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIG5leHQuaW5uZXJIVE1MID0gZm9yd2FyZFRleHQucmVwbGFjZSgvPFxcLz9zcGFuW14+XSo+LywgXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmQobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIFwic3V2YWFzaVwiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0ZWtzdGlzIG9uIHB1bmt0IHbDtWkgdmFoZW3DpHJrXCIpO1xuICAgICAgICAgICAgICAgIHZhciBzcGFucyA9IG5leHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBpZihzcGFucy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXh0IHNwYW5zIC0+IFwiLCBzcGFucyk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChzcGFuc1swXS5vdXRlckhUTUwsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICBuZXh0LmlubmVySFRNTCA9IG5leHQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIHNwYW5zWzBdLmlubmVyVGV4dCk7XG4gICAgICAgICAgICAgICAgLyp2YXIgZm9yd2FyZFRleHQgPSBuZXh0LmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgaW5kZXhlc0ZvckNoZWNrWzBdKzEpO1xuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoZm9yd2FyZFRleHQsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZWRhc2kgcmVrdXJzaW9vbmkgcmVndWxhciBleHByZXNzaW9uIC0+IFwiLCByZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVkYXNpIHJla3Vyc2lvb25pcyBmb3J3YXJkVGV4dCAtPiBcIiwgZm9yd2FyZFRleHQpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlZGFzaSByZWt1cnNpb29uIHDDpHJhc3QgcmVwbGFjZSBpbm5lckhUTUwgLT4gXCIsIG5leHQuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIitmb3J3YXJkVGV4dCtcIjwvc3Bhbj5cIikpO1xuICAgICAgICAgICAgICAgIG5leHQuaW5uZXJIVE1MID0gbmV4dC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKTsqL1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInB1dWR1dmFkIGxhdXNlbMO1cHVtw6RyZ2lkIHJla3Vyc2lvb25pcyEgTmV4dCBibG9jayAtPiBcIiwgbmV4dC5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgICAgICAgICAgdmFyIGZvcndhcmRUZXh0ID0gbmV4dC5pbm5lckhUTUw7XG5cbiAgICAgICAgICAgIG5leHQuaW5uZXJIVE1MID0gZm9yd2FyZFRleHQucmVwbGFjZSgvPFxcLz9zcGFuW14+XSo+LywgXCJcIilcbiAgICAgICAgICAgIC8vdGV4dCArPSBcIiBcIiArIG5leHQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmRBbmRSZW1vdmUobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIFwic3V2YWFzaVwiKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIGxvb2tCYWNrQW5kUmVtb3ZlKHByZXZpb3VzQmxvY2ssIGJ1aWxkZXI6IHN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIHByZXYgPSBwcmV2aW91c0Jsb2NrO1xuICAgICAgICBjb25zb2xlLmxvZyhcInByZXYgYmxvY2sgLT4gXCIsIHByZXYpO1xuXG4gICAgICAgIGlmKHRoaXMuY291bnRNYXJrcyhwcmV2LmlubmVySFRNTCwgJ1tcXFxcLlxcXFw/XFxcXCFdJykgPiAwKXtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbm5lclRleHQgLT4gXCIsIHByZXYuaW5uZXJUZXh0KTtcblxuICAgICAgICAgICAgdmFyIGRvdEluZGV4OiBudW1iZXJbXSA9IHRoaXMuaW5kZXhGaW5kZXIocHJldi5pbm5lclRleHQsICcuJyk7XG4gICAgICAgICAgICB2YXIgcXVlc3Rpb25JbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnPycpO1xuICAgICAgICAgICAgdmFyIGV4Y2xJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnIScpO1xuICAgICAgICAgICAgdmFyIGluZGV4ZXNGb3JDaGVjazogbnVtYmVyW10gPSBkb3RJbmRleC5jb25jYXQocXVlc3Rpb25JbmRleCwgZXhjbEluZGV4KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbmRleGVzRm9yQ2hlY2sgLT4gXCIsIGluZGV4ZXNGb3JDaGVjaylcblxuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gaW5kZXhlc0ZvckNoZWNrLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gdGhpcy5jaGVja0FiYnJldmlhdGlvbnMoaW5kZXhlc0ZvckNoZWNrLCBwcmV2LmlubmVyVGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSW5kZXhlcyA9IHRoaXMuY2hlY2tOdW0oZG90SW5kZXgsIHByZXYuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJCQUNLIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbmRleGVzIGFmdGVyIGZpbHRlciAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKTtcblxuICAgICAgICAgICAgaWYoaW5kZXhlc0ZvckNoZWNrLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICB2YXIgYmFja1RleHQgPSBwcmV2LmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICBwcmV2LmlubmVySFRNTCA9IGJhY2tUZXh0LnJlcGxhY2UoLzxcXC8/c3BhbltePl0qPi8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvb2tCYWNrQW5kUmVtb3ZlKHByZXYubmV4dEVsZW1lbnRTaWJsaW5nLCBcInN1dmFhc2lcIik7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHVsZW4gc2lpYSBlbHNlIHN0YXRlbWVudGlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHNwYW5zID0gcHJldi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJldiBzcGFucyAtPiBcIiwgc3BhbnMpO1xuICAgICAgICAgICAgICAgIGlmKHNwYW5zLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGFucyBpcyB6ZXJvXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoc3BhbnNbc3BhbnMubGVuZ3RoLTFdLm91dGVySFRNTCwgXCJnXCIpO1xuICAgICAgICAgICAgICAgIHByZXYuaW5uZXJIVE1MID0gcHJldi5pbm5lckhUTUwucmVwbGFjZShyZSwgc3BhbnNbc3BhbnMubGVuZ3RoLTFdLmlubmVyVGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0VGV4dCA9IHByZXYuaW5uZXJUZXh0O1xuICAgICAgICAgICAgdmFyIGJhY2tUZXh0ID0gcHJldi5pbm5lckhUTUw7XG5cblxuICAgICAgICAgICAgdmFyIGZpcnN0QWxwaGFiZXRpY2FsSW5kZXggPSB0YXJnZXRUZXh0LmluZGV4T2YodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkpO1xuICAgICAgICAgICAgaWYodGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGFyZ2V0VGV4dCkgPT0gdGFyZ2V0VGV4dC5jaGFyQXQoZmlyc3RBbHBoYWJldGljYWxJbmRleCkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgcHJldi5pbm5lckhUTUwgPSBiYWNrVGV4dC5yZXBsYWNlKC88XFwvP3NwYW5bXj5dKj4vLCBcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICBwcmV2LmlubmVySFRNTCA9IGJhY2tUZXh0LnJlcGxhY2UoLzxcXC8/c3BhbltePl0qPi8sIFwiXCIpO1xuICAgICAgICAgICAgLy90ZXh0ICs9IFwiIFwiICsgbmV4dC5pbm5lclRleHQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb29rQmFja0FuZFJlbW92ZShwcmV2LnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIFwic3V2YWFzaVwiKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIGxvb2tGb3J3YXJkKG5leHRCbG9jaywgYnVpbGRlcjogc3RyaW5nKXtcbiAgICAgICAgdmFyIHRleHQgPSBidWlsZGVyO1xuICAgICAgICB2YXIgbmV4dCA9IG5leHRCbG9jaztcblxuICAgICAgICBpZih0aGlzLmNvdW50TWFya3MobmV4dC5pbm5lclRleHQsICdbXFxcXC5cXFxcP1xcXFwhXScpID4gMCl7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogaW5uZXJUZXh0IC0+IFwiLCBuZXh0LmlubmVyVGV4dCk7XG5cbiAgICAgICAgICAgIHZhciBkb3RJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKG5leHQuaW5uZXJUZXh0LCAnLicpO1xuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihuZXh0LmlubmVyVGV4dCwgJz8nKTtcbiAgICAgICAgICAgIHZhciBleGNsSW5kZXg6IG51bWJlcltdID0gdGhpcy5pbmRleEZpbmRlcihuZXh0LmlubmVyVGV4dCwgJyEnKTtcbiAgICAgICAgICAgIHZhciBpbmRleGVzRm9yQ2hlY2s6IG51bWJlcltdID0gZG90SW5kZXguY29uY2F0KHF1ZXN0aW9uSW5kZXgsIGV4Y2xJbmRleCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJGT1JXQVJEIFJFSzogaW5kZXhlc0ZvckNoZWNrIC0+IFwiLCBpbmRleGVzRm9yQ2hlY2spO1xuXG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS1ifSk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSB0aGlzLmNoZWNrQWJicmV2aWF0aW9ucyhpbmRleGVzRm9yQ2hlY2ssIG5leHQuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIHZhciByZW1vdmVJbmRleGVzID0gdGhpcy5jaGVja051bShkb3RJbmRleCwgbmV4dC5pbm5lclRleHQpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkZPUldBUkQgUkVLOiByZW1vdmVJbmRleGVzIC0+IFwiLCByZW1vdmVJbmRleGVzKTtcbiAgICAgICAgICAgIGluZGV4ZXNGb3JDaGVjayA9IGluZGV4ZXNGb3JDaGVjay5maWx0ZXIoKHgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlSW5kZXhlcy5pbmRleE9mKHgpIDwgMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiRk9SV0FSRCBSRUs6IGluZGV4ZXMgYWZ0ZXIgZmlsdGVyIC0+IFwiLCBpbmRleGVzRm9yQ2hlY2spO1xuXG4gICAgICAgICAgICBpZihpbmRleGVzRm9yQ2hlY2subGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgIG5leHQuc3R5bGUuYmFja2dyb3VuZCA9IFwieWVsbG93XCI7XG4gICAgICAgICAgICAgICAgdGV4dCArPSBcIiBcIiArIG5leHQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvb2tGb3J3YXJkKG5leHQubmV4dEVsZW1lbnRTaWJsaW5nLCB0ZXh0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0ZWtzdGlzIG9uIHB1bmt0IHbDtWkgdmFoZW3DpHJrXCIpO1xuICAgICAgICAgICAgICAgIHZhciBmb3J3YXJkVGV4dCA9IG5leHQuaW5uZXJUZXh0LnN1YnN0cmluZygwLCBpbmRleGVzRm9yQ2hlY2tbMF0rMSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChmb3J3YXJkVGV4dCwgXCJnXCIpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlZGFzaSByZWt1cnNpb29uaSByZWd1bGFyIGV4cHJlc3Npb24gLT4gXCIsIHJlKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZWRhc2kgcmVrdXJzaW9vbmlzIGZvcndhcmRUZXh0IC0+IFwiLCBmb3J3YXJkVGV4dCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImVkYXNpIHJla3Vyc2lvb24gcMOkcmFzdCByZXBsYWNlIGlubmVySFRNTCAtPiBcIiwgbmV4dC5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2ZvcndhcmRUZXh0K1wiPC9zcGFuPlwiKSk7XG4gICAgICAgICAgICAgICAgbmV4dC5pbm5lckhUTUwgPSBuZXh0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrZm9yd2FyZFRleHQrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0ICsgXCIgXCIgKyBmb3J3YXJkVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZm9yd2FyZFRleHQgPSBuZXh0LmlubmVyVGV4dC5zdWJzdHJpbmcoMCk7XG4gICAgICAgICAgICB2YXIgcmUgID0gbmV3IFJlZ0V4cChmb3J3YXJkVGV4dCwgXCJnXCIpO1xuICAgICAgICAgICAgbmV4dC5pbm5lckhUTUwgPSBuZXh0LmlubmVySFRNTC5yZXBsYWNlKHJlLCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrZm9yd2FyZFRleHQrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgdGV4dCArPSBcIiBcIiArIG5leHQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9va0ZvcndhcmQobmV4dC5uZXh0RWxlbWVudFNpYmxpbmcsIHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvb2tCYWNrKHByZXZpb3VzQmxvY2ssIGJ1aWxkZXI6IHN0cmluZyl7XG4gICAgICAgIHZhciB0ZXh0ID0gYnVpbGRlcjtcbiAgICAgICAgdmFyIHByZXYgPSBwcmV2aW91c0Jsb2NrO1xuXG4gICAgICAgIGlmKHRoaXMuY291bnRNYXJrcyhwcmV2LmlubmVyVGV4dCwgJ1tcXFxcLlxcXFw/XFxcXCFdJykgPiAwKXtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbm5lclRleHQgLT4gXCIsIHByZXYuaW5uZXJUZXh0KTtcblxuICAgICAgICAgICAgdmFyIGRvdEluZGV4OiBudW1iZXJbXSA9IHRoaXMuaW5kZXhGaW5kZXIocHJldi5pbm5lclRleHQsICcuJyk7XG4gICAgICAgICAgICB2YXIgcXVlc3Rpb25JbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnPycpO1xuICAgICAgICAgICAgdmFyIGV4Y2xJbmRleDogbnVtYmVyW10gPSB0aGlzLmluZGV4RmluZGVyKHByZXYuaW5uZXJUZXh0LCAnIScpO1xuICAgICAgICAgICAgdmFyIGluZGV4ZXNGb3JDaGVjazogbnVtYmVyW10gPSBkb3RJbmRleC5jb25jYXQocXVlc3Rpb25JbmRleCwgZXhjbEluZGV4KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbmRleGVzRm9yQ2hlY2sgLT4gXCIsIGluZGV4ZXNGb3JDaGVjaylcblxuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gaW5kZXhlc0ZvckNoZWNrLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEtYn0pO1xuICAgICAgICAgICAgaW5kZXhlc0ZvckNoZWNrID0gdGhpcy5jaGVja0FiYnJldmlhdGlvbnMoaW5kZXhlc0ZvckNoZWNrLCBwcmV2LmlubmVyVGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSW5kZXhlcyA9IHRoaXMuY2hlY2tOdW0oZG90SW5kZXgsIHByZXYuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJCQUNLIFJFSzogcmVtb3ZlSW5kZXhlcyAtPiBcIiwgcmVtb3ZlSW5kZXhlcyk7XG4gICAgICAgICAgICBpbmRleGVzRm9yQ2hlY2sgPSBpbmRleGVzRm9yQ2hlY2suZmlsdGVyKCh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUluZGV4ZXMuaW5kZXhPZih4KSA8IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkJBQ0sgUkVLOiBpbmRleGVzIGFmdGVyIGZpbHRlciAtPiBcIiwgaW5kZXhlc0ZvckNoZWNrKTtcblxuICAgICAgICAgICAgaWYoaW5kZXhlc0ZvckNoZWNrLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICB2YXIgYmFja1RleHQgPSBwcmV2LmlubmVyVGV4dC5zdWJzdHJpbmcoMCk7XG4gICAgICAgICAgICAgICAgdmFyIHJlICA9IG5ldyBSZWdFeHAoYmFja1RleHQsIFwiZ1wiKTtcbiAgICAgICAgICAgICAgICBwcmV2LmlubmVySFRNTCA9IHByZXYuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIitiYWNrVGV4dCtcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHByZXYuaW5uZXJUZXh0ICsgXCIgXCIgKyB0ZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvb2tCYWNrKHByZXYucHJldmlvdXNFbGVtZW50U2libGluZywgdGV4dCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB2YXIgYmFja1RleHQgPSBwcmV2LmlubmVyVGV4dC5zdWJzdHJpbmcoaW5kZXhlc0ZvckNoZWNrW2luZGV4ZXNGb3JDaGVjay5sZW5ndGgtMV0rMSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChiYWNrVGV4dCwgXCJnXCIpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0YWdhc2kgcmVrdXJzaW9vbmkgcmVndWxhciBleHByZXNzaW9uIC0+IFwiLCByZSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRhZ2FzaSByZWt1cnNpb29uaXMgZm9yd2FyZFRleHQgLT4gXCIsIGJhY2tUZXh0KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGFnYXNpIHJla3Vyc2lvb24gcMOkcmFzdCByZXBsYWNlIGlubmVySFRNTCAtPiBcIiwgcHJldi5pbm5lckhUTUwucmVwbGFjZShyZSwgXCI8c3BhbiBzdHlsZT0nYmFja2dyb3VuZDp5ZWxsb3cnPlwiK2JhY2tUZXh0K1wiPC9zcGFuPlwiKSk7XG4gICAgICAgICAgICAgICAgcHJldi5pbm5lckhUTUwgPSBwcmV2LmlubmVySFRNTC5yZXBsYWNlKGJhY2tUZXh0LCBcIjxzcGFuIHN0eWxlPSdiYWNrZ3JvdW5kOnllbGxvdyc+XCIrYmFja1RleHQrXCI8L3NwYW4+XCIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhY2tUZXh0ICsgXCIgXCIgKyB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBiYWNrVGV4dCA9IHByZXYuaW5uZXJUZXh0LnN1YnN0cmluZygwKTtcbiAgICAgICAgICAgIHZhciByZSAgPSBuZXcgUmVnRXhwKGJhY2tUZXh0LCBcImdcIik7XG4gICAgICAgICAgICBwcmV2LmlubmVySFRNTCA9IHByZXYuaW5uZXJIVE1MLnJlcGxhY2UocmUsIFwiPHNwYW4gc3R5bGU9J2JhY2tncm91bmQ6eWVsbG93Jz5cIitiYWNrVGV4dCtcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICB0ZXh0ID0gcHJldi5pbm5lclRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb29rQmFjayhwcmV2LnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrTnVtKGRvdEluZGV4QXJyYXk6IG51bWJlcltdLCB0ZXh0OiBzdHJpbmcpe1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDSEVDS05VTTogY2hlY2tOdW0gbMOka3Mga8OkaW1hIVwiKTtcblxuICAgICAgICB2YXIgc3BhY2VJbmRleDogbnVtYmVyO1xuICAgICAgICB2YXIgcmV0dXJuSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIgXCIpe1xuICAgICAgICAgICAgICAgIHNwYWNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dC5jaGFyQXQoaSkgPT09IFwiLlwiKXtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGxlaWRpcyDDvGxlc3NlIHB1bmt0aVwiKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IHB1bmt0aXN0IGVlbG1pbmUgY2hhciAtPiBcIiwgdGV4dC5jaGFyQXQoaS0xKSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNIRUNLTlVNOiBrYXMgZWVsbWluZSBvbiBudW1iZXIgLT4gXCIsIHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGktMSkpKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNMZXR0ZXIgPSB0ZXh0LmNoYXJBdChpLTEpO1xuICAgICAgICAgICAgICAgIHZhciBpc0luVGhlRW5kID0gdGhpcy5sb29rRm9yQmlnTGV0dGVyKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkpLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RBbHBoYWJldGljYWxJbmRleCA9IHRleHQuaW5kZXhPZih0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0ZXh0LnN1YnN0cmluZyhpKzEpKSk7XG5cbiAgICAgICAgICAgICAgICAvKmNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IHRleHQgLT4gXCIsIHRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGkgLT4gXCIsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGlzSW5UaGVFbmQgdmFyaWFibGUgLT4gXCIsIGlzSW5UaGVFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IHRleHQuc3Vic3RyaW5nKGkrMSkgLT4gXCIsIHRleHQuc3Vic3RyaW5nKGkrMSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGZpcnN0IGFscGhhYmV0aWNhbCAtPiBcIiwgdGhpcy5maW5kRmlyc3RBbHBoYWJldGljYWwodGV4dC5zdWJzdHJpbmcoaSsxKSkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IHVwcGVyY2FzZSAtPiBcIiwgdGV4dC5jaGFyQXQoZmlyc3RBbHBoYWJldGljYWxJbmRleCkudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDSEVLQ05VTTogdGV4dC5jaGFyQXQoaSsxKSAtPiBcIiwgdGV4dC5jaGFyQXQoaSsxKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDSEVDS05VTTogaXNOdW1lcmljIC0+IFwiLCB0aGlzLmlzTnVtZXJpYyh0ZXh0LmNoYXJBdChpKzEpKSk7Ki9cbiAgICAgICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKzEpID09PSBcIiBcIiAmJiB0aGlzLmZpbmRGaXJzdEFscGhhYmV0aWNhbCh0ZXh0LnN1YnN0cmluZyhpKzEpKSAhPVxuICAgICAgICAgICAgICAgIHRleHQuY2hhckF0KGZpcnN0QWxwaGFiZXRpY2FsSW5kZXgpLnRvVXBwZXJDYXNlKCkpe1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGVpIG9sZSBsYXVzZSBsw7VwdXNcIik7XG4gICAgICAgICAgICAgICAgfWlmKHRoaXMuaXNOdW1lcmljKHRleHQuY2hhckF0KGkrMSkpKXtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInB1bmt0aXN0IGrDpHJnbWluZSBvbiBudW1iZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZGV4ZXMucHVzaChpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKmlmKHRoaXMuaXNOdW1lcmljKHByZXZpb3VzTGV0dGVyKSAmJiB0ZXh0LmNoYXJBdChpKzEpID09PSBcIiBcIiAmJiBpc0luVGhlRW5kKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWUgcHVua3Qgb24gbGF1c2UgbMO1cHVzIGluZGV4IC0+IFwiLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzTnVtZXJpYyhwcmV2aW91c0xldHRlcikgJiYgdGV4dC5jaGFyQXQoaSsxKSA9PT0gXCIgXCIgJiYgaXNJblRoZUVuZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGF1c2Vsw7VwdSBwdW5rdCB0w6RoZWdhIGtvb3MgLT4gXCIsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ0hFQ0tOVU06IGNoZWNrbnVtaXN0IHRhZ2FzdGF0YXZhZCBlZW1hbGRhbWlzZWxlIG1pbmV2YWQgaW5kZXhpZCAtPiBcIiwgcmV0dXJuSW5kZXhlcyk7XG4gICAgICAgIHJldHVybiByZXR1cm5JbmRleGVzO1xuICAgIH1cbiAgICBpc051bWVyaWModmFsdWU6IGFueSl7XG4gICAgICAgIHJldHVybiAhaXNOYU4odmFsdWUgLXBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9XG4gICAgY2hlY2tBYmJyZXZpYXRpb25zKGluZGV4QXJyYXk6IG51bWJlcltdLCB0ZXh0OiBzdHJpbmcpe1xuICAgICAgICB2YXIgc3BhY2VJbmRleDogbnVtYmVyO1xuICAgICAgICB2YXIgcmV0dXJuSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgdmFyIHNwYWNlSW5kZXhBcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZih0ZXh0LmNoYXJBdChpKSA9PT0gXCIgXCIpe1xuICAgICAgICAgICAgICAgIHNwYWNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dC5jaGFyQXQoaSkgPT09IFwiLlwiIHx8IHRleHQuY2hhckF0KGkpID09PSBcIj9cIiB8fCB0ZXh0LmNoYXJBdChpKSA9PT0gXCIhXCIpe1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFCUiBmbjogY2hhciBrb2hhbCBpIG9uIC0+IFwiLCB0ZXh0LmNoYXJBdChpKSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkFCUiBmbjogZWVsbWlzZXN0IHTDvGhpa3VzdCBrdW5pIHB1bmt0aW5pIC0+IFwiLFxuICAgICAgICAgICAgICAgIC8vdGV4dC5zdWJzdHJpbmcoc3BhY2VJbmRleCwgaSsxKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWVtb3J5Q2hlY2tOYW1lOiBib29sZWFuID1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTWVtb3J5TmFtZUFiKHRleHQuc3Vic3RyaW5nKHNwYWNlSW5kZXgsIGkrMSkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgdmFyIG1lbW9yeUNoZWNrRW5kOiBib29sZWFuID1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTWVtb3J5T3RoZXIodGV4dC5zdWJzdHJpbmcoc3BhY2VJbmRleCwgaSsxKS50b0xvd2VyQ2FzZSgpLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQUJSIGZuOiBuYW1lQ2hlY2tGbiByZXN1bHQgLT4gXCIsIG1lbW9yeUNoZWNrTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZighbWVtb3J5Q2hlY2tOYW1lICYmICFtZW1vcnlDaGVja0VuZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJBQlIgZm46IHRhZ2FzdGF0YXZhZCBpbmRleGlkIC0+IFwiLCByZXR1cm5JbmRleGVzKTtcbiAgICAgICAgcmV0dXJuIHJldHVybkluZGV4ZXM7XG4gICAgfVxuICAgIGNoZWNrTWVtb3J5TmFtZUFiKHdvcmQ6IHN0cmluZyl7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDSEVDS05BTUUgZm46IGFicnYgLT4gXCIsIHdvcmQpO1xuXG4gICAgICAgIHZhciBuYW1lQWJBcnJheTogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBcIm1yLlwiLCBcIm1ycy5cIiwgXCJtaXNzLlwiLFxuICAgICAgICAgICAgXCJkci5cIiwgXCJyZXYuXCIsIFwiaG9uLlwiLFxuICAgICAgICAgICAgXCJwcm9mLlwiLCBcImdlbi5cIiwgXCJyZXAuXCIsXG4gICAgICAgICAgICBcInNlbi5cIiwgXCJzdC5cIiwgXCJjYXB0LlwiLFxuICAgICAgICAgICAgXCJzZ3QuXCIsIFwicHZ0LlwiLCBcInNpci5cIixcbiAgICAgICAgICAgIFwiY29tZHIuXCIsIFwiY29ycC5cIiwgXCJjcGwuXCIsXG4gICAgICAgICAgICBcImdvdi5cIiwgXCJha2FkLlwiLCBcImFyaC5cIixcbiAgICAgICAgICAgIFwiZGlyLlwiLCBcImhyLlwiLCBcImkuXCIsIFwibHAuXCIsXG4gICAgICAgICAgICBcInByLlwiLCBcInBybC5cIiwgXCJybmtsLlwiLFxuICAgICAgICAgICAgXCJydmtsLlwiLCBcInYuYVwiLCBcIsO1cC5cIlxuICAgICAgICBdO1xuICAgICAgICB2YXIgbCA9IG5hbWVBYkFycmF5Lmxlbmd0aDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGw7IGkrKyl7XG4gICAgICAgICAgICBpZihuYW1lQWJBcnJheVtpXSA9PSB3b3JkLnRyaW0oKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjaGVja01lbW9yeU90aGVyKHdvcmQ6IHN0cmluZywgc2VudGVuY2U6IHN0cmluZyl7XG4gICAgICAgIHZhciBtZW1vcnlBcnJheTogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBcImUuZ1wiLCBcImEuaS5cIiwgXCJhLm0uXCIsXG4gICAgICAgICAgICBcImNjYS5cIiwgXCJjLlwiLCBcImNhLlwiLFxuICAgICAgICAgICAgXCJjYXAuXCIsIFwiY2YuXCIsIFwiY3AuXCIsXG4gICAgICAgICAgICBcImMudi5cIiwgXCJjd3QuXCIsIFwiZC52LlwiLFxuICAgICAgICAgICAgXCJlYWQuXCIsIFwiYWwuXCIsIFwiZXRjLlwiLFxuICAgICAgICAgICAgXCJmbC5cIiwgXCJmLlwiLCBcImZmLlwiLFxuICAgICAgICAgICAgXCJpYmlkLlwiLCBcImlkLlwiLCBcImkuYS5cIixcbiAgICAgICAgICAgIFwiaS5lLlwiLCBcImxiLlwiLCBcImxicy5cIixcbiAgICAgICAgICAgIFwibGwuYi5cIiwgXCJtLmEuXCIsIFwibS5vLlwiLFxuICAgICAgICAgICAgXCJuZW0uXCIsIFwiY29uLlwiLCBcIm9wLlwiLFxuICAgICAgICAgICAgXCJjaXQuXCIsIFwicC5hLlwiLCBcImNlbnQuXCIsXG4gICAgICAgICAgICBcInBoLmQuXCIsIFwicC5tLlwiLCBcInAubS5hLlwiLFxuICAgICAgICAgICAgXCJwLnAuXCIsXCJ0ZW0uXCIsIFwicC5zLlwiLFxuICAgICAgICAgICAgXCJwLnAucy5cIiwgXCJxLmQuXCIsIFwicS5lLmQuXCIsXG4gICAgICAgICAgICBcInEudi5cIiwgXCJyLlwiLCBcInIuaS5wLlwiLFxuICAgICAgICAgICAgXCJzLmEuXCIsIFwicy5sLlwiLCBcInMucy5cIixcbiAgICAgICAgICAgIFwicy5vLnMuXCIsIFwic3RhdC5cIiwgXCJ2aXouXCIsXG4gICAgICAgICAgICBcInZzLlwiLCBcImIuYy5cIiwgXCJhLmQuXCIsIFwiYi5jLmUuXCIsXG4gICAgICAgICAgICBcImMuZS5cIiwgXCJsLnEuXCIsIFwiaWduLlwiLFwiaS5vLlwiLFxuICAgICAgICAgICAgXCJhLmMuXCIsIFwiYS5wLlwiLCBcImFxLlwiLCBcInAubS52XCIsXG4gICAgICAgICAgICBcInByb3guXCIsIFwicS5sLlwiLCBcInEuZS5mLlwiLCBcInMuZC5nLlwiLFxuICAgICAgICAgICAgXCJub20uXCIsIFwicy52LlwiLFwidC5pLmQuXCIsIFwidWx0LlwiLFxuICAgICAgICAgICAgXCJ2LlwiLCBcImcuXCIsIFwiZ3IuXCIsIFwiaS5cIiwgXCJzLlwiLCBcImkuXCIsXG4gICAgICAgICAgICBcImEuYy5oLnMuXCIsIFwiYWRkLlwiLCBcImFkLlwiLFxuICAgICAgICAgICAgXCJsaWIuXCIsIFwiYWRtb3YuXCIsIFwidXMuXCIsIFwiYWdpdC5cIixcbiAgICAgICAgICAgIFwiYWx0LlwiLCBcImQuXCIsIFwiZGllYi5cIiwgXCJoLlwiLFxuICAgICAgICAgICAgXCJob3IuXCIsIFwiYW1wLlwiLCBcImFxLlwiLCBcImJ1bGwuXCIsXG4gICAgICAgICAgICBcImNvbS5cIiwgXCJkZXN0LlwiLCBcImZlcnYuXCIsXG4gICAgICAgICAgICBcImEucy5cIiwgXCJhLmwuXCIsIFwiYWthZC5cIixcbiAgICAgICAgICAgIFwiYXJoLlwiLCBcImRlbS5cIiwgXCJkZXRzLlwiLCBcImRpci5cIixcbiAgICAgICAgICAgIFwiYS5cIiwgXCJwaGlsLlwiLCBcIm5hdC5cIiwgXCJlLlwiLCBcImsuXCIsXG4gICAgICAgICAgICBcImwuXCIsIFwia2hrLlwiLCBcImtsLlwiLCBcImxkLlwiLCBcImxwLlwiLFxuICAgICAgICAgICAgXCJwci5cIiwgXCJwcmwuXCIsIFwicm5rbC5cIiwgXCJydmtsLlwiLFxuICAgICAgICAgICAgXCLDtXAuXCIsIFwiaW5nbC5cIlxuICAgICAgICBdO1xuICAgICAgICB2YXIgbGVuZ3RoID0gbWVtb3J5QXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYobWVtb3J5QXJyYXlbaV0gPT0gd29yZC50cmltKCkpe1xuICAgICAgICAgICAgICAgIHZhciBpc0luVGhlRW5kID0gdGhpcy5sb29rRm9yQmlnTGV0dGVyKHdvcmQsIHNlbnRlbmNlKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwic2VlIG9uIGlzSW5UaGVFbmQgdmFyaWFibGUgLT4gXCIsIGlzSW5UaGVFbmQpO1xuICAgICAgICAgICAgICAgIGlmKGlzSW5UaGVFbmQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbG9va0ZvckJpZ0xldHRlcih3b3JkOiBzdHJpbmcsIHRleHQ6IHN0cmluZyl7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJMT09LIEZPUiBCSUcgRk46IHPDtW5hIC0+IFwiLCB3b3JkKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxPT0sgRk9SIEJJRyBGTjogdGVrc3QgLT4gXCIsIHRleHQpO1xuICAgICAgICB2YXIgd29yZEluZGV4ID0gdGV4dC5pbmRleE9mKHdvcmQpO1xuICAgICAgICB2YXIgbG9vcFZhciA9IHRleHQuc3Vic3RyaW5nKHdvcmRJbmRleCArIHdvcmQubGVuZ3RoLTEpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxPT0sgRk9SIEJJRyBGTjogbG9vcFZhciAtPiBcIiwgbG9vcFZhcik7XG5cbiAgICAgICAgaWYodGV4dC5sZW5ndGggPD0gd29yZEluZGV4ICsgd29yZC5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAxOyBpIDwgbG9vcFZhci5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgaWYobG9vcFZhci5jaGFyQXQoaSkgPT09IFwiIFwiICYmXG4gICAgICAgICAgICAgICAgbG9vcFZhci5jaGFyQXQoaS0xKSA9PT0gXCIuXCIgJiZcbiAgICAgICAgICAgICAgICBsb29wVmFyLmNoYXJBdChpKzEpID09IGxvb3BWYXIuY2hhckF0KGkrMSkudG9VcHBlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQmV0d2VlbkluZGV4ZXModGFyZ2V0SW5kZXg6IG51bWJlciwgbWFya0luZGV4OiBudW1iZXJbXSl7XG4gICAgICAgIHZhciByZXR1cm5BcnJheTogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBpZih0YXJnZXRJbmRleCA8IG1hcmtJbmRleFswXSl7XG4gICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFswXSlcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5BcnJheTtcbiAgICAgICAgfVxuICAgICAgICBpZih0YXJnZXRJbmRleCA+IG1hcmtJbmRleFttYXJrSW5kZXgubGVuZ3RoLTFdKXtcbiAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W21hcmtJbmRleC5sZW5ndGgtMV0pXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQXJyYXk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1hcmtJbmRleC5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldEluZGV4ID4gbWFya0luZGV4W2ldICYmIHRhcmdldEluZGV4IDwgbWFya0luZGV4W2krMV0pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5BcnJheS5wdXNoKG1hcmtJbmRleFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkFycmF5LnB1c2gobWFya0luZGV4W2krMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkFycmF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvdW50TWFya3ModGV4dDogc3RyaW5nLCBsZXR0ZXI6IHN0cmluZyl7XG4gICAgICAgIHJldHVybiAodGV4dC5tYXRjaChSZWdFeHAobGV0dGVyLCAnZycpKSB8fCBbXSkubGVuZ3RoO1xuICAgIH1cbiAgICBpbmRleEZpbmRlcihzdHIsIGNoYXIpe1xuICAgICAgICByZXR1cm4gc3RyLnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbihjLCBpKXtcbiAgICAgICAgICAgIGlmKGMgPT0gY2hhcikgcmV0dXJuIGk7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbih2KXtcbiAgICAgICAgICAgIHJldHVybiB2ID49MFxuICAgICAgICB9KVxuICAgIH1cbiAgICBmaW5kRmlyc3RBbHBoYWJldGljYWwodGV4dDogc3RyaW5nKXtcbiAgICAgICAgcmV0dXJuICh0ZXh0Lm1hdGNoKC9bYS16QS16XS8pIHx8wqBbXSkucG9wKCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==
