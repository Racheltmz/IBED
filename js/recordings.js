//  File Name: recordings.js

function openNav() {
    document.getElementById("sidenav").style.width = "250px";
    document.getElementsByClassName("overlay")[0].className += " active";
}


function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    document.getElementsByClassName("overlay")[0].className = "overlay";
}