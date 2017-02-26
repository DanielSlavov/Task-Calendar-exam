var app = app || {};

app.homeView = (function () {

    function showWelcomeGuest(selector) {
        $.get('templates/welcome-guest.html', function (templ) {
            $(selector).html(templ);
        })
    }
    function showWelcomeUser(selector, data) {
        $.get('templates/welcome-user.html', function (templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }





    return {
        load: function () {
            return {
                showWelcomeGuest: showWelcomeGuest,
                showWelcomeUser: showWelcomeUser
            }
        }
    }
})();