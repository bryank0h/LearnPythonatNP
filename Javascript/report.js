$(document).ready(function() {
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    // Auto fill in user's username and email
    $("#username").text(userinfo.username);
    $("#email").text(userinfo.email);

    // Focus events
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

    // After clicking submit, thank you popup is displayed
    $("#submit").click(function (e) {
        e.preventDefault();
        if ($("form")[0].checkValidity()) {
            Swal.fire(
                'The issue has been reported.<br>Thank you!',
                `Issue reported:<br>${$("textarea").val()}`,
                'success'
            ).then(function () {
                window.location.assign("main-menu.html");
            })
        }       
    })
})