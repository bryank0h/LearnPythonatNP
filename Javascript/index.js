$(document).ready(function() {   
    const APIKEY = "61feb0fc6a79155501021811"

    $("#Login-form h2").click(function(e) {
        if ($("#Login-form h2").css("margin-bottom") == "60px") {
            $("#Login-form").css("margin-bottom", "100px");
            $("#Login").slideUp("fast", function(ee) {
                $("#Login-form h2").css({"margin-bottom": "0px"});
            });
        }
        else {
            $("#Login-form h2").css("margin-bottom", "60px");
            $("#Login-form").css("margin-bottom", "40px");
            $("#Login").slideDown("fast", function(ee) {              
                $("#Login").css("display", "block");                           
            });
        }
    }); 

    $("input").focus(function (e) {
        $(this).css("background-color", "white");       
    })  
    $("input") .focusout(function (e) {
        if ($(this).val() != "") {
            $(this).css("background-color", "white");
        }
        else {
            $(this).css("background-color", "rgba(255,255,255,0.4)");
        }
    }) 

    $("input").focus(function() {
        $("#submit").css("background-color", "rgb(69, 69, 69)");
    })
    
    $("#submit").click(function (e) {
        if ($("form")[0].checkValidity()) {
            e.preventDefault();
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
              
            $.ajax(settings).done(function (response) {
                successflag = false;
                for (let i = 0; i < response.length; i++) {                  
                    if (response[i].email == email && response[i].password === password) {
                        console.log(response[i]);
                        successflag = true;
                        object = response[i];
                        localStorage.setItem('user1', JSON.stringify(object));
                        window.location.assign("main-menu.html");
                        break;
                    }
                }
                if (successflag == false) {
                    $("#Error").show();
                    $("#submit").prop("disabled", false);
                }
            });
        }
    })
    $("#attribution").click(function(e) {
        e.preventDefault();
        window.open('https://github.com/bryank0h/LearnPythonatNP', '_blank');
    })
});
