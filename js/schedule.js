// File Name: schedule.js

// Expanding tabel details
function expand(selected) {
    var text = null;
    for (var i = 0; i < selected.childNodes.length; i++) {
        if (selected.childNodes[i].className == "details") {
            text = selected.childNodes[i];
            break;
        }
    }

    if (text.getAttribute('data-collapsed') != 'true') {
        text.style.maxHeight = "100px";
        text.style.transition = "max-height 0.25s ease-out";
        text.setAttribute('data-collapsed', 'true');
    } else {
        text.style.maxHeight = "0px";
        text.style.transition = "max-height 0.15s ease-out";
        text.setAttribute('data-collapsed', 'false');
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
            min = x-(hours*60);
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
            return x-difference;
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

sgTexter = convert(sgTime);

// Applying functions to respective buttons
var SG = document.getElementById("SGl");
SG.onclick = function() {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = sgTexter[i][0] + "<br>-<br>" + sgTexter[i][1];
    }
}

var ID = document.getElementById("IDl");
ID.onclick = function() {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = idText[i][0] + "<br>-<br>" + idText[i][1];
    }
}

var LN = document.getElementById("LNl");
LN.onclick = function() {
    for (i = 0; i < sgText.length; i++) {
        currentText = sgText[i];
        currentText.innerHTML = lnText[i][0] + "<br>-<br>" + lnText[i][1];
    }
}
