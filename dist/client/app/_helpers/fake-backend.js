"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
function fakeBackendFactory(backend, options, realBackEnd) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    backend.connections.subscribe(function (connection) {
        setTimeout(function () {
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method == http_1.RequestMethod.Post) {
                var params_1 = JSON.parse(connection.request.getBody());
                var filteredUsers = users.filter(function (user) {
                    return user.username === params_1.username && user.password === params_1.password;
                });
                if (filteredUsers.length) {
                    var user = filteredUsers[0];
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: "fake-jwt-token"
                        }
                    })));
                }
                else {
                    connection.mockError(new Error("Username or password incorrect!"));
                }
                return;
            }
            if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: users
                    })));
                }
                else {
                    connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                        status: 401
                    })));
                }
                return;
            }
            if (connection.request.url.endsWith('/api/users') && connection.request.method === http_1.RequestMethod.Post) {
                var newUser_1 = JSON.parse(connection.request.getBody());
                var duplicateUser = users.filter(function (user) {
                    return user.username === newUser_1.username;
                }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error("Username: " + newUser_1.username + " is already taken!"));
                }
                newUser_1.id = users.length + 1;
                users.push(newUser_1);
                localStorage.setItem('users', JSON.stringify(users));
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    status: 200
                })));
                return true;
            }
            var realHttp = new http_1.Http(realBackEnd, options);
            var requestOptions = new http_1.RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe(function (response) {
                connection.mockRespond(response);
            }, function (error) {
                connection.mockError(error);
            });
        }, 500);
    });
    return new http_1.Http(backend, options);
}
exports.fakeBackendFactory = fakeBackendFactory;
;
exports.fakeBackendProvider = {
    provide: http_1.Http,
    useFactory: fakeBackendFactory,
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions, http_1.XHRBackend]
};

//# sourceMappingURL=fake-backend.js.map
