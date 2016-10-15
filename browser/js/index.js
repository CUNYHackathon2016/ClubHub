$(function() {
    function login (email, password) {
        $.post('/login', {
            email: email,
            password: password
        })
        .done(function (data) {
            console.log(data);
            $('#userid').text("Hello, " + data.user.username);
        })
        .fail(function(data) {
            $('#userid').text("Error: " + data.responseText);
            console.log(data);
            console.log("ERROR");
        })
    }

    $('#login-button').click(function() {
        login($('#email_modal').val(), $('#password_modal').val())
    });

    $('#signup').click(function() {
        var credentials = {
            username: $('#name').val(),
            email: $('#signup-email').val(),
            password: $('#signup-password').val()
        }
        console.log(credentials);
        $.post('/api/user', credentials)
        .done(function() {
            login($('#signup-email').val(), $('#signup-password').val())
        })
        .fail(function (data) {
            $('#userid').text("That Username or Email is already taken!");
        })
    })


    $('#logout').click(function() {
        $.get('/logout')
        .done(function() {
            $('#userid').text("Login or Signup Below!");
        })
    })


});