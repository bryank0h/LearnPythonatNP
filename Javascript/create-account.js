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