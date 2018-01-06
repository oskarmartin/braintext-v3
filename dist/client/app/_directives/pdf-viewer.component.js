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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by vadimdez on 21/06/16.
 */
var core_1 = require("@angular/core");
function isSSR() {
    return typeof window === 'undefined';
}
if (!isSSR()) {
    window['pdfjs-dist/build/pdf'] = require('pdfjs-dist/build/pdf');
    require('pdfjs-dist/web/compatibility');
    require('pdfjs-dist/web/pdf_viewer');
    PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
}
var PdfViewerComponentOskar = /** @class */ (function () {
    function PdfViewerComponentOskar(element) {
        this.element = element;
        this._renderText = true;
        this._stickToPage = false;
        this._originalSize = true;
        this._page = 1;
        this._zoom = 1;
        this._rotation = 0;
        this._showAll = true;
        this._canAutoResize = true;
        this._fitToPage = false;
        this._externalLinkTarget = 'blank';
        this.afterLoadComplete = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onProgress = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter(true);
        if (!isSSR()) {
            PDFJS.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/" + PDFJS.version + "/pdf.worker.min.js";
        }
    }
    PdfViewerComponentOskar_1 = PdfViewerComponentOskar;
    PdfViewerComponentOskar.prototype.ngOnInit = function () {
        if (!isSSR()) {
            this.setupViewer();
        }
    };
    PdfViewerComponentOskar.prototype.onPageResize = function () {
        var _this = this;
        if (!this._canAutoResize) {
            return;
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(function () {
            _this.updateSize();
        }, 100);
    };
    PdfViewerComponentOskar.prototype.ngOnChanges = function (changes) {
        if (isSSR()) {
            return;
        }
        if ('src' in changes) {
            this.loadPDF();
        }
        else if (this._pdf) {
            if ('renderText' in changes) {
                this.setupViewer();
            }
            this.update();
        }
    };
    Object.defineProperty(PdfViewerComponentOskar.prototype, "page", {
        set: function (_page) {
            _page = parseInt(_page, 10);
            if (this._pdf && !this.isValidPageNumber(_page)) {
                _page = 1;
            }
            this._page = _page;
            this.pageChange.emit(_page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "renderText", {
        set: function (renderText) {
            this._renderText = renderText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "originalSize", {
        set: function (originalSize) {
            this._originalSize = originalSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "showAll", {
        set: function (value) {
            this._showAll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "stickToPage", {
        set: function (value) {
            this._stickToPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (value) {
            if (value <= 0) {
                return;
            }
            this._zoom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "rotation", {
        set: function (value) {
            if (!(typeof value === 'number' && value % 90 === 0)) {
                console.warn('Invalid pages rotation angle.');
                return;
            }
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "externalLinkTarget", {
        set: function (value) {
            this._externalLinkTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "autoresize", {
        set: function (value) {
            this._canAutoResize = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewerComponentOskar.prototype, "fitToPage", {
        set: function (value) {
            this._fitToPage = Boolean(value);
        },
        enumerable: true,
        configurable: true
    });
    PdfViewerComponentOskar.prototype.setupViewer = function () {
        PDFJS.disableTextLayer = !this._renderText;
        PdfViewerComponentOskar_1.setExternalLinkTarget(this._externalLinkTarget);
        this._pdfLinkService = new PDFJS.PDFLinkService();
        var pdfOptions = {
            container: this.element.nativeElement.querySelector('div'),
            removePageBorders: true,
            linkService: this._pdfLinkService
        };
        this._pdfViewer = new PDFJS.PDFViewer(pdfOptions);
        this._pdfLinkService.setViewer(this._pdfViewer);
    };
    PdfViewerComponentOskar.prototype.updateSize = function () {
        var _this = this;
        if (!this._showAll) {
            this.renderPage(this._page);
            return;
        }
        this._pdf.getPage(this._pdfViewer.currentPageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var scale = _this._zoom;
            var stickToPage = true;
            // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
            if (!_this._originalSize || (_this._fitToPage && viewport.width > _this.element.nativeElement.offsetWidth)) {
                scale = _this.getScale(page.getViewport(1).width);
                stickToPage = !_this._stickToPage;
            }
            _this._pdfViewer._setScale(scale, stickToPage);
        });
    };
    PdfViewerComponentOskar.prototype.isValidPageNumber = function (page) {
        return this._pdf.numPages >= page && page >= 1;
    };
    PdfViewerComponentOskar.setExternalLinkTarget = function (type) {
        switch (type) {
            case 'blank':
                PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;
                break;
            case 'none':
                PDFJS.externalLinkTarget = PDFJS.LinkTarget.NONE;
                break;
            case 'self':
                PDFJS.externalLinkTarget = PDFJS.LinkTarget.SELF;
                break;
            case 'parent':
                PDFJS.externalLinkTarget = PDFJS.LinkTarget.PARENT;
                break;
            case 'top':
                PDFJS.externalLinkTarget = PDFJS.LinkTarget.TOP;
                break;
        }
    };
    PdfViewerComponentOskar.prototype.loadPDF = function () {
        var _this = this;
        if (!this.src) {
            return;
        }
        if (this.lastLoaded === this.src) {
            this.update();
            return;
        }
        console.log("this.src -> ", this.src);
        var loadingTask = PDFJS.getDocument(this.src);
        loadingTask.onProgress = function (progressData) {
            _this.onProgress.emit(progressData);
        };
        var src = this.src;
        loadingTask.promise
            .then(function (pdf) {
            _this._pdf = pdf;
            _this.lastLoaded = src;
            _this.afterLoadComplete.emit(pdf);
            _this.update();
        }, function (error) {
            _this.onError.emit(error);
        });
    };
    PdfViewerComponentOskar.prototype.update = function () {
        if (this._showAll) {
            this.setupViewer();
            if (this._pdfViewer) {
                this._pdfViewer.setDocument(this._pdf);
            }
        }
        if (this._pdfLinkService) {
            this._pdfLinkService.setDocument(this._pdf, null);
        }
        this.page = this._page;
        this.render();
    };
    PdfViewerComponentOskar.prototype.render = function () {
        if (this._showAll) {
            this.renderMultiplePages();
        }
        else {
            this.renderPage(this._page);
        }
    };
    PdfViewerComponentOskar.prototype.renderMultiplePages = function () {
        var _this = this;
        if (!this.isValidPageNumber(this._page)) {
            this._page = 1;
        }
        if (this._rotation !== 0 || this._pdfViewer.pagesRotation !== this._rotation) {
            setTimeout(function () {
                _this._pdfViewer.pagesRotation = _this._rotation;
            });
        }
        if (this._stickToPage) {
            setTimeout(function () {
                _this._pdfViewer.currentPageNumber = _this._page;
            });
        }
        this.updateSize();
    };
    PdfViewerComponentOskar.prototype.renderPage = function (pageNumber) {
        var _this = this;
        this._pdf.getPage(pageNumber).then(function (page) {
            var viewport = page.getViewport(_this._zoom, _this._rotation);
            var container = _this.element.nativeElement.querySelector('.pdfViewer');
            var scale = _this._zoom;
            // Scale the document when it shouldn't be in original size or doesn't fit into the viewport
            if (!_this._originalSize || (_this._fitToPage && viewport.width > _this.element.nativeElement.offsetWidth)) {
                viewport = page.getViewport(_this.element.nativeElement.offsetWidth / viewport.width, _this._rotation);
                scale = _this.getScale(page.getViewport(1).width);
            }
            PdfViewerComponentOskar_1.removeAllChildNodes(container);
            PDFJS.disableTextLayer = !_this._renderText;
            PdfViewerComponentOskar_1.setExternalLinkTarget(_this._externalLinkTarget);
            _this._pdfLinkService = new PDFJS.PDFLinkService();
            var pdfOptions = {
                container: container,
                removePageBorders: true,
                linkService: _this._pdfLinkService,
                defaultViewport: viewport,
                scale: scale,
                id: _this._page,
                textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
                annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
            };
            var pdfPageView = new PDFJS.PDFPageView(pdfOptions);
            _this._pdfLinkService.setViewer(pdfPageView);
            if (_this._rotation !== 0 || pdfPageView.rotation !== _this._rotation) {
                pdfPageView.rotation = _this._rotation;
            }
            pdfPageView.setPdfPage(page);
            return pdfPageView.draw();
        });
    };
    PdfViewerComponentOskar.removeAllChildNodes = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    PdfViewerComponentOskar.prototype.getScale = function (viewportWidth) {
        var offsetWidth = this.element.nativeElement.offsetWidth;
        return this._zoom * (offsetWidth / viewportWidth) / PdfViewerComponentOskar_1.CSS_UNITS;
    };
    PdfViewerComponentOskar.CSS_UNITS = 96.0 / 72.0;
    __decorate([
        core_1.Output('after-load-complete'),
        __metadata("design:type", Object)
    ], PdfViewerComponentOskar.prototype, "afterLoadComplete", void 0);
    __decorate([
        core_1.Output('error'),
        __metadata("design:type", Object)
    ], PdfViewerComponentOskar.prototype, "onError", void 0);
    __decorate([
        core_1.Output('on-progress'),
        __metadata("design:type", Object)
    ], PdfViewerComponentOskar.prototype, "onProgress", void 0);
    __decorate([
        core_1.HostListener('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PdfViewerComponentOskar.prototype, "onPageResize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PdfViewerComponentOskar.prototype, "src", void 0);
    __decorate([
        core_1.Input('page'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PdfViewerComponentOskar.prototype, "page", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PdfViewerComponentOskar.prototype, "pageChange", void 0);
    __decorate([
        core_1.Input('render-text'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "renderText", null);
    __decorate([
        core_1.Input('original-size'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "originalSize", null);
    __decorate([
        core_1.Input('show-all'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "showAll", null);
    __decorate([
        core_1.Input('stick-to-page'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "stickToPage", null);
    __decorate([
        core_1.Input('zoom'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PdfViewerComponentOskar.prototype, "zoom", null);
    __decorate([
        core_1.Input('rotation'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PdfViewerComponentOskar.prototype, "rotation", null);
    __decorate([
        core_1.Input('external-link-target'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PdfViewerComponentOskar.prototype, "externalLinkTarget", null);
    __decorate([
        core_1.Input('autoresize'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "autoresize", null);
    __decorate([
        core_1.Input('fit-to-page'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PdfViewerComponentOskar.prototype, "fitToPage", null);
    PdfViewerComponentOskar = PdfViewerComponentOskar_1 = __decorate([
        core_1.Component({
            selector: 'pdf-viewer-oskar',
            template: "<div class=\"ng2-pdf-viewer-container\"><div class=\"pdfViewer\"></div></div>",
            styles: [
                "\n.ng2-pdf-viewer-container {\n    overflow-x: auto;\n}\n:host /deep/ .textLayer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  opacity: 0.2;\n  line-height: 1.0;\n}\n:host /deep/ .textLayer > div {\n  color: transparent;\n  position: absolute;\n  white-space: pre;\n  cursor: text;\n  -webkit-transform-origin: 0% 0%;\n  -moz-transform-origin: 0% 0%;\n  -o-transform-origin: 0% 0%;\n  -ms-transform-origin: 0% 0%;\n  transform-origin: 0% 0%;\n}\n:host /deep/ .textLayer .highlight {\n  margin: -1px;\n  padding: 1px;\n  background-color: #002bff;\n  border-radius: 4px;\n}\n:host /deep/ .textLayer .highlight.begin {\n  border-radius: 4px 0px 0px 4px;\n}\n:host /deep/ .textLayer .highlight.end {\n  border-radius: 0px 4px 4px 0px;\n}\n:host /deep/ .textLayer .highlight.middle {\n  border-radius: 0px;\n}\n:host /deep/ .textLayer .highlight.selected {\n  background-color: rgb(0, 100, 0);\n}\n:host /deep/ .textLayer ::selection { background: #002bff; }\n:host /deep/ .textLayer ::-moz-selection { background: #002bff; }\n:host /deep/ .textLayer .endOfContent {\n  display: block;\n  position: absolute;\n  left: 0px;\n  top: 100%;\n  right: 0px;\n  bottom: 0px;\n  z-index: -1;\n  cursor: default;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n}\n:host /deep/ .textLayer .endOfContent.active {\n  top: 0px;\n}\n:host /deep/ .annotationLayer section {\n  position: absolute;\n}\n:host /deep/ .annotationLayer .linkAnnotation > a {\n  position: absolute;\n  font-size: 1em;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n:host /deep/ .annotationLayer .linkAnnotation > a /* -ms-a */  {\n  background: url(\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\") 0 0 repeat;\n}\n:host /deep/ .annotationLayer .linkAnnotation > a:hover {\n  opacity: 0.2;\n  background: #002bff;\n  box-shadow: 0px 2px 10px #002bff;\n}\n:host /deep/ .annotationLayer .textAnnotation img {\n  position: absolute;\n  cursor: pointer;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {\n  background-color: #002bff;\n  border: 1px solid transparent;\n  box-sizing: border-box;\n  font-size: 9px;\n  height: 100%;\n  padding: 0 3px;\n  vertical-align: top;\n  width: 100%;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea {\n  font: message-box;\n  font-size: 9px;\n  resize: none;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input[disabled],\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea[disabled],\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select[disabled],\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input[disabled],\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input[disabled] {\n  background: none;\n  border: 1px solid transparent;\n  cursor: not-allowed;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input:hover,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea:hover,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select:hover,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input:hover,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input:hover {\n  border: 1px solid #000;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input:focus,\n:host /deep/ .annotationLayer .textWidgetAnnotation textarea:focus,\n:host /deep/ .annotationLayer .choiceWidgetAnnotation select:focus {\n  background: none;\n  border: 1px solid transparent;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input.comb {\n  font-family: monospace;\n  padding-left: 2px;\n  padding-right: 0;\n}\n:host /deep/ .annotationLayer .textWidgetAnnotation input.comb:focus {\n  width: 115%;\n}\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.checkBox input,\n:host /deep/ .annotationLayer .buttonWidgetAnnotation.radioButton input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none;\n}\n:host /deep/ .annotationLayer .popupWrapper {\n  position: absolute;\n  width: 20em;\n}\n:host /deep/ .annotationLayer .popup {\n  position: absolute;\n  z-index: 200;\n  max-width: 20em;\n  background-color: #FFFF99;\n  box-shadow: 0px 2px 5px #333;\n  border-radius: 2px;\n  padding: 0.6em;\n  margin-left: 5px;\n  cursor: pointer;\n  word-wrap: break-word;\n}\n:host /deep/ .annotationLayer .popup h1 {\n  font-size: 1em;\n  border-bottom: 1px solid #000000;\n  padding-bottom: 0.2em;\n}\n:host /deep/ .annotationLayer .popup p {\n  padding-top: 0.2em;\n}\n:host /deep/ .annotationLayer .highlightAnnotation,\n:host /deep/ .annotationLayer .underlineAnnotation,\n:host /deep/ .annotationLayer .squigglyAnnotation,\n:host /deep/ .annotationLayer .strikeoutAnnotation,\n:host /deep/ .annotationLayer .fileAttachmentAnnotation {\n  cursor: pointer;\n}\n:host /deep/ .pdfViewer .canvasWrapper {\n  overflow: hidden;\n}\n:host /deep/ .pdfViewer .page {\n  direction: ltr;\n  width: 816px;\n  height: 1056px;\n  margin: 1px auto -8px auto;\n  position: relative;\n  overflow: visible;\n  border: 9px solid transparent;\n  background-clip: content-box;\n  border-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAA6UlEQVR4Xl2Pi2rEMAwE16fm1f7/r14v7w4rI0IzLAF7hLxNevBSEMEF5+OilNCsRd8ZMyn+a4NmsOT8WJw1lFbSYgGFzF2bLFoLjTClWjKKGRWpDYAGXUnZ4uhbBUzF3Oe/GG/ue2fn4GgsyXhNgysV2JnrhKEMg4fEZcALmiKbNhBBRFpSyDOj1G4QOVly6O1FV54ZZq8OVygrciDt6JazRgi1ljTPH0gbrPmHPXAbCiDd4GawIjip1TPh9tt2sz24qaCjr/jAb/GBFTbq9KZ7Ke/Cqt8nayUikZKsWZK7Fe6bg5dOUt8fZHWG2BHc+6EAAAAASUVORK5CYII=') 9 9 repeat;\n  background-color: white;\n}\n:host /deep/ .pdfViewer.removePageBorders .page {\n  margin: 0px auto 10px auto;\n  border: none;\n}\n:host /deep/ .pdfViewer.singlePageView {\n  display: inline-block;\n}\n:host /deep/ .pdfViewer.singlePageView .page {\n  margin: 0;\n  border: none;\n}\n:host /deep/ .pdfViewer .page canvas {\n  margin: 0;\n  display: block;\n}\n:host /deep/ .pdfViewer .page .loadingIcon {\n  position: absolute;\n  display: block;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/gif;base64,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') center no-repeat;\n}\n"
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], PdfViewerComponentOskar);
    return PdfViewerComponentOskar;
    var PdfViewerComponentOskar_1;
}());
exports.PdfViewerComponentOskar = PdfViewerComponentOskar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fZGlyZWN0aXZlcy9wZGYtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOztHQUVHO0FBQ0gsc0NBRXVCO0FBRXZCO0lBQ0UsTUFBTSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztBQUN2QyxDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDYixNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN4QyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUVyQyxLQUFLLENBQUMsU0FBUyxHQUFTLEtBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7QUFDekQsQ0FBQztBQTZORDtJQXVCRSxpQ0FBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQXBCL0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixtQkFBYyxHQUFZLElBQUksQ0FBQztRQUMvQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLHdCQUFtQixHQUFXLE9BQU8sQ0FBQztRQU1mLHNCQUFpQixHQUFHLElBQUksbUJBQVksRUFBb0IsQ0FBQztRQUN2RSxZQUFPLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFDNUIsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBbUIsQ0FBQztRQTJEOUQsZUFBVSxHQUF5QixJQUFJLG1CQUFZLENBQVMsSUFBSSxDQUFD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MkU7WUFDckYsTUFBTSxFQUFFO2dCQUNWLDhuVEFrTkM7YUFDRTtTQUNGLENBQUM7eUNBeUI2QixpQkFBVTtPQXZCNUIsdUJBQXVCLENBMlVuQztJQUFELDhCQUFDOztDQTNVRCxBQTJVQyxJQUFBO0FBM1VZLDBEQUF1QiIsImZpbGUiOiJhcHAvX2RpcmVjdGl2ZXMvcGRmLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQ3JlYXRlZCBieSB2YWRpbWRleiBvbiAyMS8wNi8xNi5cbiAqL1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25Jbml0LCBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmZ1bmN0aW9uIGlzU1NSKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbmlmICghaXNTU1IoKSkge1xuICB3aW5kb3dbJ3BkZmpzLWRpc3QvYnVpbGQvcGRmJ10gPSByZXF1aXJlKCdwZGZqcy1kaXN0L2J1aWxkL3BkZicpO1xuICByZXF1aXJlKCdwZGZqcy1kaXN0L3dlYi9jb21wYXRpYmlsaXR5Jyk7XG4gIHJlcXVpcmUoJ3BkZmpzLWRpc3Qvd2ViL3BkZl92aWV3ZXInKTtcblxuICBQREZKUy52ZXJib3NpdHkgPSAoPGFueT5QREZKUykuVkVSQk9TSVRZX0xFVkVMUy5lcnJvcnM7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGRmLXZpZXdlci1vc2thcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nMi1wZGYtdmlld2VyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJwZGZWaWV3ZXJcIj48L2Rpdj48L2Rpdj5gLFxuICBzdHlsZXM6IFtcbmBcbi5uZzItcGRmLXZpZXdlci1jb250YWluZXIge1xuICAgIG92ZXJmbG93LXg6IGF1dG87XG59XG46aG9zdCAvZGVlcC8gLnRleHRMYXllciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvcGFjaXR5OiAwLjI7XG4gIGxpbmUtaGVpZ2h0OiAxLjA7XG59XG46aG9zdCAvZGVlcC8gLnRleHRMYXllciA+IGRpdiB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xuICBjdXJzb3I6IHRleHQ7XG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMCUgMCU7XG4gIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogMCUgMCU7XG4gIC1vLXRyYW5zZm9ybS1vcmlnaW46IDAlIDAlO1xuICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogMCUgMCU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAlIDAlO1xufVxuOmhvc3QgL2RlZXAvIC50ZXh0TGF5ZXIgLmhpZ2hsaWdodCB7XG4gIG1hcmdpbjogLTFweDtcbiAgcGFkZGluZzogMXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAyYmZmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG46aG9zdCAvZGVlcC8gLnRleHRMYXllciAuaGlnaGxpZ2h0LmJlZ2luIHtcbiAgYm9yZGVyLXJhZGl1czogNHB4IDBweCAwcHggNHB4O1xufVxuOmhvc3QgL2RlZXAvIC50ZXh0TGF5ZXIgLmhpZ2hsaWdodC5lbmQge1xuICBib3JkZXItcmFkaXVzOiAwcHggNHB4IDRweCAwcHg7XG59XG46aG9zdCAvZGVlcC8gLnRleHRMYXllciAuaGlnaGxpZ2h0Lm1pZGRsZSB7XG4gIGJvcmRlci1yYWRpdXM6IDBweDtcbn1cbjpob3N0IC9kZWVwLyAudGV4dExheWVyIC5oaWdobGlnaHQuc2VsZWN0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMTAwLCAwKTtcbn1cbjpob3N0IC9kZWVwLyAudGV4dExheWVyIDo6c2VsZWN0aW9uIHsgYmFja2dyb3VuZDogIzAwMmJmZjsgfVxuOmhvc3QgL2RlZXAvIC50ZXh0TGF5ZXIgOjotbW96LXNlbGVjdGlvbiB7IGJhY2tncm91bmQ6ICMwMDJiZmY7IH1cbjpob3N0IC9kZWVwLyAudGV4dExheWVyIC5lbmRPZkNvbnRlbnQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwcHg7XG4gIHRvcDogMTAwJTtcbiAgcmlnaHQ6IDBweDtcbiAgYm90dG9tOiAwcHg7XG4gIHotaW5kZXg6IC0xO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbn1cbjpob3N0IC9kZWVwLyAudGV4dExheWVyIC5lbmRPZkNvbnRlbnQuYWN0aXZlIHtcbiAgdG9wOiAwcHg7XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciBzZWN0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLmxpbmtBbm5vdGF0aW9uID4gYSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZm9udC1zaXplOiAxZW07XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5saW5rQW5ub3RhdGlvbiA+IGEgLyogLW1zLWEgKi8gIHtcbiAgYmFja2dyb3VuZDogdXJsKFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3XCIpIDAgMCByZXBlYXQ7XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAubGlua0Fubm90YXRpb24gPiBhOmhvdmVyIHtcbiAgb3BhY2l0eTogMC4yO1xuICBiYWNrZ3JvdW5kOiAjMDAyYmZmO1xuICBib3gtc2hhZG93OiAwcHggMnB4IDEwcHggIzAwMmJmZjtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC50ZXh0QW5ub3RhdGlvbiBpbWcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC50ZXh0V2lkZ2V0QW5ub3RhdGlvbiBpbnB1dCxcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC50ZXh0V2lkZ2V0QW5ub3RhdGlvbiB0ZXh0YXJlYSxcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5jaG9pY2VXaWRnZXRBbm5vdGF0aW9uIHNlbGVjdCxcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5idXR0b25XaWRnZXRBbm5vdGF0aW9uLmNoZWNrQm94IGlucHV0LFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLmJ1dHRvbldpZGdldEFubm90YXRpb24ucmFkaW9CdXR0b24gaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAyYmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiA5cHg7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMCAzcHg7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIHdpZHRoOiAxMDAlO1xufVxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnRleHRXaWRnZXRBbm5vdGF0aW9uIHRleHRhcmVhIHtcbiAgZm9udDogbWVzc2FnZS1ib3g7XG4gIGZvbnQtc2l6ZTogOXB4O1xuICByZXNpemU6IG5vbmU7XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAudGV4dFdpZGdldEFubm90YXRpb24gaW5wdXRbZGlzYWJsZWRdLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnRleHRXaWRnZXRBbm5vdGF0aW9uIHRleHRhcmVhW2Rpc2FibGVkXSxcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5jaG9pY2VXaWRnZXRBbm5vdGF0aW9uIHNlbGVjdFtkaXNhYmxlZF0sXG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAuYnV0dG9uV2lkZ2V0QW5ub3RhdGlvbi5jaGVja0JveCBpbnB1dFtkaXNhYmxlZF0sXG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAuYnV0dG9uV2lkZ2V0QW5ub3RhdGlvbi5yYWRpb0J1dHRvbiBpbnB1dFtkaXNhYmxlZF0ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC50ZXh0V2lkZ2V0QW5ub3RhdGlvbiBpbnB1dDpob3Zlcixcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC50ZXh0V2lkZ2V0QW5ub3RhdGlvbiB0ZXh0YXJlYTpob3Zlcixcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5jaG9pY2VXaWRnZXRBbm5vdGF0aW9uIHNlbGVjdDpob3Zlcixcbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5idXR0b25XaWRnZXRBbm5vdGF0aW9uLmNoZWNrQm94IGlucHV0OmhvdmVyLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLmJ1dHRvbldpZGdldEFubm90YXRpb24ucmFkaW9CdXR0b24gaW5wdXQ6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xufVxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnRleHRXaWRnZXRBbm5vdGF0aW9uIGlucHV0OmZvY3VzLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnRleHRXaWRnZXRBbm5vdGF0aW9uIHRleHRhcmVhOmZvY3VzLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLmNob2ljZVdpZGdldEFubm90YXRpb24gc2VsZWN0OmZvY3VzIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAudGV4dFdpZGdldEFubm90YXRpb24gaW5wdXQuY29tYiB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIHBhZGRpbmctbGVmdDogMnB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xufVxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnRleHRXaWRnZXRBbm5vdGF0aW9uIGlucHV0LmNvbWI6Zm9jdXMge1xuICB3aWR0aDogMTE1JTtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5idXR0b25XaWRnZXRBbm5vdGF0aW9uLmNoZWNrQm94IGlucHV0LFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLmJ1dHRvbldpZGdldEFubm90YXRpb24ucmFkaW9CdXR0b24gaW5wdXQge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1zLWFwcGVhcmFuY2U6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAucG9wdXBXcmFwcGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMjBlbTtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5wb3B1cCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMjAwO1xuICBtYXgtd2lkdGg6IDIwZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGOTk7XG4gIGJveC1zaGFkb3c6IDBweCAycHggNXB4ICMzMzM7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMC42ZW07XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xufVxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnBvcHVwIGgxIHtcbiAgZm9udC1zaXplOiAxZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwMDAwO1xuICBwYWRkaW5nLWJvdHRvbTogMC4yZW07XG59XG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAucG9wdXAgcCB7XG4gIHBhZGRpbmctdG9wOiAwLjJlbTtcbn1cbjpob3N0IC9kZWVwLyAuYW5ub3RhdGlvbkxheWVyIC5oaWdobGlnaHRBbm5vdGF0aW9uLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnVuZGVybGluZUFubm90YXRpb24sXG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAuc3F1aWdnbHlBbm5vdGF0aW9uLFxuOmhvc3QgL2RlZXAvIC5hbm5vdGF0aW9uTGF5ZXIgLnN0cmlrZW91dEFubm90YXRpb24sXG46aG9zdCAvZGVlcC8gLmFubm90YXRpb25MYXllciAuZmlsZUF0dGFjaG1lbnRBbm5vdGF0aW9uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuOmhvc3QgL2RlZXAvIC5wZGZWaWV3ZXIgLmNhbnZhc1dyYXBwZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuOmhvc3QgL2RlZXAvIC5wZGZWaWV3ZXIgLnBhZ2Uge1xuICBkaXJlY3Rpb246IGx0cjtcbiAgd2lkdGg6IDgxNnB4O1xuICBoZWlnaHQ6IDEwNTZweDtcbiAgbWFyZ2luOiAxcHggYXV0byAtOHB4IGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIGJvcmRlcjogOXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xuICBib3JkZXItaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCTUFBQUFUQ0FRQUFBRFlXZjVIQUFBQTZVbEVRVlI0WGwyUGkyckVNQXdFMTZmbTFmNy9yMTR2N3c0ckkwSXpMQUY3aEx4TmV2QlNFTUVGNStPaWxOQ3NSZDhaTXluK2E0Tm1zT1Q4V0p3MWxGYlNZZ0dGekYyYkxGb0xqVENsV2pLS0dSV3BEWUFHWFVuWjR1aGJCVXpGM09lL0dHL3VlMmZuNEdnc3lYaE5neXNWMkpucmhLRU1nNGZFWmNBTG1pS2JOaEJCUkZwU3lET2oxRzRRT1ZseTZPMUZWNTRaWnE4T1Z5Z3JjaUR0NkphelJnaTFsalRQSDBnYnJQbUhQWEFiQ2lEZDRHYXdJamlwMVRQaDl0dDJzejI0cWFDanIvakFiL0dCRlRicTlLWjdLZS9DcXQ4bmF5VWlrWktzV1pLN0ZlNmJnNWRPVXQ4ZlpIV0cyQkhjKzZFQUFBQUFTVVZPUks1Q1lJST0nKSA5IDkgcmVwZWF0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbjpob3N0IC9kZWVwLyAucGRmVmlld2VyLnJlbW92ZVBhZ2VCb3JkZXJzIC5wYWdlIHtcbiAgbWFyZ2luOiAwcHggYXV0byAxMHB4IGF1dG87XG4gIGJvcmRlcjogbm9uZTtcbn1cbjpob3N0IC9kZWVwLyAucGRmVmlld2VyLnNpbmdsZVBhZ2VWaWV3IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuOmhvc3QgL2RlZXAvIC5wZGZWaWV3ZXIuc2luZ2xlUGFnZVZpZXcgLnBhZ2Uge1xuICBtYXJnaW46IDA7XG4gIGJvcmRlcjogbm9uZTtcbn1cbjpob3N0IC9kZWVwLyAucGRmVmlld2VyIC5wYWdlIGNhbnZhcyB7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogYmxvY2s7XG59XG46aG9zdCAvZGVlcC8gLnBkZlZpZXdlciAucGFnZSAubG9hZGluZ0ljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHVybCgnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoR0FBWUFQUUFBUC8vL3dBQUFNN096dnI2K3VEZzRMQ3dzT2pvNkk2T2pzakl5Snljbk5qWTJLaW9xTURBd1BMeThuWjJkb2FHaHJpNHVHaG9hQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSC9DMDVGVkZORFFWQkZNaTR3QXdFQUFBQWgvaHBEY21WaGRHVmtJSGRwZEdnZ1lXcGhlR3h2WVdRdWFXNW1id0FoK1FRSkJ3QUFBQ3dBQUFBQUdBQVlBQUFGcmlBZ2ppUUFRV1ZhRGdyNVBPU2drb1REakZFME5vUThpdzhIUVpRVERRakRuNGpoU0FCaEFBT2hvVHFTRGc3cVNVUXd4RWFFd3dGaFhIaEhnek9BMXhzaHhBbmZUem90R1JhSGdsSnFrSmNhVkVxQ2d5b0NCUWtKQlFLRERYUUdEWWFJaW95T2dZU1hBMzZYSWdZTUJXUnpYWm9LQlFVTW1pbDBsZ2FsTFNJQ2xnQnBPMGcrczI2blVXZGRYeW9FRElzQUNxNVNzVE1NRElFQ3dVZEpQdzBNenN1MHFIWWt3NzJiQm1veklRQWgrUVFKQndBQUFDd0FBQUFBR0FBWUFBQUZzQ0FnamlUQU1HVmFEZ1I1SEtRd3FLTnhJS1BqakZDazBLTlhDNkFUS1NJN29BaHhXSWhlendoRU5UQ1FFb2VHQ2RXSVBFZ3pFU0d4RUlnR0JXc3RFVzRRQ0dHQUlKRW94R21HdDVaa2dDUlFRSGtHZDJDRVNvZUlJd29NQlFVTVA0Y05lUVFHRFl1Tmo0aVNiNVdKbm1lR25nMENER2FCbElRRUp6aUhrM3NBQmlkREFIQmdhZ0J1dFNLdkFBb3l1SHVVWUhnQ2tBWnFlYncwQWdMQlF5eXpOS08zYnlOdW9TUzh4OE9md0ljaEFDSDVCQWtIQUFBQUxBQUFBQUFZQUJnQUFBVzRJQ0NPSklBZ1pWb09CSmtrcERLb281RUk0M0dNak5QU29rWENJTktKQ0k0SGNDUklRRVF2cUlPaEdoQkhoVVREaEdvNGRpT1p5RkFvS0VRRHhyYTJtQUVnamdoT3BDZ3ozTFRCSXhKNWtnd01CU2hBQ1JFSFoxVjRLZzFyUzQ0cEJBZ01EQWcvU3cwR0JBUUdEWkdUbFkrWW1weVBwU1FEaXFZaURRb0NsaXFaQnFrR0FnS0lTNWtFalEyMVZ3Q3lwNzZkQkhpTnZ6K01SNzRBcVNPZFZ3YlF1bythYnBwbzEwc3NqZGtBbmMwcmY4dmdsOFlxSVFBaCtRUUpCd0FBQUN3QUFBQUFHQUFZQUFBRnJDQWdqaVFnQ0dWYURnWlpGQ1F4cUtOUktHT1NqTWpSMHFMWFR5Y2lIQTdBa2FMQUNNSUFpd09DMWlBeENyTVRvSEhZaldRaUE0TkJFQTBRMVJwV3hIZzRjTVh4TkRrNE9CeE5Va1BBUUFFWERnbGxLZ016UUExcFNZb3BCZ29uQ2o5SkVBOFJFUThRalkrUlFKT1ZsNHVnb1lzc0JKdU1wWVlqRFFTbGl3YXNpUU93TmFrQUxLcXNxYld2SW9oRm03VjZyUUFHUDYrSlFMbEZnN0tEUUxLSnJMakJLYnZBb3IzSUtpRUFJZmtFQ1FjQUFBQXNBQUFBQUJnQUdBQUFCYlVnSUk0a29DaGxtaG9rdzVERW9JNE5RNHhGTVFvSk80dXVoaWduTWlRV3Z4R0JJUUMrQUpCRVV5VWNJUml5RTZDUjBDbGxXNEhBQnhCVVJUVXc0bkM0RmNXbzVDREJScFFhQ29GN1ZqZ3N5Q1VEWURNTlowbUhkd1lFQkFhR013d0hEZzRIREEyS2pJNHFrSktVaUo2ZmFKa2lBNHFBS1FrUkIzRTBpNllwQXc4UkVSQWpBNHRuQm9NQXBDTVFEaEZUdXlTS29TS01KQXE2ckQ0R3pBU2lKWXRnaTZQVWNzOUtldzB4aDdyTkpNcUloWWNoQUNINUJBa0hBQUFBTEFBQUFBQVlBQmdBQUFXMElDQ09KRUFRWlpvMkpJS1F4cUNPaldDTURETXF4VDJMQWdFTGtCTVpDb1hmeUNCUWlGd2lSc0dwa3UwRXNoTmdVTkF0cllQVDBHUVZOUkJXd1NLQk1wOThQMjRpSVNnTkRBUzRpcEdBNkpVcEEyV0FoRFI0ZVdNL0NBa0hCd2tJRFljR2lUT0xqWStGbVprTmxDTjNlVW9MRG13bERXK0FBd2NPRGw1YllsOHdDVllNRHc1VVd6QnRuQUFORVE4a0JJTTBvQUFHUGdjUkVJUW5WbG9BQ2hFT3FBUmp6Z0FRRWJjemc4WWtXSnE4blNVaEFDSDVCQWtIQUFBQUxBQUFBQUFZQUJnQUFBV3RJQ0NPSkdBWVpab09wS0tRcURvT1JETUt3a2d3dGl3U0JCWUFKMm93R0w1Umd4QnppUVFNZ2t3b01raE5xQUVEQVJQU2FpTURGZERJaVJTRlFvd01YRThaNlJkcFlIV25FQVdHUFZrYWpQbUFSVlpNUFVrQ0JRa0pCUUlOZ3dhRlBvZUppNEdWbFEyUWMzVkpCUWNMVjBwdGZBTUpCd2RjSWwrRllqQUxRZ2ltb0dOV0loQVFaQTRIWFNwTE1ROFBJZ2tPU0h4QVFoRVJQdzdBU1RTRnlDTU1EcUJUSkw4dGYzeTJmQ0VBSWZrRUNRY0FBQUFzQUFBQUFCZ0FHQUFBQmE4Z0lJNGswRFJsbWc2a1laQ29PZzVFREJERWFBaTJqTE8zbkVrZ2tNRUlMNEJMcEJBa1Z5M2hDVEFRS0dBem5NMEFGTkZHQkFiajJjQTlqUWl4Y0daQUdnRUNCdS85SG5UcCtGR2pqZXpKRkF3RkJRd0tlMlorS29DQ2hIbU5qVk1xQTIxbktRd0pFSlJsYm5VRkNRbEZYbHBlQ1djR0JVQUNDd2xyZHc4UktHSW1Cd2t0ZHlNUUVRY2lCN29BQ3djSWVBNFJWd0FPRGlJR3ZIUUtFUkFqeHlNSUI1UWxWU1RMWUxaMHNXOGhBQ0g1QkFrSEFBQUFMQUFBQUFBWUFCZ0FBQVcwSUNDT0pOQTBaWm9PcEdHUXJEb09CQ29TeE5nUXNRemdNWnlJbHZPSmRpK0FTMlNveVhySzR1bVdQTTV3TmlWMFVEVUlCTmtkb2VwVGZNa0E3dGhJRUNpeVJ0VUFHcThmbTJPNGpJQmdNQkExZUFaNktueCtnSGFKUjRRd2RDTUtCeEVKUmdnRkRHZ1FFUkVQampBTUJRVUtJd0lSRGhCREMyUU5EREVLb0VrRG9pTUhEaWdJQ0drSkJTMmREQTZUQUFuQUVBa0NkUThPUlFjSFRBa0xjUVFPRExQTUlnSUphQ1d4Sk1Ja1BJb0F0M0VoQUNINUJBa0hBQUFBTEFBQUFBQVlBQmdBQUFXdElDQ09KTkEwWlpvT3BHR1FyRG9PQkNvU3hOZ1FzUXpnTVp5SWx2T0pkaStBUzJTb3lYcks0dW1XSE01d05pVjBVTjN4ZExpcXIrbUVOY1dwTTlUSWJyc0JrRWNrOG9DMERRcUJRR0dJeit0M2VYdG9iMFpUUGdOckl3UUpEZ3RHQWd3Q1dTSU1EZzRIaWlVSURBeEZBQW9PRHd4REJXSU5DRUdkU1RRa0NRY29lZ0FEQmFRNk1nZ0hqd0FGQlpVRkNtMEhCMGtKQ1V5OWJBWUhDQ1BHSXdxbVJxMGp5U01HbWo2eVJpRUFJZmtFQ1FjQUFBQXNBQUFBQUJnQUdBQUFCYklnSUk0azBEUmxtZzZrWVpDc09nNEVLaExFMkJDeERPQXhuSWlXODRsMkw0QkxaS2lwQm9wVzhYUkxEa2VDaUFNeU12UUFBK3VPTjRKRUlvK3ZxdWtrS1E2UmhMSHBsVkdOK0x5S2NYQTREZ3g1RFd3R0RYeCtnSUtFTm5xTmR6SURhaU1FQ3djRlJnUUNDb3dpQ0FjSENaSWxDZ0lDVmdTZkNFTU1uQTBDWGFVMllTUUZvUUFLVVFNTXFqb3lBZ2xjQUF5QkFBSU1SVVlMQ1VrRmx5YkRlQVlKcnlMTms2eEdOQ1RRWFkwanVIZ2hBQ0g1QkFrSEFBQUFMQUFBQUFBWUFCZ0FBQVd6SUNDT0pOQTBaVm9PQW1rWTVLQ1NTZ1NOQkRFMmhEeUxqb2hDbEJNTmlqOFJKSElRdlp3RVZPcElla1JRSnlKczVBTW9IQStHTWJFMWxubTlFY1BoT0hSbmhwd1VsM0Fza25IRG01Uk4rdjhxQ0FrSEJ3a0lmdzF4QkFZTmdvU0dpSXFNZ0pRaWZaVWpCaEFKWWo5NWV3SUpDUVY3S1lwekJBa0xMUUFEQ0hPdE9wWTVQZ05sQUF5a0FFVXNRMXd6Q2dXZENJZGVBcmN6QlFWYkRKME5BcXllQmI2NG5RQUdBckJUdDhSOG1MdXlQeUVBT3dBQUFBQUFBQUFBQUE9PScpIGNlbnRlciBuby1yZXBlYXQ7XG59XG5gXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQZGZWaWV3ZXJDb21wb25lbnRPc2thciBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgc3RhdGljIENTU19VTklUUzogbnVtYmVyID0gOTYuMCAvIDcyLjA7XG5cbiAgcHJpdmF0ZSBfcmVuZGVyVGV4dDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3N0aWNrVG9QYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX29yaWdpbmFsU2l6ZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3BkZjogUERGRG9jdW1lbnRQcm94eTtcbiAgcHJpdmF0ZSBfcGFnZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfem9vbTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfcm90YXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3Nob3dBbGw6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF9jYW5BdXRvUmVzaXplOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfZml0VG9QYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2V4dGVybmFsTGlua1RhcmdldDogc3RyaW5nID0gJ2JsYW5rJztcbiAgcHJpdmF0ZSBfcGRmVmlld2VyOiBhbnk7XG4gIHByaXZhdGUgX3BkZkxpbmtTZXJ2aWNlOiBhbnk7XG4gIHByaXZhdGUgbGFzdExvYWRlZDogc3RyaW5nIHwgVWludDhBcnJheSB8IFBERlNvdXJjZTtcbiAgcHJpdmF0ZSByZXNpemVUaW1lb3V0OiBOb2RlSlMuVGltZXI7XG5cbiAgQE91dHB1dCgnYWZ0ZXItbG9hZC1jb21wbGV0ZScpIGFmdGVyTG9hZENvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxQREZEb2N1bWVudFByb3h5PigpO1xuICBAT3V0cHV0KCdlcnJvcicpIG9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnb24tcHJvZ3Jlc3MnKSBvblByb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxQREZQcm9ncmVzc0RhdGE+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgaWYgKCFpc1NTUigpKSB7XG4gICAgICBQREZKUy53b3JrZXJTcmMgPSBgaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvcGRmLmpzLyR7IChQREZKUyBhcyBhbnkpLnZlcnNpb24gfS9wZGYud29ya2VyLm1pbi5qc2A7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCFpc1NTUigpKSB7XG4gICAgICB0aGlzLnNldHVwVmlld2VyKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFtdKVxuICBwdWJsaWMgb25QYWdlUmVzaXplKCkge1xuICAgIGlmICghdGhpcy5fY2FuQXV0b1Jlc2l6ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlc2l6ZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVTaXplKCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoaXNTU1IoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgnc3JjJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLmxvYWRQREYoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BkZikge1xuICAgICAgaWYgKCdyZW5kZXJUZXh0JyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuc2V0dXBWaWV3ZXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc3JjOiBzdHJpbmc7XG5cbiAgQElucHV0KCdwYWdlJylcbiAgc2V0IHBhZ2UoX3BhZ2UpIHtcbiAgICBfcGFnZSA9IHBhcnNlSW50KF9wYWdlLCAxMCk7XG5cbiAgICBpZiAodGhpcy5fcGRmICYmICF0aGlzLmlzVmFsaWRQYWdlTnVtYmVyKF9wYWdlKSkge1xuICAgICAgX3BhZ2UgPSAxO1xuICAgIH1cblxuICAgIHRoaXMuX3BhZ2UgPSBfcGFnZTtcbiAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdChfcGFnZSk7XG4gIH1cblxuICBAT3V0cHV0KCkgcGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4odHJ1ZSk7XG5cbiAgQElucHV0KCdyZW5kZXItdGV4dCcpXG4gIHNldCByZW5kZXJUZXh0KHJlbmRlclRleHQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW5kZXJUZXh0ID0gcmVuZGVyVGV4dDtcbiAgfVxuXG4gIEBJbnB1dCgnb3JpZ2luYWwtc2l6ZScpXG4gIHNldCBvcmlnaW5hbFNpemUob3JpZ2luYWxTaXplOiBib29sZWFuKSB7XG4gICAgdGhpcy5fb3JpZ2luYWxTaXplID0gb3JpZ2luYWxTaXplO1xuICB9XG5cbiAgQElucHV0KCdzaG93LWFsbCcpXG4gIHNldCBzaG93QWxsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0FsbCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCdzdGljay10by1wYWdlJylcbiAgc2V0IHN0aWNrVG9QYWdlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RpY2tUb1BhZ2UgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgnem9vbScpXG4gIHNldCB6b29tKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3pvb20gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB6b29tKCkge1xuICAgIHJldHVybiB0aGlzLl96b29tO1xuICB9XG5cbiAgQElucHV0KCdyb3RhdGlvbicpXG4gIHNldCByb3RhdGlvbih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCEodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB2YWx1ZSAlIDkwID09PSAwKSkge1xuICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIHBhZ2VzIHJvdGF0aW9uIGFuZ2xlLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3JvdGF0aW9uID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2V4dGVybmFsLWxpbmstdGFyZ2V0JylcbiAgc2V0IGV4dGVybmFsTGlua1RhcmdldCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZXh0ZXJuYWxMaW5rVGFyZ2V0ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoJ2F1dG9yZXNpemUnKVxuICBzZXQgYXV0b3Jlc2l6ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NhbkF1dG9SZXNpemUgPSBCb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgnZml0LXRvLXBhZ2UnKVxuICBzZXQgZml0VG9QYWdlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml0VG9QYWdlID0gQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBWaWV3ZXIoKSB7XG4gICAgKDxhbnk+UERGSlMpLmRpc2FibGVUZXh0TGF5ZXIgPSAhdGhpcy5fcmVuZGVyVGV4dDtcblxuICAgIFBkZlZpZXdlckNvbXBvbmVudE9za2FyLnNldEV4dGVybmFsTGlua1RhcmdldCh0aGlzLl9leHRlcm5hbExpbmtUYXJnZXQpO1xuXG4gICAgdGhpcy5fcGRmTGlua1NlcnZpY2UgPSBuZXcgKDxhbnk+UERGSlMpLlBERkxpbmtTZXJ2aWNlKCk7XG5cbiAgICBjb25zdCBwZGZPcHRpb25zOiBQREZWaWV3ZXJQYXJhbXMgfCBhbnkgPSB7XG4gICAgICBjb250YWluZXI6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLFxuICAgICAgcmVtb3ZlUGFnZUJvcmRlcnM6IHRydWUsXG4gICAgICBsaW5rU2VydmljZTogdGhpcy5fcGRmTGlua1NlcnZpY2VcbiAgICB9O1xuXG4gICAgdGhpcy5fcGRmVmlld2VyID0gbmV3IFBERkpTLlBERlZpZXdlcihwZGZPcHRpb25zKTtcbiAgICB0aGlzLl9wZGZMaW5rU2VydmljZS5zZXRWaWV3ZXIodGhpcy5fcGRmVmlld2VyKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTaXplKCkge1xuICAgIGlmICghdGhpcy5fc2hvd0FsbCkge1xuICAgICAgdGhpcy5yZW5kZXJQYWdlKHRoaXMuX3BhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BkZi5nZXRQYWdlKHRoaXMuX3BkZlZpZXdlci5jdXJyZW50UGFnZU51bWJlcikudGhlbigocGFnZTogUERGUGFnZVByb3h5KSA9PiB7XG4gICAgICBjb25zdCB2aWV3cG9ydCA9IHBhZ2UuZ2V0Vmlld3BvcnQodGhpcy5fem9vbSwgdGhpcy5fcm90YXRpb24pO1xuICAgICAgbGV0IHNjYWxlID0gdGhpcy5fem9vbTtcbiAgICAgIGxldCBzdGlja1RvUGFnZSA9IHRydWU7XG5cbiAgICAgIC8vIFNjYWxlIHRoZSBkb2N1bWVudCB3aGVuIGl0IHNob3VsZG4ndCBiZSBpbiBvcmlnaW5hbCBzaXplIG9yIGRvZXNuJ3QgZml0IGludG8gdGhlIHZpZXdwb3J0XG4gICAgICBpZiAoIXRoaXMuX29yaWdpbmFsU2l6ZSB8fCAodGhpcy5fZml0VG9QYWdlICYmIHZpZXdwb3J0LndpZHRoID4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpKSB7XG4gICAgICAgIHNjYWxlID0gdGhpcy5nZXRTY2FsZShwYWdlLmdldFZpZXdwb3J0KDEpLndpZHRoKTtcbiAgICAgICAgc3RpY2tUb1BhZ2UgPSAhdGhpcy5fc3RpY2tUb1BhZ2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3BkZlZpZXdlci5fc2V0U2NhbGUoc2NhbGUsIHN0aWNrVG9QYWdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZFBhZ2VOdW1iZXIocGFnZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3BkZi5udW1QYWdlcyA+PSBwYWdlICYmIHBhZ2UgPj0gMTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRFeHRlcm5hbExpbmtUYXJnZXQodHlwZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdibGFuayc6XG4gICAgICAgICg8YW55PlBERkpTKS5leHRlcm5hbExpbmtUYXJnZXQgPSAoPGFueT5QREZKUykuTGlua1RhcmdldC5CTEFOSztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdub25lJzpcbiAgICAgICAgKDxhbnk+UERGSlMpLmV4dGVybmFsTGlua1RhcmdldCA9ICg8YW55PlBERkpTKS5MaW5rVGFyZ2V0Lk5PTkU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgICg8YW55PlBERkpTKS5leHRlcm5hbExpbmtUYXJnZXQgPSAoPGFueT5QREZKUykuTGlua1RhcmdldC5TRUxGO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BhcmVudCc6XG4gICAgICAgICg8YW55PlBERkpTKS5leHRlcm5hbExpbmtUYXJnZXQgPSAoPGFueT5QREZKUykuTGlua1RhcmdldC5QQVJFTlQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgKDxhbnk+UERGSlMpLmV4dGVybmFsTGlua1RhcmdldCA9ICg8YW55PlBERkpTKS5MaW5rVGFyZ2V0LlRPUDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkUERGKCkge1xuICAgIGlmICghdGhpcy5zcmMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0TG9hZGVkID09PSB0aGlzLnNyYykge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJ0aGlzLnNyYyAtPiBcIiwgdGhpcy5zcmMpO1xuICAgIGxldCBsb2FkaW5nVGFzazogYW55ID0gUERGSlMuZ2V0RG9jdW1lbnQodGhpcy5zcmMpO1xuXG4gICAgbG9hZGluZ1Rhc2sub25Qcm9ncmVzcyA9IChwcm9ncmVzc0RhdGE6IFBERlByb2dyZXNzRGF0YSkgPT4ge1xuICAgICAgdGhpcy5vblByb2dyZXNzLmVtaXQocHJvZ3Jlc3NEYXRhKTtcbiAgfTtcblxuICAgIGNvbnN0IHNyYyA9IHRoaXMuc3JjO1xuICAgICg8UERGUHJvbWlzZTxQREZEb2N1bWVudFByb3h5Pj5sb2FkaW5nVGFzay5wcm9taXNlKVxuICAgICAgLnRoZW4oKHBkZjogUERGRG9jdW1lbnRQcm94eSkgPT4ge1xuICAgICAgICB0aGlzLl9wZGYgPSBwZGY7XG4gICAgICAgIHRoaXMubGFzdExvYWRlZCA9IHNyYztcblxuICAgICAgICB0aGlzLmFmdGVyTG9hZENvbXBsZXRlLmVtaXQocGRmKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fc2hvd0FsbCkge1xuICAgICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuXG4gICAgICBpZiAodGhpcy5fcGRmVmlld2VyKSB7XG4gICAgICAgIHRoaXMuX3BkZlZpZXdlci5zZXREb2N1bWVudCh0aGlzLl9wZGYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZGZMaW5rU2VydmljZSkge1xuICAgICAgdGhpcy5fcGRmTGlua1NlcnZpY2Uuc2V0RG9jdW1lbnQodGhpcy5fcGRmLCBudWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2UgPSB0aGlzLl9wYWdlO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl9zaG93QWxsKSB7XG4gICAgICB0aGlzLnJlbmRlck11bHRpcGxlUGFnZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJQYWdlKHRoaXMuX3BhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyTXVsdGlwbGVQYWdlcygpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZFBhZ2VOdW1iZXIodGhpcy5fcGFnZSkpIHtcbiAgICAgIHRoaXMuX3BhZ2UgPSAxO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9yb3RhdGlvbiAhPT0gMCB8fCB0aGlzLl9wZGZWaWV3ZXIucGFnZXNSb3RhdGlvbiAhPT0gdGhpcy5fcm90YXRpb24pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9wZGZWaWV3ZXIucGFnZXNSb3RhdGlvbiA9IHRoaXMuX3JvdGF0aW9uO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0aWNrVG9QYWdlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcGRmVmlld2VyLmN1cnJlbnRQYWdlTnVtYmVyID0gdGhpcy5fcGFnZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQYWdlKHBhZ2VOdW1iZXI6IG51bWJlcikge1xuICAgIHRoaXMuX3BkZi5nZXRQYWdlKHBhZ2VOdW1iZXIpLnRoZW4oIChwYWdlOiBQREZQYWdlUHJveHkpID0+IHtcbiAgICAgIGxldCB2aWV3cG9ydCA9IHBhZ2UuZ2V0Vmlld3BvcnQodGhpcy5fem9vbSwgdGhpcy5fcm90YXRpb24pO1xuICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZGZWaWV3ZXInKTtcbiAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3pvb207XG5cbiAgICAgIC8vIFNjYWxlIHRoZSBkb2N1bWVudCB3aGVuIGl0IHNob3VsZG4ndCBiZSBpbiBvcmlnaW5hbCBzaXplIG9yIGRvZXNuJ3QgZml0IGludG8gdGhlIHZpZXdwb3J0XG4gICAgICBpZiAoIXRoaXMuX29yaWdpbmFsU2l6ZSB8fCAodGhpcy5fZml0VG9QYWdlICYmIHZpZXdwb3J0LndpZHRoID4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpKSB7XG4gICAgICAgIHZpZXdwb3J0ID0gcGFnZS5nZXRWaWV3cG9ydCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIHZpZXdwb3J0LndpZHRoLCB0aGlzLl9yb3RhdGlvbik7XG4gICAgICAgIHNjYWxlID0gdGhpcy5nZXRTY2FsZShwYWdlLmdldFZpZXdwb3J0KDEpLndpZHRoKTtcbiAgICAgIH1cblxuICAgICAgUGRmVmlld2VyQ29tcG9uZW50T3NrYXIucmVtb3ZlQWxsQ2hpbGROb2Rlcyhjb250YWluZXIpO1xuXG4gICAgICAoPGFueT5QREZKUykuZGlzYWJsZVRleHRMYXllciA9ICF0aGlzLl9yZW5kZXJUZXh0O1xuXG4gICAgICBQZGZWaWV3ZXJDb21wb25lbnRPc2thci5zZXRFeHRlcm5hbExpbmtUYXJnZXQodGhpcy5fZXh0ZXJuYWxMaW5rVGFyZ2V0KTtcblxuICAgICAgdGhpcy5fcGRmTGlua1NlcnZpY2UgPSBuZXcgKDxhbnk+UERGSlMpLlBERkxpbmtTZXJ2aWNlKCk7XG5cbiAgICAgIGxldCBwZGZPcHRpb25zOiBQREZWaWV3ZXJQYXJhbXMgfCBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgcmVtb3ZlUGFnZUJvcmRlcnM6IHRydWUsXG4gICAgICAgIGxpbmtTZXJ2aWNlOiB0aGlzLl9wZGZMaW5rU2VydmljZSxcbiAgICAgICAgZGVmYXVsdFZpZXdwb3J0OiB2aWV3cG9ydCxcbiAgICAgICAgc2NhbGUsXG4gICAgICAgIGlkOiB0aGlzLl9wYWdlLFxuICAgICAgICB0ZXh0TGF5ZXJGYWN0b3J5OiBuZXcgKDxhbnk+UERGSlMpLkRlZmF1bHRUZXh0TGF5ZXJGYWN0b3J5KCksXG4gICAgICAgIGFubm90YXRpb25MYXllckZhY3Rvcnk6IG5ldyAoPGFueT5QREZKUykuRGVmYXVsdEFubm90YXRpb25MYXllckZhY3RvcnkoKVxuICAgICAgfTtcblxuICAgICAgbGV0IHBkZlBhZ2VWaWV3ID0gbmV3ICg8YW55PlBERkpTKS5QREZQYWdlVmlldyhwZGZPcHRpb25zKTtcbiAgICAgIHRoaXMuX3BkZkxpbmtTZXJ2aWNlLnNldFZpZXdlcihwZGZQYWdlVmlldyk7XG5cbiAgICAgIGlmICh0aGlzLl9yb3RhdGlvbiAhPT0gMCB8fCBwZGZQYWdlVmlldy5yb3RhdGlvbiAhPT0gdGhpcy5fcm90YXRpb24pIHtcbiAgICAgICAgcGRmUGFnZVZpZXcucm90YXRpb24gPSB0aGlzLl9yb3RhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcGRmUGFnZVZpZXcuc2V0UGRmUGFnZShwYWdlKTtcbiAgICAgIHJldHVybiBwZGZQYWdlVmlldy5kcmF3KCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlQWxsQ2hpbGROb2RlcyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNjYWxlKHZpZXdwb3J0V2lkdGgpIHtcbiAgICBjb25zdCBvZmZzZXRXaWR0aCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHJldHVybiB0aGlzLl96b29tICogKG9mZnNldFdpZHRoIC8gdmlld3BvcnRXaWR0aCkgLyBQZGZWaWV3ZXJDb21wb25lbnRPc2thci5DU1NfVU5JVFM7XG4gIH1cbn1cbiJdfQ==
