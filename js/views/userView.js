var app = app || {};

app.userView = (function () {
    function showLogin(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#login-button').click(function () {
               var username = $('#username').val();
               var password = $('#password').val();
               var data = { username: username, password: password };
               Sammy(function () {
                    this.trigger('login', data);
                })
            })
        })
    }

    function showRegister(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#register-button').click(function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var confpassword = $('#confirm-password').val();
                var data = { username: username, password: password };
                if(password===confpassword)
                {Sammy(function () {
                    this.trigger('register', data);
                })}
                else {
                    alert('passwords dont match!');
                    //TODO
                }
            })

        })
    }



    return {
        load: function () {
            return {
                showLogin: showLogin,
                showRegister: showRegister
            }
        }
    }
})();