$(document).ready(function() {   
    $("#Login-form h2").click(function(e) {
        if ($("#Login-form h2").css("margin-bottom") == "60px") {
            $("#Login").slideUp("fast", function(ee) {
                $("#Login-form h2").css({"margin-bottom": "0px"});
            });
        }
        else {
            $("#Login-form h2").css("margin-bottom", "60px");
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
});
