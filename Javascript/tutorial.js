$(document).ready(function () {
    $("#lesson1").click(function (e) {
        e.preventDefault();
        $("header").slideUp("normal", function() {
            $("#chapter1").slideDown("normal");
        });
    })

    $("#lesson2_1").click(function (e) {
        e.preventDefault();
        $("header").slideUp("normal", function() {
            $("#chapter2_1").slideDown("normal");
        });
    })

    $(".return").click(function(e) {
        $("header").slideDown("normal", function() {
            $(".content").slideUp("normal");
        });
    })

    $("#chapter1-question1-submit").click(function (e) {
        e.preventDefault();
        let answer = $("#chapter1-question1").val();
        answer = answer.toLowerCase();
        if (answer == "float") {
            Swal.fire(
                'Correct!',
                'Your answer is correct! Great job!',
                'success'
            )
        }
        else {
            Swal.fire(
                'Oops...',
                'Your answer is incorrect! Please try again!',
                'error'
            )
        }    
    })

    $("#chapter2_1-question1-submit").click(function (e) {
        e.preventDefault();
        let answer = $("#chapter2_1-question1").val();
        answer = answer.toLowerCase();
        if (answer == "true") {
            Swal.fire(
                'Correct!',
                'Your answer is correct! Great job!',
                'success'
            )
        }
        else {
            Swal.fire(
                'Oops...',
                'Your answer is incorrect! Please try again!',
                'error'
            )
        }    
    })
})