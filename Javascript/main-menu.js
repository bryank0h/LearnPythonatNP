$(document).ready(function () {
    // API key
    const APIKEY = "61feb0fc6a79155501021811"

    // Store user information in local storage.
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    let username = userinfo.username;

    // Display user's username and profile picture
    $("#username").text(username);
    if (userinfo.profilepicture != "0") {
        $("#profile-picture").attr('src', userinfo.profilepicture);
    }

    // Change profile picture
    $("#change-picture, #profile-picture").click(function (e) {
        e.preventDefault(); 
        // Randomize image collections
        let topics = ["food", "fruit", "fruits", "city", "plant", "animal", "animals", "cyberpunk", "ikea", "Nintendo", "coffee", "skyscraper"]
        let randompicnumber = Math.floor(Math.random() * topics.length);
        console.log(randompicnumber);
        let topic = topics[randompicnumber];
        let url = `https://api.unsplash.com/search/photos?query=${topic}&orientation=squarish&client_id=OYSECy1VZgmHT8HWdZaWG3h_SMafMtVndRzTn6x9djg`;
        let photos = "";
        fetch(url).then(response => response.json())
        .then(function (data) {
            photos = data.results;
            PhotoChange(photos, 0);              
        })       
    })

    // Change profile picture popup
    function PhotoChange(photos, number) {
        $(".Menu-option").css("display", "none");
        $("button").css("display", "none");
        $("#change-picture").css("display", "none");
        $("#report").hide();
        $("#profile-picture").hide();
        url = photos[number].urls.small;
        console.log(url);
        // Popup
        Swal.fire({
            title: "Change Profile Picture",
            text: "Select a random profile picture",
            imageUrl: url,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Next',
            denyButtonText: 'Leave'         
        }).then((answer) => {
            // If user saves profile picture, PUT new profile picture in database
            if (answer.isConfirmed) {
                $("#changing-message").show();
                let jsondata = {
                    "username": username,
                    "email": userinfo.email,
                    "password": userinfo.password,
                    "profilepicture": String(url)
                };
                let objectid = userinfo._id;
                console.log(objectid);
                var settings = {
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
                    console.log(response);
                    localStorage.removeItem('user1');
                    let settings1 = {
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
                    $.ajax(settings1).done(function (response1) {
                        console.log(response1);
                        for (let i = 0; i < response1.length; i++) {
                            if (response1[i].username == username) {
                                localStorage.setItem('user1', JSON.stringify(response1[i]));
                            }
                        }
                    })
                    // After profile picture is changed, user is prompted to wait so that local storage is updated with new profile picture
                    Swal.fire({
                        title: 'Your profile picture has been changed!',
                        text: 'The page will reload. Please wait so that the changes are reflected. If changes are not reflected, re-login again and the profile picture will be updated.',
                        icon: 'success',
                        timer: 10000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    .then(function () {
                        window.location.reload();
                    })
                });
            } else if (answer.dismiss === Swal.DismissReason.cancel) {
                if (number === 9) {
                    number = 0;
                } else {
                    number += 1;
                }
                PhotoChange(photos, number); // Go to next image
            } else {
                $(".Menu-option").css("display", "");
                $("button").css("display", "");
                $("#change-picture").css("display", "");
                $("#report").show();
                $("#profile-picture").show();
            }
        })
    }

    // After clicking on Download Certificates, GET data from database. Since user may have just completed a training session, local storage is not updated with new info. Hence this is a way to update new info.
    $("#viewcertificates").click(function (e) {
        e.preventDefault();
        $(".Menu-option").css("display", "none");
        $("button").css("display", "none");
        $("#change-picture").css("display", "none");
        $("#report").hide();
        $("#profile-picture").hide();
        $("#wait-certificates").css('display', 'block');
        localStorage.removeItem('user1');
        settings = {
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
                if (response[i].username == username) {
                    userinfo = response[i];
                    localStorage.setItem('user1', JSON.stringify(userinfo)); // Update local storage
                    break;
                }
            }
            // Check certificates obtained
            let typeofcertificate = "none";
            try {
                if (userinfo.easy_points == 3000) {
                    typeofcertificate = "easy";
                }
            }
            catch {}
            try {
                if (userinfo.standard_points == 25000) {
                    typeofcertificate = "standard";
                }
            }
            catch {}
            try {
                if (userinfo.easy_points == 3000) {
                    try {
                        if (userinfo.standard_points == 25000) {
                            typeofcertificate = "both";
                        }
                    }
                    catch {}
                }
            }
            catch {}
            $(".Menu-option").css("display", "");
            $("button").css("display", "");
            $("#change-picture").css("display", "");
            $("#report").show();
            $("#profile-picture").show();
            $("#wait-certificates").css('display', 'none');
            if (typeofcertificate == "none") {
                Swal.fire({
                    title: 'Oops!',
                    text: 'It seems like you do not have any certificates currently. Have a go at Speed Training and if you get maximum points, a certificate will be presented! Do note however, if your next attempt is not maximum points, your certificate will be voided.',
                    icon: 'info',
                })
            }
            else if (typeofcertificate == "easy") {
                showeasycertificate();
            }
            else if (typeofcertificate == "standard") {
                showstandardcertificate();
            }
            else if (typeofcertificate == "both") {
                showallcertificate(0);
            }
        });
    })
    
    // If only easy certificate is obtained.
    function showeasycertificate() {
        $("#fullmarkscertificate-easy").html('<br><canvas id="easy-canvas" height="600px" width="800px"></canvas>')
        let canvas = document.getElementById('easy-canvas');
        let ctx = canvas.getContext('2d');
        let image = new Image();
        image.src = 'Images/Speed Training/Easy Mode Champion.png';
        image.onload = function () {
            drawImage();
        }
        textWidth = ctx.measureText(username).width;
        function drawImage() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = '50px Maven Pro';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(username, canvas.width/2, 360);
        }
        Swal.fire({
            title: "Easy Mode Champion Certificate",
            icon: "success",
            showDenyButton: true,
            confirmButtonText: 'Download',
            denyButtonText: 'Leave'    
        }).then((answer) => {
            if (answer.isConfirmed) {
                let link = document.getElementById('downloadeasy');
                link.href = canvas.toDataURL('image/png');
                link.download = 'EMC Certificate - ' + username;
                link.click();
                showeasycertificate();
            }
        })
    }

    // If only standard certificate is obtained
    function showstandardcertificate() {
        $("#fullmarkscertificate-standard").html('<br><canvas id="standard-canvas" height="600px" width="800px"></canvas>')
        let canvas = document.getElementById('standard-canvas');
        let ctx = canvas.getContext('2d');
        let image = new Image();
        image.src = 'Images/Speed Training/Standard Mode Champion.png';
        image.onload = function () {
            drawImage();
        }
        textWidth = ctx.measureText(username).width;
        function drawImage() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.font = '50px Maven Pro';
            ctx.fillStyle = '#29e';
            ctx.textAlign = 'center';
            ctx.fillText(username, canvas.width/2, 360);
        }
        Swal.fire({
            title: "Standard Mode Champion Certificate",
            icon: "success",
            showDenyButton: true,
            confirmButtonText: 'Download',
            denyButtonText: 'Leave'    
        }).then((answer) => {
            if (answer.isConfirmed) {
                let link = document.getElementById('downloadstandard');
                link.href = canvas.toDataURL('image/png');
                link.download = 'SMC Certificate - ' + username;
                link.click();
                showstandardcertificate();
            }
        })
    }

    // If all certificates are obtained.
    function showallcertificate(n) {
        if (n == 0) {
            $("#fullmarkscertificate-easy").html('<br><canvas id="easy-canvas" height="600px" width="800px"></canvas>')
            let canvas = document.getElementById('easy-canvas');
            let ctx = canvas.getContext('2d');
            let image = new Image();
            image.src = 'Images/Speed Training/Easy Mode Champion.png';
            image.onload = function () {
                drawImage();
            }
            textWidth = ctx.measureText(username).width;
            function drawImage() {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.font = '50px Maven Pro';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.fillText(username, canvas.width/2, 360);
            }
            Swal.fire({
                title: "Easy Mode Champion Certificate",
                icon: "success",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Download',
                denyButtonText: 'Leave',
                cancelButtonText: 'Next'    
            }).then((answer) => {
                if (answer.isConfirmed) {
                    let link = document.getElementById('downloadeasy');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'EMC Certificate - ' + username;
                    link.click();
                    showallcertificate(0);
                }
                else if (answer.dismiss === Swal.DismissReason.cancel) {
                    showallcertificate(1);
                }
            })
        }
        else {
            $("#fullmarkscertificate-standard").html('<br><canvas id="standard-canvas" height="600px" width="800px"></canvas>')
            let canvas = document.getElementById('standard-canvas');
            let ctx = canvas.getContext('2d');
            let image = new Image();
            image.src = 'Images/Speed Training/Standard Mode Champion.png';
            image.onload = function () {
                drawImage();
            }
            textWidth = ctx.measureText(username).width;
            function drawImage() {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.font = '50px Maven Pro';
                ctx.fillStyle = '#29e';
                ctx.textAlign = 'center';
                ctx.fillText(username, canvas.width/2, 360);
            }
            Swal.fire({
                title: "Standard Mode Champion Certificate",
                icon: "success",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Download',
                denyButtonText: 'Leave', 
                cancelButtonText: 'Next'    
            }).then((answer) => {
                if (answer.isConfirmed) {
                    let link = document.getElementById('downloadstandard');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'SMC Certificate - ' + username;
                    link.click();
                    showallcertificate(1);
                }
                else if (answer.dismiss === Swal.DismissReason.cancel) {
                    showallcertificate(0);
                }
            })
        }
    }
});
