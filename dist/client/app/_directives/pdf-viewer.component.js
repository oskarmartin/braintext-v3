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

//# sourceMappingURL=pdf-viewer.component.js.map
