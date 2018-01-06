"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Angular imports
var router_1 = require("@angular/router");
//Components
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var landing_component_1 = require("./landing/landing.component");
var source_files_component_1 = require("./source-files/source-files.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var saved_files_component_1 = require("./saved-files/saved-files.component");
//Guards
var auth_guard_1 = require("./_guards/auth.guard");
var appRoutes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
            { path: 'files', component: source_files_component_1.SourceFilesComponent },
            { path: 'saved', component: saved_files_component_1.SavedFilesComponent }
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: '**', redirectTo: '' }
];
exports.appRouting = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

//# sourceMappingURL=app.routing.js.map
