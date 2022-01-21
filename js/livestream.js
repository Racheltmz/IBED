// File Name: schedule.js


// Converting Time Zones
var sgText = document.getElementsByClassName("time");
sgTime = [];
for (i = 0; i < sgText.length; i++) {
    var text = sgText[i].textContent;
    text = text.split("-");
    var result = text.map(function (x) {
        temp = x.split(":");
        hour = parseInt(temp[0], 10);
        hour *= 60;
        second = parseInt(temp[1], 10);
        second += hour;
        return second;
    });
    sgTime.push(result);
}

function convert(time) {
    text = [];
    for (i = 0; i < time.length; i++) {
        var indiv = time[i];
        var result = indiv.map(function (x) {
            hours = Math.floor(x / 60);
            min = x - (hours * 60);
            if (min % 5 == 1) {
                string = hours.toString() + ":" + (min - 1).toString().padStart(2, "0") + "pm";
            } else {
                string = hours.toString() + ":" + min.toString().padStart(2, "0") + "am";
            }
            return string;
        });
        text.push(result);
    }
    return text;
}

function change(time, difference) {
    newTime = [];
    for (i = 0; i < time.length; i++) {
        var diffed = time[i].map(function (x) {
            changedTime = x - difference;
            if (changedTime >= 720) {
                if (changedTime < 780) {
                    changedTime += 1;
                } else {
                    changedTime = changedTime - 720;
                    changedTime += 1;
                }
            } else if (changedTime < 0) {
                changedTime = 720 + changedTime;
                changedTime += 1;
            } else if (changedTime >= 0 && changedTime < 60) {
                changedTime += 720;
            }
            return changedTime;
        });
        newTime.push(diffed);
    }
    return newTime;
}

// Generating India time and text
idTime = change(sgTime, 150);
idText = convert(idTime);

// Generating London time and text
lnTime = change(sgTime, 480);
lnText = convert(lnTime);

usTime = change(sgTime, 900);
usText = convert(usTime);

sgTime = change(sgTime, 0);
sgTexter = convert(sgTime);

// Applying functions to respective buttons
text1 = "Day 1 - January 15, 2022 (Saturday)";
text2 = "Day 2 - January 16, 2022 (Sunday)";

function replaceText() {
    var day1 = document.getElementById("day1");
    var day2 = document.getElementById("day2");
    day1.innerHTML = text1;
    day2.innerHTML = text2;
}

var header = document.getElementById("tableHeader");

for (i = 0; i < sgText.length; i++) {
    currentText = sgText[i];
    currentText.innerHTML = sgTexter[i][0] + "<br>-<br>" + sgTexter[i][1];
}
var timetext = document.getElementById("timetext");
timetext.innerHTML = "(Malaysia)";
header.style.backgroundColor = "#C68D8B";
replaceText();

var SG = document.getElementsByClassName("SGl");
for (i = 0; i < SG.length; i++) {
    var SGl = SG[i];
    SGl.onclick = function () {
        for (i = 0; i < sgText.length; i++) {
            currentText = sgText[i];
            currentText.innerHTML = sgTexter[i][0] + "<br>-<br>" + sgTexter[i][1];
        }
        var timetext = document.getElementById("timetext");
        timetext.innerHTML = "(Malaysia)";
        header.style.backgroundColor = "#C68D8B";
        replaceText();
    }
}

var ID = document.getElementsByClassName("IDl");
for (i = 0; i < ID.length; i++) {
    var IDl = ID[i];
    IDl.onclick = function () {
        for (i = 0; i < sgText.length; i++) {
            currentText = sgText[i];
            currentText.innerHTML = idText[i][0] + "<br>-<br>" + idText[i][1];
        }
        var timetext = document.getElementById("timetext");
        timetext.innerHTML = "(India)";
        header.style.backgroundColor = "#AC7274";
        replaceText();
    }
}

var LN = document.getElementsByClassName("LNl");
for (i = 0; i < LN.length; i++) {
    var LNl = LN[i];
    LNl.onclick = function () {
        for (i = 0; i < sgText.length; i++) {
            currentText = sgText[i];
            currentText.innerHTML = lnText[i][0] + "<br>-<br>" + lnText[i][1];
        }
        var timetext = document.getElementById("timetext");
        timetext.innerHTML = "(UK)";
        header.style.backgroundColor = "#985D6B";
        replaceText();
    }
}

var US = document.getElementsByClassName("USl");
for (i = 0; i < US.length; i++) {
    var USl = US[i];
    USl.onclick = function () {
        for (i = 0; i < sgText.length; i++) {
            currentText = sgText[i];
            currentText.innerHTML = usText[i][0] + "<br>-<br>" + usText[i][1];
        }
        var timetext = document.getElementById("timetext");
        timetext.innerHTML = "(US, Colorado)";
        var day1 = document.getElementById("day1");
        day1.innerHTML = "Day 1 - January 14-15, 2022 (Fri-Sat)";
        var day2 = document.getElementById("day2");
        day2.innerHTML = "Day 2 - January 15-16, 2022 (Sat-Sun)";
        header.style.backgroundColor = "#694453";
    }
}


// // Changing embedded video
// var userDate = new Date();
// var userISO = Date.UTC(userDate.getUTCFullYear(), userDate.getUTCMonth(), userDate.getUTCDate(),
//     userDate.getUTCHours(), userDate.getUTCMinutes(), userDate.getUTCSeconds());
// const HHSession = Date.UTC(2022, 0, 15, 3); //Change this number to change the time the video changes (It's in UTC format)
// const Session2 = Date.UTC(2022, 0, 15, 5, 30);
// const Session3 = Date.UTC(2022, 0, 15, 7, 55);
// const Session4 = Date.UTC(2022, 0, 16, 0, 30);
// const Session5 = Date.UTC(2022, 0, 16, 2, 55);
// const RZSession = Date.UTC(2022, 0, 16, 7, 30);
// Times = [Session2, Session3, Session4, Session5, RZSession];
// Links = ["NY7gyPUVDi8", "t0QEk7XEFnU", "g_yZv8AZ_40", "JCzkojnrvD4", "EgWmADDGp60"]

// function changedStream(Time, link) {
//     if (userISO > Time) {
//         var videoid = link;
//         $("#intro_video iframe").remove();
//         $('<iframe width="760" height="420" frameborder="0" allowfullscreen></iframe>')
//             .attr("src", "http://www.youtube.com/embed/" + videoid)
//             .appendTo("#intro_video");
//     }
// }

// for (var i = 0; i < Times.length; i++) {
//     changedStream(Times[i], Links[i]);
// }


// if (userISO > HHSession) {
//     var intro = document.getElementById("intro_video");
//     var videoid = "cy0L2dE6nwA";
//     $("#intro_video iframe").remove();
//     $('<iframe width="760" height="420" frameborder="0" allowfullscreen></iframe>')
//         .attr("src", "http://www.youtube.com/embed/" + videoid)
//         .appendTo("#intro_video");
// }
