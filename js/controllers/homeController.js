var app = app || {};

app.homeController = (function () {
    function HomeController(view, model) {
        this.view = view;
        this.model = model;
    }
    
    HomeController.prototype.loadWelcomeGuest = function (selector) {
        this.view.showWelcomeGuest(selector);
    }
    HomeController.prototype.loadWelcomeUser = function (selector) {
        var username = sessionStorage['username'];
        this.view.showWelcomeUser(selector,{username:username});
    }


    return {
        load: function (view, model) {
            return new HomeController(view,model);
        }
    }
})();
