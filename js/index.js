"use strict";

function qs(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs('.section', true);
const shakeButtons = qs(".sign_up_button", true);
const keynote = document.getElementById("keynote_speakers");
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;

function scrollHandler(e) {
  const {
    scrollY
  } = window;
  up = scrollY < prevScrollY;
  down = !up;

  sections.forEach(item => {
    const rect = item.getBoundingClientRect();

    if (rect.top - item.offsetHeight / 5 < targetY) {
      item.classList.add('show-me');
    }
  });

  const keyRect = keynote.getBoundingClientRect();

  if (keyRect.top + keynote.offsetHeight / 5 < targetY) {
    keynote.classList.add('shown');
  }

  prevScrollY = window.scrollY;
}


function scrollFunction() {
  shakeButtons.forEach(shakeButton => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      const shakeRect = shakeButton.getBoundingClientRect();
      shakeButton.classList.add("shaker");
    }
  });
}

scrollHandler();
window.addEventListener('scroll', scrollHandler);

window.onscroll = function () { scrollFunction() };
