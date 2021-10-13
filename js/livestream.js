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
            string = hours.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0");
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
            if (changedTime < 0) {
                changedTime = 1440 + changedTime;
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
lnTime = change(sgTime, 420);
lnText = convert(lnTime);

usTime = change(sgTime, 840);
usText = convert(usTime);

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

var SG = document.getElementById("SGl");
SG.onclick = function () {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = sgTexter[i][0] + "<br>-<br>" + sgTexter[i][1];
    }
    var timetext = document.getElementById("timetext");
    timetext.innerHTML = "(Malaysia)";
    replaceText();
}

var ID = document.getElementById("IDl");
ID.onclick = function () {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = idText[i][0] + "<br>-<br>" + idText[i][1];
    }
    var timetext = document.getElementById("timetext");
    timetext.innerHTML = "(India)";
    replaceText();
}

var LN = document.getElementById("LNl");
LN.onclick = function () {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = lnText[i][0] + "<br>-<br>" + lnText[i][1];
    }
    var timetext = document.getElementById("timetext");
    timetext.innerHTML = "(UK)";
    replaceText();
}

var US = document.getElementById("USl");
US.onclick = function () {
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
}


// Changing embedded video
var userDate = new Date();
var userISO = Date.UTC(userDate.getUTCFullYear(), userDate.getUTCMonth(), userDate.getUTCDate(),
    userDate.getUTCHours(), userDate.getUTCMinutes(), userDate.getUTCSeconds());
const fixedDate = Date.UTC(2021, 9, 11, 14, 30); //Change this number to change the time the video changes (It's in UTC format)


if (userISO > fixedDate) {
    console.log("It's happening");
    var intro = document.getElementById("intro_video");
    var videoid = "jNQXAC9IVRw";
    $("#intro_video iframe").remove();
    $('<iframe width="760" height="420" frameborder="0" allowfullscreen></iframe>')
        .attr("src", "http://www.youtube.com/embed/" + videoid)
        .appendTo("#intro_video");
}
