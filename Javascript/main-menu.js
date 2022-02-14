$(document).ready(function () {
    const APIKEY = "61feb0fc6a79155501021811"
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    $("#username").text(userinfo.username);
    if (userinfo.profilepicture != "0") {
        $("#profile-picture").attr('src', userinfo.profilepicture);
    }

    $("#change-picture").click(function (e) {
        e.preventDefault(); 
        let url = "https://api.unsplash.com/search/photos?query=food&orientation=squarish&client_id=OYSECy1VZgmHT8HWdZaWG3h_SMafMtVndRzTn6x9djg";
        let photos = "";
        fetch(url).then(response => response.json())
        .then(function (data) {
            photos = data.results;
            PhotoChange(photos, 0);              
        })       
    })

    function PhotoChange(photos, number) {
        url = photos[number].urls.small;
        console.log(url);
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
            if (answer.isConfirmed) {
                let jsondata = {
                    "username": userinfo.username,
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
                            if (response1[i].username == userinfo.username) {
                                localStorage.setItem('user1', JSON.stringify(response1[i]));
                            }
                        }
                    })
                    Swal.fire({
                        title: 'Your profile picture has been changed!',
                        text: 'The page will reload. Please wait so that the changes are reflected. If changes are not reflected, re-login again and the profile picture will be updated.',
                        icon: 'success',
                        timer: 7000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    .then(function () {
                        window.location.replace("main-menu.html");
                    })
                });
            } else if (answer.dismiss === Swal.DismissReason.cancel) {
                if (number === 9) {
                    number = 0;
                } else {
                    number += 1;
                }
                PhotoChange(photos, number);
            }
        })
    }
});
