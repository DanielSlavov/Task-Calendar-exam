var app = app || {};

(function () {

    app.router = Sammy(function () {
        var selector = '#container';
        var requester = app.requester.load('kid_byoWjyaOkb', '9703fb2b1af04bccb39c226282ca7271', 'https://baas.kinvey.com/');

        var homeView = app.homeView.load();
        var homeController = app.homeController.load(homeView);

        var userView = app.userView.load();
        var userModel = app.userModel.load(requester);
        var userController = app.userController.load(userView, userModel);

        var lecturesView = app.lecturesView.load();
        var lecturesModel = app.lecturesModel.load(requester);
        var lecturesController = app.lecturesController.load(lecturesView, lecturesModel);
        //end of declarations
        
        
        this.before(function () {
            if (!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $('#menu').html(templ);
                })
            }
            else {
                $.get('templates/menu-home.html', function (templ) {
                    $('#menu').html(templ);
                })
            }
        })
        this.get('#/', function () {
            if (!sessionStorage['sessionId']) {
                homeController.loadWelcomeGuest(selector);
            }
            else {
                homeController.loadWelcomeUser(selector);
            }
        })
        this.get('#/login/', function () {
            userController.loadLogin(selector);
        })
        this.get('#/register/', function () {
            userController.loadRegister(selector);
        })
        this.get('#/logout/', function () {
            userController.logout();
        })
        this.get('#/calendar/list/', function () {
            lecturesController.loadCalendar(selector);
        })
        this.get('#/calendar/my/', function () {
            lecturesController.loadMyCalendar(selector);
        })
        this.get('#/calendar/add/', function () {
            lecturesController.loadAdd(selector);
        })




        this.bind('proccessDelete', function (ev, data) {
            lecturesController.deleteEvent(data);
            this.redirect('#/calendar/my')
        })
        this.bind('proccessEdit', function (ev, data) {
 
            lecturesController.editEvent(data).then(function (success) {
                this.redirect('#/calendar/my/');
            })
        })
        
        
        
        this.bind('delete', function (ev, data) {
            lecturesController.loadDelete(selector, data);
        })
        this.bind('edit', function (ev, data) {
            lecturesController.loadEdit(selector, data);
        })
        this.bind('login', function (ev, data) {
            userController.login(data)
        })
        this.bind('register', function (ev, data) {
            userController.register(data).then(function () {
                Sammy(function () {
                    this.trigger('login', data);
                })
            })
        })
        this.bind('add', function (ev, data) {
            lecturesController.add(data).then(function () {
              this.redirect('#/calendar/my/');
            })
        })


    })
    app.router.run('#/');
})();