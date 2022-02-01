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
});
