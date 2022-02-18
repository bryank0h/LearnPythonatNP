$(document).ready(function () {
    // API key
    const APIKEY = "61feb0fc6a79155501021811"

    // Focus events
    $("input").focus(function (e) {
        $(this).css("background-color", "white");       
    })  
    $("input").focusout(function (e) {
        if ($(this).val() != "") {
            $(this).css("background-color", "white");
        }
        else {
            $(this).css("background-color", "rgba(255,255,255,0.4)");
        }
    })
    
    $("#re-password").focusout(function (e) {
        if (($("#password").val()).length != 0) {
            if ($("#re-password").val() != $("#password").val()) {
                $("#Password-error").show();
                $("#submit").prop('disabled', true);
            }
            else {
                $("#Password-error").hide();
                $("#submit").prop('disabled', false);
            }
        }
    })
    $("#password").focusout(function (e) {
        $("#Password-error").hide();
        $("#submit").prop('disabled', false);
    })

    $("input").focus(function (e) {
        $("#Email-error").hide();
        $("#Username-error").hide();
        $("#Password-error").hide();
        $("#submit").prop('disabled', false);
    })

    $("input").focus(function() {
        $("#submit").css("background-color", "rgb(69, 69, 69)");
    })

    // After clicking submit, get all users' data first using GET
    $("#submit").click(function (e) {
        if ($("form")[0].checkValidity()) {
            e.preventDefault(); 
            $("#submit").hide();
            $("lottie-player").show();         
            let username = $("#username").val();
            let email = $("#email").val();
            let password = $("#password").val();
            let settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://learnpythonatnp-b99e.restdb.io/rest/student",
                "method": "GET",
                "headers": {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache"
                },
                "beforeSend": function () {
                    $("#submit").prop("disabled", true)
                }
            }
            // After getting data, check if username or email already exists
            $.ajax(settings).done(function (response) {
                catchflag = false;
                for (let i = 0; i < response.length; i++) {                  
                    if (response[i].email == email) {
                        catchflag = true;
                        $("#Email-error").show();
                        $("#submit").show();
                        break;
                    }
                    else if (response[i].username == username) {
                        catchflag = true;
                        $("#Username-error").show();
                        $("#submit").show();
                        break;
                    }
                }
                // If username and email is unique/new, creates account
                if (!(catchflag)) {
                    createAccount(username, email, password);
                }
                else {
                    $("#submit").prop("disabled", false);
                    $("lottie-player").hide(); 
                }
            });    
        }
    })

    // POST new account
    function createAccount(username, email, password) {
        let jsondata = {
            "username": username,
            "email": email,
            "password": password,
            "profilepicture": '0'
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://learnpythonatnp-b99e.restdb.io/rest/student",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),          
            "error": function() {
                Swal.fire(
                    'Sorry',
                    'It appears that an error has occured.',
                    'error'
                ).then(function () {
                    location.reload();
                })           
        }}

        $.ajax(settings).done(function (response) {
            console.log(response);
            localStorage.setItem('user1', JSON.stringify(response));
            $("lottie-player").hide(); 
            window.location.assign("main-menu.html");   // User is redirected to main menu page        
        })
    }
})
