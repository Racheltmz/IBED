// File Name: schedule.js

// Expanding table details
function expand(selected) {
    e = window.event;
    if (e.target.className != "linkBox") {
        var text = null;
        for (var i = 0; i < selected.childNodes.length; i++) {
            if (selected.childNodes[i].className == "details") {
                text = selected.childNodes[i];
                break;
            }
        }

        for (var i = 0; i < selected.childNodes.length; i++) {
            if (selected.childNodes[i].className == "topic") {
                arrow = selected.childNodes[i].childNodes[4];
                break;
            }
        }

        if (text.getAttribute('data-collapsed') != 'true') {
            text.style.maxHeight = "150px";
            text.style.transition = "max-height 0.25s ease-out";
            text.style.marginBottom = "1rem";
            text.setAttribute('data-collapsed', 'true');
            arrow.classList.add('flip');
        } else {
            text.style.maxHeight = "0px";
            text.style.transition = "max-height 0.15s ease-out";
            text.style.marginBottom = "0";
            text.setAttribute('data-collapsed', 'false');
            arrow.classList.remove('flip');
        }
    }
}




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
            if (changedTime > 780) {
                changedTime = changedTime - 720;
                changedTime += 1;
            } else if (changedTime < 0) {
                changedTime = 720 + changedTime;
                changedTime += 1;
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

var SG = document.getElementById("SGl");
SG.onclick = function () {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = sgTexter[i][0] + "<br>-<br>" + sgTexter[i][1];
    }
    var timetext = document.getElementById("timetext");
    timetext.innerHTML = "(Malaysia)";
    header.style.backgroundColor = "#C68D8B";
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
    header.style.backgroundColor = "#AC7274";
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
    header.style.backgroundColor = "#985D6B";
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
    header.style.backgroundColor = "#694453";
}

