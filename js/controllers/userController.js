var app = app || {};

app.userController = (function () {
    function UserController(view, model) {
        this.view = view;
        this.model = model;
    }
    
    
    UserController.prototype.loadLogin = function (selector) {
        this.view.showLogin(selector);
    }
    UserController.prototype.loadRegister = function (selector) {
        this.view.showRegister(selector);
    }
    
    UserController.prototype.login = function (data) {
        return this.model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;
                location.href = '#/';
            })
    }
    UserController.prototype.register = function (data) {
        return this.model.register(data)
    }
    UserController.prototype.logout = function () {
        return this.model.logout()
            .then(function () {
                sessionStorage.clear();
                location.href = '#/';
            })
    }


    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
})();