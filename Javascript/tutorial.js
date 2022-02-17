$(document).ready(function () {
    // API key
    const APIKEY = "61feb0fc6a79155501021811"
    // Get user information from local storage
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    // List to check completed chapters. Used for progress bar and 100% completion trophy.
    let completionlist = [];

    // Mark completed chapters with green background.
    try {
        if (userinfo.chapter1 != null) {
            if (userinfo.chapter1 == "1") {
                $("#lesson1").css("background-color", "rgba(108, 255, 164, 0.633)");
                $("#chapter1complete").hide();
                completionlist.push(1);
            }
        }
    }
    catch (error) {}
    try {
        if (userinfo.chapter2_1 != null) {
            if (userinfo.chapter2_1 == "1") {
                $("#lesson2_1").css("background-color", "rgba(108, 255, 164, 0.633)");
                $("#chapter2-1complete").hide();
                completionlist.push(1);
            }
        }
    }
    catch (error) {}
    try {
        if (userinfo.chapter2_2 != null) {
            if (userinfo.chapter2_2 == "1") { 
                $("#lesson2_2").css("background-color", "rgba(108, 255, 164, 0.633)");
                $("#chapter2-2complete").hide();
                completionlist.push(1);
            }   
        }
    }
    catch (error) {}
    try {
        if (userinfo.chapter2_3 != null) {
            if (userinfo.chapter2_3 == "1") { 
                $("#lesson2_3").css("background-color", "rgba(108, 255, 164, 0.633)");
                $("#chapter2-3complete").hide();
                completionlist.push(1);
            }    
        }
    }
    catch (error) {}

    // Update progress bar based on number of chapters completed
    $(".progress > div").css("width", `${(completionlist.length / 4) * 100}%`)

    // If all chapters are completed, show trophy.
    if (completionlist.length == 4) {
        $("#100percent").show();
    }

    // Chapter selection actions
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

    $("#lesson2_2").click(function (e) {
        e.preventDefault();
        $("header").slideUp("normal", function() {
            $("#chapter2_2").slideDown("normal");
        });
    })

    $("#lesson2_3").click(function (e) {
        e.preventDefault();
        $("header").slideUp("normal", function() {
            $("#chapter2_3").slideDown("normal");
        });
    })

    $(".return").click(function(e) {
        $("header").slideDown("normal", function() {
            $(".content").slideUp("normal");
        });
    })

    // Mini questions
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

    // After marking a chapter as complete
    $("#chapter1complete").click(function(e) {
        e.preventDefault();
        $("button").hide();
        $(".update-status").show();
        let jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "chapter1" : "1"};
        let objectid = userinfo._id;
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + objectid,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            $("#lesson1").css("background-color", "rgba(108, 255, 164, 0.633)");
            $("#chapter1complete").hide();
            reloadpage();
        });
    })
    $("#chapter2-1complete").click(function(e) {
        e.preventDefault();
        $("button").hide();
        $(".update-status").show();
        let jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "chapter2_1" : "1"};
        let objectid = userinfo._id;
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + objectid,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            $("#lesson2_1").css("background-color", "rgba(108, 255, 164, 0.633)");
            $("#chapter2-1complete").hide();
            reloadpage()
        });
    })

    $("#chapter2-2complete").click(function(e) {
        e.preventDefault();
        $("button").hide();
        $(".update-status").show();
        let jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "chapter2_2" : "1"};
        let objectid = userinfo._id;
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + objectid,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            $("#lesson2_2").css("background-color", "rgba(108, 255, 164, 0.633)");
            $("#chapter2-2complete").hide();
            reloadpage();
        });
    })

    $("#chapter2-3complete").click(function(e) {
        e.preventDefault();
        $("button").hide();
        $(".update-status").show();
        let jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "chapter2_3" : "1"};
        let objectid = userinfo._id;
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + objectid,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            $("#lesson2_3").css("background-color", "rgba(108, 255, 164, 0.633)");
            $("#chapter2-3complete").hide();
            reloadpage()
        });
    })

    // If Reset Completion is clicked
    $("#resetcompletion").click(function(e) {
        e.preventDefault();
        $("#100percent").hide();
        $(".progress").hide();
        $("nav").hide();
        $("#resetting-message").show();
        let jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "chapter1" : "",
                        "chapter2_1" : "",
                        "chapter2_2" : "",
                        "chapter2_3" : ""};
        let objectid = userinfo._id;
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + objectid,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            $("#lesson1").css("background-color", "rgba(255, 255, 255, 0.633)");
            $("#lesson2_1").css("background-color", "rgba(255, 255, 255, 0.633)");
            $("#lesson2_2").css("background-color", "rgba(255, 255, 255, 0.633)");
            $("#lesson2_3").css("background-color", "rgba(255, 255, 255, 0.633)");
            $("#chapter1complete").show();
            $("#chapter2-1complete").show();
            $("#chapter2-2complete").show();
            $("#chapter2-3complete").show();
            reloadpage();
        });
    })

    // Reload page when chapter is marked complete or reset completion.
    function reloadpage() {
        localStorage.removeItem('user1');
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
        }
        $.ajax(settings).done(function (response) {
            for (let i = 0; i < response.length; i++) {
                if (response[i].username == userinfo.username) {
                    localStorage.setItem('user1', JSON.stringify(response[i]));
                }
            }
        })
        Swal.fire({
            title: 'Status Updated',
            text: 'The page will reload. Please wait so that the changes are reflected.',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false
        })
        .then(function () {
            window.location.replace("tutorial.html");
        })
    }
})