$(document).ready(function () {
    let userinfo = JSON.parse(localStorage.getItem('user1'));
    let username = userinfo.username;
    const APIKEY = "61feb0fc6a79155501021811"

    // Leaderboard
    $("#easyleaderboard").click(function(e) {
        $("#standard-table").hide();
        $("#easy-table").show();
    })

    $("#standardleaderboard").click(function(e) {
        $("#easy-table").hide();
        $("#standard-table").show();
    })

    $("#leaderboard-button").click(function(e){
        let settings;
        if ($(this).text() == "Leaderboard"){
            $("nav").hide();
            $("header").slideUp("normal");
            $("#leaderboard").show();
            $("#leaderboard-button").text("Back");
            $("#leaderboard-button").attr("class", "back");
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
                "beforeSend": function() {
                    $("#leaderboard-wait").css("display", "flex");
                }
            }
        }
        else {
            $("nav").show();
            $("header").slideDown("normal");
            $("#leaderboard").hide();
            $("#easy-table").hide();
            $("#standard-table").hide();
            $("#leaderboard-button").attr("class", "leaderboard");
            $("#leaderboard-button").text("Leaderboard");
        }
        
        $.ajax(settings).done(function (response) {  
            console.log(response);
            $("#leaderboard-wait").css("display", "none");
            let content = "";
            let userlist = [];
            let points;
            let timing;
            for (let i = 0; i < response.length; i++) {
                if (response[i].easy_points != null) {
                    userlist.push(response[i]);
                }
                else {
                    continue;
                }
            }
            if (userlist.length > 1) {
                userlist.sort(function(a, b) {
                    let pointdifference = b.easy_points - a.easy_points;
                    if (pointdifference == 0) {
                        let first_timing_list = b.easy_time.split(":");
                        let first_timing = parseFloat(first_timing_list[0] + "." + first_timing_list[1]);
                        let second_timing_list = a.easy_time.split(":");
                        let second_timing = parseFloat(second_timing_list[0] + "." + second_timing_list[1]);
                        return second_timing - first_timing;
                    }
                    else {
                        return pointdifference;
                    } 
                })
            }
            for (let i = 0; i < userlist.length; i++) {
                let profilepicture;
                if (userlist[i].profilepicture == 0) {
                    profilepicture = "Images/Profile/pythonnull.png";
                }
                else {
                    profilepicture = userlist[i].profilepicture;
                }
                points = userlist[i].easy_points;
                timing = userlist[i].easy_time;
                content = `${content}<tr id='${userlist[i]._id}'>
                <td class="user"><img src="${profilepicture}" style="height: 80px;width: 80px;border: 1px solid black;border-radius: 100%;margin-right:20px;"> ${userlist[i].username}</td>
                <td>${points}</td>
                <td>${timing}</td>`
            }
            $("#easy-table > table tbody").html(content);

            content = "";
            userlist = [];
            points = "";
            timing = "";
            for (let i = 0; i < response.length; i++) {
                if (response[i].standard_points != null) {
                    userlist.push(response[i]);
                }
                else {
                    continue;
                }
            }
            if (userlist.length > 1) {
                userlist.sort(function(a, b) {
                    let pointdifference = b.standard_points - a.standard_points;
                    if (pointdifference == 0) {
                        let first_timing_list = b.standard_time.split(":");
                        let first_timing = parseFloat(first_timing_list[0] + "." + first_timing_list[1]);
                        let second_timing_list = a.standard_time.split(":");
                        let second_timing = parseFloat(second_timing_list[0] + "." + second_timing_list[1]);
                        return second_timing - first_timing;
                    }
                    else {
                        return pointdifference;
                    }  
                })
            }
            for (let i = 0; i < userlist.length; i++) {
                let profilepicture;
                if (userlist[i].profilepicture == 0) {
                    profilepicture = "Images/Profile/pythonnull.png";
                }
                else {
                    profilepicture = userlist[i].profilepicture;
                }
                points = userlist[i].standard_points;
                timing = userlist[i].standard_time;
                content = `${content}<tr id='${userlist[i]._id}'>
                <td class="user"><img src="${profilepicture}" style="height: 80px;width: 80px;border: 1px solid black;border-radius: 100%;margin-right:20px;"> ${userlist[i].username}</td>
                <td>${points}</td>
                <td>${timing}</td>`
            }
            $("#standard-table > table tbody").html(content);
        })
    })

    // Timer settings
    let easymin = 0;
    let easysec = 30;
    let standardmin = 1;
    let standardsec = 30;
    let selectedmin;
    let selectedsec;
    let easymintext = '00';
    let easysectext = '30';
    let standardmintext = '01';
    let standardsectext = '30';
    let selectedmintext;
    let selectedsectext;

    let minute;
    let second;
    let millisecond = 0;
    let interval;
   
    // Upon clicking on "Easy" mode.
    $("#easy").click(function(e) {
        e.preventDefault;
        if ($("#easy").data("timesup") == "false") {
            Swal.fire({
                title: 'Reloading page',
                text: 'We will reload the page as you have attempted a training just now.',
                icon: 'info',
                showConfrimButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {Swal.showLoading()}
            }).then(function () {
                window.location.reload();
            })
        }
        $("nav").hide();
        $("#mainmenu").hide();
        $("#leaderboard-button").hide();
        $("header").slideUp("normal", function() {
            $("#easymode").slideDown("normal");
        });
        $(".minute").text(easymintext);
        $(".second").text(easysectext);
        minute = easymin;
        second = easysec;
        selectedmin = easymin;
        selectedsec = easysec;
        selectedmintext = easymintext;
        selectedsectext = easysectext;
    })

    // Upon clicking on "Standard" mode.
    $("#standard").click(function(e) {
        e.preventDefault;
        if ($("#standard").data("timesup") == "false") {
            Swal.fire({
                title: 'Reloading page',
                text: 'We will reload the page as you have attempted a training just now.',
                icon: 'info',
                showConfrimButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {Swal.showLoading()}
            }).then(function () {
                window.location.reload();
            })
        }
        $("nav").hide();
        $("#mainmenu").hide();
        $("#leaderboard-button").hide();
        $("header").slideUp("normal", function() {
            $("#standardmode").slideDown("normal");
        });
        $(".minute").text(standardmintext);
        $(".second").text(standardsectext);
        minute = standardmin;
        second = standardsec;
        selectedmin = standardmin;
        selectedsec = standardsec;
        selectedmintext = standardmintext;
        selectedsectext = standardsectext;
    })

    // Upon clicking on "Stop Training"
    $(".return").click(function(e) {
        pause();
        reset();
        $(".minute").text('00');
        $(".second").text('00');
        $("#easy").data("timesup", "false");
        $("#standard").data("timesup", "false");
        $("#easy-instructions").slideDown("normal");
        $("#easy-content").slideUp("normal");
        $("#easy-results").slideUp("normal");
        $("#standard-instructions").slideDown("normal");
        $("#standard-content").slideUp("normal");
        $("#standard-results").slideUp("normal");
        $(".minute").css("color", "black");
        $(".second").css("color", "black");
        $(".easyoption").removeAttr("style");
        $("#easy-results").slideUp("normal");
        $("nav").show();
        $("#mainmenu").show();
        $("#leaderboard-button").show();
        $("header").slideDown("normal", function() {
            $(".content").slideUp("normal");
        });
    })

    // Timer
    function start() {
        pause();
        interval = setInterval(timer, 10.5);
    }
    function pause() {
        clearInterval(interval);
    }
    function reset() {
        minute = selectedmin;
        second = selectedsec;
        millisecond = 0;
        $(".minute").text(selectedmintext);
        $(".second").text(selectedsectext);
    }

    function timer() { 
        if ((millisecond -= 10) < 0) {
            if (second != 0) {
                millisecond = 1000;
                second--;
            }
        }
        if (second == 0) {
            if (minute != 0) {
                second = 60;
                minute--;
            }  
        }
        if (returnData(minute) == '00' && returnData(second) == '00' && returnData(millisecond) == '00') {
            $("#easy").attr("data-timesup", "true");
            $("#standard").attr("data-timesup", "true");
            pause();
            $(".minute").css("color", "red");
            $(".second").css("color", "red");
        }
        else {
            $(".minute").text(returnData(minute));
            $(".second").text(returnData(second));
        } 
    }

    function returnData(time) {
        return time >= 10 ? time : `0${time}`
    }

    // Easy mode
    let easyquestions = ["a = 1 + b - c<br>Which of the following are variable(s)?",
                         "Assume that a = 5, b = 4, c = 2<br>print(b / (a - c))<br>What is the result of the following expression?",
                         'print(type(2 == "2"))<br>What is the result of the following expression?',
                         "What is the operator for exponent?",
                         "# print('Hello World')<br>What is the line of code as shown above called?",
                         "Which of the following is the correct operator to use for string concatenation?",
                         "What do we use to define a block of code in Python language?",
                         "Which of the following declarations is not allowed in Python?",
                         "Which of the following is not a keyword in Python language?",
                         "Which of the following precedence order is correct in Python?",
                         'The following variables are declared:<br>a = 5<br>b = 3<br>c = 2<br><br>print("a"+"b+c")<br><br>What will be the output of this statement?',
                         'py = "PythonIsSoFun"<br>print(py[2:10])<br>What is the output of the following code?',
                         'print("Welcome\\to\\ngee ann")<br>What is the output of the following code?',
                         'count = 0<br>while count <= 5:<br>&emsp;&emsp;print(count, end=" ")<br>&emsp;&emsp;count += 1<br><br>What is the output of the following code?',
                         'for i in range(3):<br>&emsp;&emsp;print(i, end="")<br><br>What is the output of the following code?',
                         'for i in range(4, 8, 2):<br>&emsp;&emsp;print(i, end="")<br><br>What is the output of the following code'
                        ]

    let easyoptions = [ ["a only", "a, b and c", "1 only", "All of the above"],
                        ["2", "1", "1.5", "1.0"],
                        ["true", "bool", "int", "str"],
                        ["^", "%", "**", "#"],
                        ["Comment", "Output", "Statement", "F-Strings"],
                        ["&", "+", "*", "%"],
                        ["Semi-colon", "Brackets", "Indentation", "Triple Quotes"],
                        ["_x = 2", "12x = 3", "x12_ = 5", "None of the above"],
                        ["bmi", "while", "def", "null"],
                        ["Parentheses,<br>Exponential,<br>Multiplication,<br>Division,<br>Addition,<br>Subtraction", "Multiplication,<br>Division,<br>Addition,<br>Subtraction,<br>Parentheses,<br>Exponential","Division,<br>Multiplication,<br>Addition,<br>Subtraction,<br>Parentheses,<br>Exponential", "Exponential,<br>Parentheses,<br>Multiplication,<br>Division,<br>Addition,<br>Subtraction"],
                        ["a+bc", "abc", "ab+c", "10"],
                        ["PythonIsSoFun[2:10]", "ythonIsSoF", "thonIsSoF", "thonIsSo"],
                        ["Welcome\\to\\ngee ann", "Welcome<br>to<br>ngee ann", "Welcome&emsp;&emsp;o<br>gee ann", "Error"],
                        ["1 2 3 4 5", "1 2 3 4", "0 1 2 3 4 5", "0 0 0 0 0"],
                        ["012", "0123", "iii", "iiii"],
                        ["4567", "8765", "46", "64"]
                      ]
    let easyanswers = [2,2,2,3,1,2,3,2,1,1,3,4,3,3,1,3];
    let easypoints = [300, 250, 100, 50, 0]

    let randomquestions = [];
    let timetakenlist = []; 
    $("#begin-easy").click(function (e) {
        $("#easy-instructions").slideUp("normal");
        while(true) {
            number = Math.floor(Math.random() * easyquestions.length);
            repeatedflag = false;
            for (let i of randomquestions) {
                if (i == number) {
                    repeatedflag = true;
                    break;
                }
            }
            if (repeatedflag == false) {
                randomquestions.push(number);
            }
            if (randomquestions.length == 10) {
                break;
            }   
        }
        $("#easy-content").slideDown("normal");
        easyquiz(0)   
    })
    function easyquiz(i) {
        reset();
        start();
        question = randomquestions[i];
        $("#easyquestionnumber").text(i + 1);
        $("#easy-question").html(easyquestions[randomquestions[i]]);
        $("#easy1").html(easyoptions[randomquestions[i]][0]);
        $("#easy2").html(easyoptions[randomquestions[i]][1]);
        $("#easy3").html(easyoptions[randomquestions[i]][2]);
        $("#easy4").html(easyoptions[randomquestions[i]][3]);
        let selectedoption = 0;
        $(".easyoption").click(function (e) {
            e.preventDefault;
            if ($(this).attr("id") == "easy1") {
                selectedoption = 1;
            }
            else if ($(this).attr("id") == "easy2") {
                selectedoption = 2;
            }
            else if ($(this).attr("id") == "easy3") {
                selectedoption = 3;
            }
            else if ($(this).attr("id") == "easy4") {
                selectedoption = 4;
            }
            $(".easyoption").removeAttr("style");
            $(this).css({"transform" : "scale(1.1)", "background-color" : "rgb(27, 160, 255)", "color" : "white"});
        })
        $("#submit-easy").click(function (e) {
            let answer = "#easy" + easyanswers[randomquestions[i]];
            let points;
            if ($("#easy").attr("data-timesup") == "true") {
                Swal.fire({
                    title: 'You\'ve exceeded the time!',
                    text: "It's okay! Just understand the concepts well and you'll make it some day!\nCorrect Answer: " + $(answer).text(),
                    icon: 'warning'
                }).then(function () {
                    $("#easy").attr("data-timesup", "false");
                    $("#standard").attr("data-timesup", "false");
                    $(".minute").css("color", "black");
                    $(".second").css("color", "black");
                    $(".easyoption").removeAttr("style");
                    timetakenlist.push(easysec);
                    if (parseInt($("#easypoints").text()) > 3000)
                    {
                        $("#easypoints").text("0000");
                    }
                    if (i != 9) {
                        i++;
                        easyquiz(i)
                    }
                    else {
                        easyresults();
                    }
                })
            }
            else if (selectedoption == easyanswers[randomquestions[i]]) {
                pause();
                Swal.fire({
                    title: 'You got it right!',
                    text: "Correct Answer: " + $(answer).text(),
                    icon: 'success'
                }).then(function () {
                    $(".easyoption").removeAttr("style");
                    let timetaken = easysec - parseInt($("#easysecond").text());    
                    if (timetaken <= 10) {
                        points = easypoints[0];
                    }
                    else if (timetaken > 10 && timetaken <= 20) {
                        points = easypoints[1];
                    }
                    else if (timetaken > 20 && timetaken <= 25) {
                        points = easypoints[2];
                    }
                    else {
                        points = easypoints[3];
                    }
                    let updatedpoints = parseInt($("#easypoints").text()) + points;
                    let newpoints = String(updatedpoints);
                    if (newpoints.length < 4) {
                        let newpointscopy = newpoints;
                        let stringofzeros = "";
                        while (newpointscopy.length < 4) {
                            newpointscopy += "0"
                            stringofzeros += "0"
                        }
                        $("#easypoints").text(stringofzeros + newpoints);
                    }
                    else {
                        if (updatedpoints > 3000)
                        {
                            $("#easypoints").text("0000");
                        }
                        else {
                            $("#easypoints").text(newpoints);
                        }   
                    }
                    timetakenlist.push(timetaken);
                    if (i != 9) {
                        i++;
                        easyquiz(i)
                    }
                    else{
                        easyresults();
                    }  
                })
            }
            else if (selectedoption == 0) {
                Swal.fire(
                    'You haven\'t answered the question...',
                    'As a wise shoe company once said: "JUST DO IT". Oh and btw the time is still ticking lol so please answer the question thx.',
                    'question'
                )
            }
            else if (selectedoption != easyanswers[randomquestions[i]]) {
                pause();
                let timetaken = easysec - parseInt($("#easysecond").text());  
                Swal.fire({
                    title: 'You got it wrong!',
                    text: "Correct Answer: " + $(answer).text(),
                    icon: 'error'
                }).then(function () {
                    timetakenlist.push(timetaken);
                    if (parseInt($("#easypoints").text()) > 3000)
                    {
                        $("#easypoints").text("0000");
                    }
                    $(".easyoption").removeAttr("style");
                    if (i != 9) {
                        i++;
                        easyquiz(i)
                    }      
                    else {
                        easyresults();
                    }    
                })
            }
        })
    }
    function easyresults() {
        reset();
        $("#easy-content").slideUp("normal");
        $("#easy-results").slideDown("normal");
        $("#easypointsresult").text($("#easypoints").text());
        let totalseconds = 0;
        for (let t of timetakenlist) {
            totalseconds += t;
        }
        let totalminutes = 0;
        if (totalseconds >= 60) {
            totalminutes = Math.floor(totalseconds/60);
            totalseconds -= totalminutes * 60;
        }
        totalminutes = String(totalminutes);
        totalseconds = String(totalseconds);
        if (totalminutes.length != 2) {
            totalminutes = "0" + totalminutes;
        }
        if (totalseconds.length != 2) {
            totalseconds = "0" + totalseconds;
        }
        $("#easyminresult").text(totalminutes);
        $("#easysecresult").text(totalseconds);
        var jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "easy_points": $("#easypoints").text(),
                        "easy_time": totalminutes + ":" + totalseconds};
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + userinfo._id,
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
        });

        if ($("#easypoints").text() == '3000') {
            $(".full-marks").slideDown("slow");
            $("#fullmarkscertificate-easy").slideDown("slow");
            createEasyCertificate();
        }
    }
    function createEasyCertificate() {
        $("#fullmarkscertificate-easy").html('<br><canvas id="easy-canvas" height="600px" width="800px"></canvas><br><a id="easy-download-btn"><u>Download</u></a>')
        let canvas = document.getElementById('easy-canvas');
        let ctx = canvas.getContext('2d');
        let downloadBtn = document.getElementById('easy-download-btn');
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
        downloadBtn.addEventListener('click', function () {
            downloadBtn.href = canvas.toDataURL('image/png');
            downloadBtn.download = 'EMC Certificate - ' + username;
        })
    } 

    // Standard mode
    let standardquestions = ['Fill in the blanks, and concatenate string1 and string3 such that the output of the print statement is "HelloWorld". (You do not need to put spacings between the concatenation) <br><br>string1 = "Hello"<br>string2 = "Python"<br>\
                            string3 = "World"<br><input id="blank1" type="text" required></input> = <input id="blank2" type="text" required></input><br>print(result)',
                            "Fill in the blank such that the following expression results to 'False'<br><br>(4 <= 2 * 3) <input id='blank1' type='text' required></input> (7 + 2 == 8)",
                            "Fill in the blanks so that the print statement will print '6'.<br><br>def multiply(x, y):<br>&emsp;&emsp;return x * y<br><br>a, b = 2, 3<br>print(<input id='blank1' type='text' required></input>)",
                            "Fill in the blanks to iterate through wordList and append any word that contains the letter 'l' to the list containsL.<br><br>wordList = ['let', 'there', 'be', light', 'and', 'there', 'was', 'light']<br>containsL = []<br>\
                            for word in <input id='blank1' type='text' required></input>:<br>&emsp;&emsp;If 'l' <input id='blank2' type='text' required></input>:<br>&emsp;&emsp;&emsp;&emsp;<input id='blank3' type='text' required></input>(word)",
                            "Given a list of cities, how would you remove 'Chicago' and reinsert it after 'Beijing' and before 'New York'?<br><br>cityList = ['Singapore', 'Chicago', 'Tokyo', 'Beijing', 'New York']<br><input id='blank1' type='text' required></input>.pop(<input id='blank2' type='text' required></input>)<br>cityList.<input id='blank3' type='text' required></input>(<input id='blank4' type='text' required></input> , <input id='blank5' type='text' required></input>)",
                            "Fill in the blanks such that the numbers that are 20 and above are not printed.<br><br>numberList = [3, 8, 15, 20, 22, 29, 36, 14]<br>for number in numberList:<br>&emsp;&emsp;if number >= 20:<br>&emsp;&emsp;&emsp;&emsp;<input id='blank1' type='text' required></input><br>&emsp;&emsp;print(number)",
                            'Given that the output of the following code is "temp < 0", fill in the blanks to show the expected output.<br><br>temp = -15<br><input id="blank1" type="text" required></input> (temp < 0) :<br>&emsp;&emsp;print("temp < 0")<br><input id="blank2" type="text" required></input> (temp < 10) :<br>&emsp;&emsp;print("temp < 10")<br>else:<br>&emsp;&emsp;print("temp >= 10")',
                            "Assume that there is a list called myList, however you are not being told how many elements are in myList. Fill in the blanks to display the last three elements of myList.<br><br>print(myList[<input id='blank1' type='text' required></input>])",
                            "The following code increases all the price in the priceList by 2. Fill in the blanks to update all the values in the price list. (Also, use a list function to count the length of the string instead of counting manually)<br><br>priceList = [ 1.50, 7.10, 8.90, 6.20, 24.00, 12.30, 4.70, 5.00 ]<br>for i in <input id='blank1' type='text' required></input>:<br>&emsp;&emsp;priceList[i] <input id='blank2' type='text' required></input> 2",
                            "Fill in the blanks to prompt the user for pin number until correct pin has been entered. The correct pin is '12345'.<br><br>pin = 0<br><input id='blank1' type='text' required></input> pin <input id='blank2' type='text' required></input> '12345':<br>&emsp;&emsp;pin = <input id='blank3' type='text' required></input>('Enter pin: ')<br>print('Correct pin entered!')",
                            "Create a function that prints the number if an even number is passed into the function.<br><br><input id='blank1' type='text' required></input> is_even(<input id='blank2' type='text' required>):<br>&emsp;&emsp;if n <input id='blank3' type='text' required></input> 2 == 0:<br>&emsp;&emsp;&emsp;&emsp;print(n)",
                            "Fill in the blanks to read data from the csv file named 'colors.csv'.<br><br> file = open('colors.csv', 'r')<br>line = file.<input id='blank1' type='text' required></input>()<br>file.close()",
                            "Convert the following algebric expression into python code. (No need to put spacing for each number/operator)<br><br><img src='Images/Speed Training/equation.png' width='150px'><br><br>y = (<input id='blank1' type='text' required></input>) / (<input id='blank2' type='text' required></input>)",
                            "Write code to generate a random integer between 1 to 100.<br><br>import <input id='blank1' type='text' required></input><br>print(<input id='blank2' type='text' required></input>.<input id='blank3' type='text' required></input>(1, 100))",
                            "Complete the code to display the interest in 2 decimal places.<br><br>principal = 10000.00<br>rate = '10.5'<br>duration = 2<br>interest = (principal * <input id='blank1' type='text' required></input>(rate) * duration) / 100<br>print('Interest ($) : { <input id='blank2' type='text' required></input> }'.format(<input id='blank3' type='text' required></input>))"];
    let standardanswers = [["result", "string1+string3"],
                           ["and"],
                           [],
                           ["wordList", "in word", "containsL.append"],
                           ["cityList", "1", "insert", "3", "'Chicago'"],
                           ["continue"],
                           ["if", "elif"],
                           ["-3:"],
                           ["range(len(priceList))", "+="],
                           ["while", "!=", "input"],
                           ["def", "n", "%"],
                           [],
                           ["a*x**3+b*x**2+c*x", "4"],
                           ["random", "random", "randint"],
                           ["float", ":.2f", "interest"]];
    let multipleanswers = [[],
                           [],
                           ["multiply(a,b)","multiply(b,a)"],
                           [],
                           [],
                           [],
                           [],
                           [],
                           [],
                           [],
                           [],
                           ["read", "readline", "readlines"],
                           [],
                           [],
                           []];

    let numberofblanks = [2, 1, 1, 3, 5, 1, 2, 1, 2, 3, 3, 1, 2, 3, 3];
    let standardpoints = [2500, 1500, 1000, 700, 400]
    randomquestions = [];
    timetakenlist = [];

    $("#begin-standard").click(function (e) {
        $("#standard-instructions").slideUp("normal");
        while(true) {
            number = Math.floor(Math.random() * standardquestions.length);
            repeatedflag = false;
            for (let i of randomquestions) {
                if (i == number) {
                    repeatedflag = true;
                    break;
                }
            }
            if (repeatedflag == false) {
                randomquestions.push(number);
            }
            if (randomquestions.length == 10) {
                break;
            }   
        }
        $("#standard-content").slideDown("normal");
        standardquiz(0)   
    })
    function standardquiz(i) {
        reset();
        start();
        question = randomquestions[i];
        $("#standardquestionnumber").text(i + 1);
        $("#standard-question").html(standardquestions[randomquestions[i]]);
        $("#submit-standard").click(function (e) {
            let answers;
            let answer;
            correctflag = false;
            if (standardanswers[randomquestions[i]].length == 0) {
                answers = multipleanswers[randomquestions[i]];
                for (let i = 0; i < answers.length; i++) {
                    if ($("#blank1").val() == answers[i]) {
                        correctflag = true;
                        break;
                    }
                }
                answer = "";
                for (let n = 0; n < answers.length; n++) {
                    answer += answers[n]
                    if (n < answers.length - 1) {
                        answer += "/";
                    }
                } 
            }
            else {
                answers = standardanswers[randomquestions[i]];
                let blanks = numberofblanks[randomquestions[i]];
                for (let n = 1; n <= blanks; n++)  {
                    let id = "#blank" + String(n);
                    if ($(id).val() == answers[n-1]) {
                        correctflag = true;
                        continue;
                    }
                    else {
                        correctflag = false;
                    }
                    if (correctflag == false) {
                        break;
                    }
                }
                answer = "";
                for (let n = 0; n < blanks; n++) {
                    answer += answers[n]
                    if (n < blanks - 1) {
                        answer += ", ";
                    }
                }
            }
            if ($("#standard").attr("data-timesup") == "true") {
                Swal.fire({
                    title: 'You\'ve exceeded the time!',
                    text: "It's okay! Just understand the concepts well and you'll make it some day!\nCorrect Answer: " + answer,
                    icon: 'warning'
                }).then(function () {
                    $("#easy").attr("data-timesup", "false");
                    $("#standard").attr("data-timesup", "false");
                    $(".minute").css("color", "black");
                    $(".second").css("color", "black");
                    timetakenlist.push(standardmin * 60 + standardsec);
                    if (parseInt($("#standardpoints").text()) > 25000)
                    {
                        $("#standardpoints").text("00000");
                    }
                    if (i != 9) {
                        i++;
                        standardquiz(i)
                    }
                    else {
                        standardresults();
                    }
                })
            }
            else if (correctflag) {
                pause();
                Swal.fire({
                    title: 'You got it right!',
                    text: "Correct Answer(s): " + answer,
                    icon: 'success'
                }).then(function () {
                    let totalallocatedsec = standardmin * 60 + standardsec;
                    let unusedallocatedsec = parseInt($("#standardminute").text()) * 60 + parseInt($("#standardsecond").text())
                    let timetaken = totalallocatedsec - unusedallocatedsec;
                    console.log(timetaken);
                    let points;
                    if (timetaken <= 30) {
                        points = standardpoints[0];
                    }
                    else if (timetaken <= 45) {
                        points = standardpoints[1];
                    }
                    else if (timetaken <= 60) {
                        points = standardpoints[2];
                    }
                    else if (timetaken <= 75) {
                        points = standardpoints[3];
                    }
                    else {
                        points = standardpoints[4]
                    }
                    let updatedpoints = parseInt($("#standardpoints").text()) + points;
                    let newpoints = String(updatedpoints);
                    if (newpoints.length < 5) {
                        let newpointscopy = newpoints;
                        let stringofzeros = "";
                        while (newpointscopy.length < 5) {
                            newpointscopy += "0"
                            stringofzeros += "0"
                        }
                        $("#standardpoints").text(stringofzeros + newpoints);
                    }
                    else {
                        if (updatedpoints > 25000)
                        {
                            $("#standardpoints").text("00000");
                        }
                        else {
                            $("#standardpoints").text(newpoints);
                        }   
                    }
                    timetakenlist.push(timetaken);
                    if (i != 9) {
                        i++;
                        standardquiz(i)
                    }
                    else{
                        standardresults();
                    }  
                })
            }
            else {
                pause();
                let totalallocatedsec = standardmin * 60 + standardsec;
                let unusedallocatedsec = parseInt($("#standardminute").text()) * 60 + parseInt($("#standardsecond").text())
                let timetaken = totalallocatedsec - unusedallocatedsec;
                console.log(timetaken);
                Swal.fire({
                    title: 'You got it wrong!',
                    text: "Correct Answer: " + answer,
                    icon: 'error'
                }).then(function () {
                    timetakenlist.push(timetaken);
                    if (parseInt($("#standardpoints").text()) > 25000)
                    {
                        $("#standardpoints").text("00000");
                    }
                    if (i != 9) {
                        i++;
                        standardquiz(i)
                    }      
                    else {
                        standardresults();
                    }    
                })
            }
        })  
    }
    function standardresults() {
        reset();
        $("#standard-content").slideUp("normal");
        $("#standard-results").slideDown("normal");
        $("#standardpointsresult").text($("#standardpoints").text());
        let totalseconds = 0;
        for (let t of timetakenlist) {
            totalseconds += t;
        }
        let totalminutes = 0;
        if (totalseconds >= 60) {
            totalminutes = Math.floor(totalseconds/60);
            totalseconds -= totalminutes * 60;
        }
        totalminutes = String(totalminutes);
        totalseconds = String(totalseconds);
        if (totalminutes.length != 2) {
            totalminutes = "0" + totalminutes;
        }
        if (totalseconds.length != 2) {
            totalseconds = "0" + totalseconds;
        }
        $("#standardminresult").text(totalminutes);
        $("#standardsecresult").text(totalseconds);
        var jsondata = {"username": userinfo.username,
                        "email": userinfo.email,
                        "password": userinfo.password,
                        "standard_points": $("#standardpoints").text(),
                        "standard_time": totalminutes + ":" + totalseconds};
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://learnpythonatnp-b99e.restdb.io/rest/student/" + userinfo._id,
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
        });

        if ($("#standardpoints").text() == '25000') {
            $(".full-marks").slideDown("slow");
            $("#fullmarkscertificate-standard").slideDown("slow");
            createStandardCertificate();
        }
    }
    
    function createStandardCertificate() {
        $("#fullmarkscertificate-standard").html('<br><canvas id="standard-canvas" height="600px" width="800px"></canvas><br><a id="standard-download-btn"><u>Download</u></a>')
        let canvas = document.getElementById('standard-canvas');
        let ctx = canvas.getContext('2d');
        let downloadBtn = document.getElementById('standard-download-btn');
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
        downloadBtn.addEventListener('click', function () {
            downloadBtn.href = canvas.toDataURL('image/png');
            downloadBtn.download = 'SMC Certificate - ' + username;
        })
    } 
})