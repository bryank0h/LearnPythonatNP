$(document).ready(function () {
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
        e.preventDefault;
        $("nav").hide();
        $("#mainmenu").hide();
        $("header").slideUp("normal", function() {
            $("#easymode").slideDown("normal");
        });
        $("#minute").text(easymintext);
        $("#second").text(easysectext);
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
        $("nav").hide();
        $("#mainmenu").hide();
        $("header").slideUp("normal", function() {
            $("#standardmode").slideDown("normal");
        });
        $("#minute").text(standardmintext);
        $("#second").text(standardsectext);
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
        $("#minute").text('00');
        $("#second").text('00');
        $("#easy").data("timesup", "false");
        $("#standard").data("timesup", "false");
        $("#easy-instructions").slideDown("normal");
        $("#easy-content").slideUp("normal");
        $("#minute").css("color", "black");
        $("#second").css("color", "black");
        $(".easyoption").removeAttr("style");
        $("#easypointsresult").text("");
        $("#easyminresult").text("00");
        $("#easysecresult").text("00");
        $("#easy-results").slideUp("normal");
        $("nav").show();
        $("#mainmenu").show();
        $("header").slideDown("normal", function() {
            $(".content").slideUp("normal");
        });
    })

    // Timer
    function start() {
        pause();
        interval = setInterval(timer, 20.7);
    }
    function pause() {
        clearInterval(interval);
    }
    function reset() {
        minute = selectedmin;
        second = selectedsec;
        millisecond = 0;
        $("#minute").text(selectedmintext);
        $("#second").text(selectedsectext);
    }

    function timer() { 
        if ((millisecond -= 10) < 0 || (millisecond -= 10) == 0) {
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
            $("#minute").css("color", "red");
            $("#second").css("color", "red");
        }
        else {
            $("#minute").text(returnData(minute));
            $("#second").text(returnData(second));
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
            number = Math.floor((Math.random() * (easyquestions.length - 1)) + 1);
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
                console.log("hello");
                Swal.fire({
                    title: 'You\'ve exceeded the time!',
                    text: "It's okay! Just understand the concepts well and you'll make it some day!\nCorrect Answer: " + $(answer).text(),
                    icon: 'warning'
                }).then(function () {
                    $("#easy").data("timesup", "false");
                    $("#standard").data("timesup", "false");
                    $("#minute").css("color", "black");
                    $("#second").css("color", "black");
                    $(".easyoption").removeAttr("style");
                    timetakenlist.push(easysec);
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
                    let timetaken = easysec - parseInt($("#second").text());    
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
                        $("#easypoints").text(newpoints);
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
                let timetaken = easysec - parseInt($("#second").text());  
                Swal.fire({
                    title: 'You got it wrong!',
                    text: "Correct Answer: " + $(answer).text(),
                    icon: 'error'
                }).then(function () {
                    timetakenlist.push(timetaken);
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
        if (totalseconds > 60) {
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
    }
})