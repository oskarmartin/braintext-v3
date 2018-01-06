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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Subject_1 = require("rxjs/Subject");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.isLoggedIn = new Subject_1.Subject();
        this.isLoggedIn$ = this.isLoggedIn.asObservable();
    }
    AuthenticationService.prototype.createHeaders = function (headers) {
        headers.append('Content-Type', 'application/json');
    };
    AuthenticationService.prototype.login = function (username, password) {
        console.log(username, password);
        var headers = new http_1.Headers();
        this.createHeaders(headers);
        return this.http.post('/auth/login', JSON.stringify({
            username: username,
            password: password
        }), { headers: headers }).map(function (response) {
            console.log(response.json());
            var token = response.json().token;
            var id = response.json().id;
            var firstname = response.json().firstname;
            var lastname = response.json().lastname;
            if (id) {
                localStorage.setItem('user', JSON.stringify(id));
                console.log(JSON.parse(localStorage.getItem('user')));
            }
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
                console.log(JSON.parse(localStorage.getItem('token')));
            }
            if (firstname) {
                localStorage.setItem('firstname', JSON.stringify(firstname));
            }
            if (lastname) {
                localStorage.setItem('lastname', JSON.stringify(lastname));
            }
            return response.json();
        });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem('token');
        //console.log("This is the token -> ", JSON.parse(token));
        if (token) {
            this.isLoggedIn.next(true);
            return true;
        }
        else {
            this.isLoggedIn.next(false);
            return false;
        }
    };
    AuthenticationService.prototype.destroySession = function () {
        this.isLoggedIn.next(false);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9fc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsaUNBQStCO0FBQy9CLHdDQUF1QztBQUd2QztJQUtJLCtCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh0QixlQUFVLEdBQUcsSUFBSSxpQkFBTyxFQUFXLENBQUM7UUFDNUMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRVgsQ0FBQztJQUVuQyw2Q0FBYSxHQUFiLFVBQWMsT0FBZ0I7UUFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQscUNBQUssR0FBTCxVQUFNLFFBQWdCLEVBQUUsUUFBZ0I7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoRCxRQUFRLEVBQUMsUUFBUTtZQUNqQixRQUFRLEVBQUMsUUFBUTtTQUNwQixDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFrQjtZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUM1QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzFDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFFeEMsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDSCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDTixZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzRCxDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFDVixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakUsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0JBQ1QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUM7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELHNDQUFNLEdBQU47UUFDSSxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDSSxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLDBEQUEwRDtRQUMxRCxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBQ0QsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUE3RFEscUJBQXFCO1FBRGpDLGlCQUFVLEVBQUU7eUNBTWlCLFdBQUk7T0FMckIscUJBQXFCLENBK0RqQztJQUFELDRCQUFDO0NBL0RELEFBK0RDLElBQUE7QUEvRFksc0RBQXFCIiwiZmlsZSI6ImFwcC9fc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZXtcblxuICAgIHByaXZhdGUgaXNMb2dnZWRJbiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgaXNMb2dnZWRJbiQgPSB0aGlzLmlzTG9nZ2VkSW4uYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4gICAgY3JlYXRlSGVhZGVycyhoZWFkZXJzOiBIZWFkZXJzKXtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgfVxuXG4gICAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyl7XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVIZWFkZXJzKGhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hdXRoL2xvZ2luJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdXNlcm5hbWU6dXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDpwYXNzd29yZFxuICAgICAgICB9KSwge2hlYWRlcnM6IGhlYWRlcnN9KS5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHJlc3BvbnNlLmpzb24oKS50b2tlbjtcbiAgICAgICAgICAgIGxldCBpZCA9IHJlc3BvbnNlLmpzb24oKS5pZDtcbiAgICAgICAgICAgIGxldCBmaXJzdG5hbWUgPSByZXNwb25zZS5qc29uKCkuZmlyc3RuYW1lO1xuICAgICAgICAgICAgbGV0IGxhc3RuYW1lID0gcmVzcG9uc2UuanNvbigpLmxhc3RuYW1lO1xuXG4gICAgICAgICAgICBpZihpZCl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShpZCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodG9rZW4pe1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KHRva2VuKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihmaXJzdG5hbWUpe1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmaXJzdG5hbWUnLCBKU09OLnN0cmluZ2lmeShmaXJzdG5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGxhc3RuYW1lKXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdG5hbWUnLCBKU09OLnN0cmluZ2lmeShsYXN0bmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgbG9nb3V0KCl7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcicpO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpe1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGhpcyBpcyB0aGUgdG9rZW4gLT4gXCIsIEpTT04ucGFyc2UodG9rZW4pKTtcbiAgICAgICAgaWYodG9rZW4pe1xuICAgICAgICAgICAgdGhpcy5pc0xvZ2dlZEluLm5leHQodHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlc3Ryb3lTZXNzaW9uKCl7XG4gICAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcbiAgICB9XG5cbn1cbiJdfQ==
