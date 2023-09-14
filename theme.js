"use strict";

const themeChosen = localStorage.getItem("theme");
const theme = document.querySelector("body");

const themeSelect = document.querySelector("#theme");
themeSelect.addEventListener("change", select);

function select() {
  const value = themeSelect.value;
  if (value === "light") {
    theme.dataset.theme = "light";
    localStorage.setItem("theme", "light");
    console.log("theme is light");
  } else if (value === "dark") {
    theme.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    console.log("theme is dark");
  } else {
    theme.dataset.theme = "barbie";
    localStorage.setItem("theme", "barbie");
    console.log("theme is barbie");
  }
}

theme.dataset.theme = themeChosen;
themeSelect.value = themeChosen;
