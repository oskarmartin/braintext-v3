"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var auth_guard_1 = require("./_guards/auth.guard");
var user_service_1 = require("./_services/user.service");
var alert_service_1 = require("./_services/alert.service");
var authentication_service_1 = require("./_services/authentication.service");
var file_service_1 = require("./_services/file.service");
var sentence_service_1 = require("./_services/sentence.service");
var click_service_1 = require("./_services/click.service");
var window_service_1 = require("./_services/window.service");
var side_menu_component_1 = require("./side-menu/side-menu.component");
var landing_component_1 = require("./landing/landing.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var admin_component_1 = require("./admin/admin.component");
var fileupload_component_1 = require("./_directives/fileupload.component");
var archive_menu_component_1 = require("./archive-menu/archive-menu.component");
var editor_menu_component_1 = require("./editor-menu/editor-menu.component");
var source_files_component_1 = require("./source-files/source-files.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var archive_file_component_1 = require("./archive-file/archive-file.component");
var alert_component_1 = require("./alert/alert.component");
var saved_files_component_1 = require("./saved-files/saved-files.component");
var archive_confirmation_component_1 = require("./archive-confirmation/archive-confirmation.component");
var keyspipe_pipe_1 = require("./_pipes/keyspipe.pipe");
var sidemenutext_pipe_1 = require("./_pipes/sidemenutext.pipe");
var ng2_pdf_viewer_1 = require("ng2-pdf-viewer");
var pdf_viewer_component_1 = require("./_directives/pdf-viewer.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.appRouting,
                ng2_pdf_viewer_1.PdfViewerModule,
                animations_1.BrowserAnimationsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                alert_component_1.AlertComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                admin_component_1.AdminComponent,
                fileupload_component_1.FileUploadComponent,
                pdf_viewer_component_1.PdfViewerComponentOskar,
                landing_component_1.LandingComponent,
                side_menu_component_1.SidemenuComponent,
                archive_menu_component_1.ArchivemenuComponent,
                editor_menu_component_1.EditorMenuComponent,
                source_files_component_1.SourceFilesComponent,
                dashboard_component_1.DashboardComponent,
                archive_file_component_1.ArchiveFileComponent,
                saved_files_component_1.SavedFilesComponent,
                archive_confirmation_component_1.ArchiveConfirmationComponent,
                keyspipe_pipe_1.KeysPipe,
                sidemenutext_pipe_1.sideMenuTextPipe
            ],
            providers: [
                auth_guard_1.AuthGuard,
                alert_service_1.AlertService,
                authentication_service_1.AuthenticationService,
                user_service_1.UserService,
                file_service_1.FileService,
                sentence_service_1.SentenceService,
                click_service_1.ClickService,
                window_service_1.WINDOW_PROVIDERS,
                /*fakeBackendProvider,
                MockBackend,*/
                http_2.BaseRequestOptions
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
;

//# sourceMappingURL=app.module.js.map
