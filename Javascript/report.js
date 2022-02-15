$(document).ready(function() {
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    $("#username").text(userinfo.username);
    $("#email").text(userinfo.email);

    $("textarea").focus(function (e) {
        $(this).css("background-color", "white");       
    })  
    $("textarea").focusout(function (e) {
        if ($(this).val() != "") {
            $(this).css("background-color", "white");
        }
        else {
            $(this).css("background-color", "rgba(255,255,255,0.4)");
        }
    })

    $("#submit").click(function (e) {
        e.preventDefault();
        if ($("form")[0].checkValidity()) {
            Swal.fire(
                'The issue has been reported.<br>Thank you!',
                '',
                'success'
            ).then(function () {
                window.location.assign("main-menu.html");
            })
        }       
    })
})