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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLDhEQUEwRDtBQUMxRCx3Q0FBNkM7QUFDN0Msc0NBQTJDO0FBQzNDLG1FQUErRTtBQU0vRSxzQ0FBbUQ7QUFFbkQsaURBQStDO0FBQy9DLDZDQUEyQztBQUczQyxtREFBaUQ7QUFDakQseURBQXVEO0FBQ3ZELDJEQUF5RDtBQUN6RCw2RUFBMkU7QUFDM0UseURBQXVEO0FBQ3ZELGlFQUErRDtBQUMvRCwyREFBeUQ7QUFDekQsNkRBQThEO0FBRTlELHVFQUFvRTtBQUNwRSxpRUFBK0Q7QUFDL0Qsd0RBQXNEO0FBQ3RELDJEQUF5RDtBQUN6RCxvRUFBa0U7QUFDbEUsMkRBQXlEO0FBQ3pELDJFQUF5RTtBQUN6RSxnRkFBNkU7QUFDN0UsNkVBQTBFO0FBQzFFLGdGQUE2RTtBQUM3RSx1RUFBcUU7QUFDckUsZ0ZBQTZFO0FBQzdFLDJEQUF5RDtBQUN6RCw2RUFBMEU7QUFDMUUsd0dBQXFHO0FBRXJHLHdEQUFrRDtBQUNsRCxnRUFBOEQ7QUFFOUQsaURBQWlEO0FBQ2pELDJFQUE2RTtBQXFEN0U7SUFBQTtJQUF3QixDQUFDO0lBQVosU0FBUztRQWhEckIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlCQUFVO2dCQUNWLGdDQUFhO2dCQUNiLG1CQUFXO2dCQUNYLHdCQUFVO2dCQUNWLGdDQUFlO2dCQUNmLG9DQUF1QjthQUMxQjtZQUNELFlBQVksRUFBQztnQkFDVCw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYixnQ0FBYztnQkFDZCxzQ0FBaUI7Z0JBQ2pCLGdDQUFjO2dCQUNkLDBDQUFtQjtnQkFDbkIsOENBQXVCO2dCQUN2QixvQ0FBZ0I7Z0JBQ2hCLHVDQUFpQjtnQkFDakIsNkNBQW9CO2dCQUNwQiwyQ0FBbUI7Z0JBQ25CLDZDQUFvQjtnQkFDcEIsd0NBQWtCO2dCQUNsQiw2Q0FBb0I7Z0JBQ3BCLDJDQUFtQjtnQkFDbkIsNkRBQTRCO2dCQUM1Qix3QkFBUTtnQkFDUixvQ0FBZ0I7YUFFbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asc0JBQVM7Z0JBQ1QsNEJBQVk7Z0JBQ1osOENBQXFCO2dCQUNyQiwwQkFBVztnQkFDWCwwQkFBVztnQkFDWCxrQ0FBZTtnQkFDZiw0QkFBWTtnQkFDWixpQ0FBZ0I7Z0JBRWhCOzhCQUNjO2dCQUNkLHlCQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBQyxDQUFDLDRCQUFZLENBQUM7U0FDM0IsQ0FBQztPQUVXLFNBQVMsQ0FBRztJQUFELGdCQUFDO0NBQXpCLEFBQXlCLElBQUE7QUFBWiw4QkFBUztBQUFHLENBQUMiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XG4vL2ltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG4vL2Zha2UgYmFjay1lbmRcbmltcG9ydCB7IGZha2VCYWNrZW5kUHJvdmlkZXIgfSBmcm9tIFwiLi9faGVscGVycy9mYWtlLWJhY2tlbmRcIjtcbmltcG9ydCB7IE1vY2tCYWNrZW5kLCBNb2NrQ29ubmVjdGlvbiB9IGZyb20gXCJAYW5ndWxhci9odHRwL3Rlc3RpbmdcIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IGFwcFJvdXRpbmcgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuXG5cbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gXCIuL19ndWFyZHMvYXV0aC5ndWFyZFwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9fc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tIFwiLi9fc2VydmljZXMvYWxlcnQuc2VydmljZVwiO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vX3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpbGVTZXJ2aWNlIH0gZnJvbSAnLi9fc2VydmljZXMvZmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbnRlbmNlU2VydmljZSB9IGZyb20gJy4vX3NlcnZpY2VzL3NlbnRlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2xpY2tTZXJ2aWNlIH0gZnJvbSAnLi9fc2VydmljZXMvY2xpY2suc2VydmljZSc7XG5pbXBvcnQgeyBXSU5ET1dfUFJPVklERVJTIH0gZnJvbSAnLi9fc2VydmljZXMvd2luZG93LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTaWRlbWVudUNvbXBvbmVudCB9IGZyb20gJy4vc2lkZS1tZW51L3NpZGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGFuZGluZ0NvbXBvbmVudCB9IGZyb20gJy4vbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkNvbXBvbmVudCB9IGZyb20gJy4vYWRtaW4vYWRtaW4uY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL19kaXJlY3RpdmVzL2ZpbGV1cGxvYWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFyY2hpdmVtZW51Q29tcG9uZW50IH0gZnJvbSAnLi9hcmNoaXZlLW1lbnUvYXJjaGl2ZS1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0b3JNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9lZGl0b3ItbWVudS9lZGl0b3ItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU291cmNlRmlsZXNDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS1maWxlcy9zb3VyY2UtZmlsZXMuY29tcG9uZW50JztcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gJy4vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJjaGl2ZUZpbGVDb21wb25lbnQgfSBmcm9tICcuL2FyY2hpdmUtZmlsZS9hcmNoaXZlLWZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSBcIi4vYWxlcnQvYWxlcnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTYXZlZEZpbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9zYXZlZC1maWxlcy9zYXZlZC1maWxlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXJjaGl2ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYXJjaGl2ZS1jb25maXJtYXRpb24vYXJjaGl2ZS1jb25maXJtYXRpb24uY29tcG9uZW50JztcblxuaW1wb3J0IHsgS2V5c1BpcGUgfSBmcm9tICcuL19waXBlcy9rZXlzcGlwZS5waXBlJztcbmltcG9ydCB7IHNpZGVNZW51VGV4dFBpcGUgfSBmcm9tIFwiLi9fcGlwZXMvc2lkZW1lbnV0ZXh0LnBpcGVcIjtcblxuaW1wb3J0IHsgUGRmVmlld2VyTW9kdWxlIH0gZnJvbSAnbmcyLXBkZi12aWV3ZXInO1xuaW1wb3J0IHsgUGRmVmlld2VyQ29tcG9uZW50T3NrYXIgfSBmcm9tICcuL19kaXJlY3RpdmVzL3BkZi12aWV3ZXIuY29tcG9uZW50JztcblxuXG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEh0dHBNb2R1bGUsXG4gICAgICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBhcHBSb3V0aW5nLFxuICAgICAgICBQZGZWaWV3ZXJNb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6W1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEFsZXJ0Q29tcG9uZW50LFxuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIEFkbWluQ29tcG9uZW50LFxuICAgICAgICBGaWxlVXBsb2FkQ29tcG9uZW50LFxuICAgICAgICBQZGZWaWV3ZXJDb21wb25lbnRPc2thcixcbiAgICAgICAgTGFuZGluZ0NvbXBvbmVudCxcbiAgICAgICAgU2lkZW1lbnVDb21wb25lbnQsXG4gICAgICAgIEFyY2hpdmVtZW51Q29tcG9uZW50LFxuICAgICAgICBFZGl0b3JNZW51Q29tcG9uZW50LFxuICAgICAgICBTb3VyY2VGaWxlc0NvbXBvbmVudCxcbiAgICAgICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgICAgICBBcmNoaXZlRmlsZUNvbXBvbmVudCxcbiAgICAgICAgU2F2ZWRGaWxlc0NvbXBvbmVudCxcbiAgICAgICAgQXJjaGl2ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCxcbiAgICAgICAgS2V5c1BpcGUsXG4gICAgICAgIHNpZGVNZW51VGV4dFBpcGVcblxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEF1dGhHdWFyZCxcbiAgICAgICAgQWxlcnRTZXJ2aWNlLFxuICAgICAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxuICAgICAgICBGaWxlU2VydmljZSxcbiAgICAgICAgU2VudGVuY2VTZXJ2aWNlLFxuICAgICAgICBDbGlja1NlcnZpY2UsXG4gICAgICAgIFdJTkRPV19QUk9WSURFUlMsXG5cbiAgICAgICAgLypmYWtlQmFja2VuZFByb3ZpZGVyLFxuICAgICAgICBNb2NrQmFja2VuZCwqL1xuICAgICAgICBCYXNlUmVxdWVzdE9wdGlvbnNcbiAgICBdLFxuICAgIGJvb3RzdHJhcDpbQXBwQ29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fTtcbiJdfQ==
