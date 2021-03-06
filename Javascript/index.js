$(document).ready(function() {  
    // API key 
    const APIKEY = "61feb0fc6a79155501021811"

    // Transition actions for login
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

    // Focus events
    $("input").focus(function (e) {
        $(this).css("background-color", "white");  
        $("#submit").css("background-color", "rgb(69, 69, 69)");     
    })  
    $("input").focusout(function (e) {
        $("#Error").hide();
        if ($(this).val() != "") {
            $(this).css("background-color", "white");
        }
        else {
            $(this).css("background-color", "rgba(255,255,255,0.4)");
        }
    }) 
    
    // After clicking submit, get users' data
    $("#submit").click(function (e) {
        if ($("form")[0].checkValidity()) {
            e.preventDefault();
            $("#Error").hide();
            $("#submit").hide();
            $("#submit-wait").css("display","flex");
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
              
            // Check account details
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
                    $("#submit-wait").hide();
                    $("#Error").show();
                    $("#submit").show();
                    $("#submit").prop("disabled", false);
                }
            });
        }
    })

    // Go to GitHub repository
    $("#attribution").click(function(e) {
        e.preventDefault();
        window.open('https://github.com/bryank0h/LearnPythonatNP', '_blank');
    })
});
