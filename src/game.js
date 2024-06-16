"use strict";
import images from "./media/weapons/*.png";

// API
const apiUrl = "https://jgalat.github.io/ds-weapons-api/";
const numWeapons = 116;

// Main
function main(data) {
  var weaponId = -1;

  if (sessionStorage.length == 0) {
    weaponId = Math.floor(Math.random() * numWeapons);
    console.log(weaponId);
    sessionStorage.setItem("weaponId", weaponId);
  }
  var allWeapons = data;
  console.log(allWeapons[0].name);

  populateDropdown(allWeapons);

  document.querySelectorAll(".selection").forEach((element) => {
    element.addEventListener("click", (e) => {
      attemptCounter();
      selectValue(e, data);
    });
  });
}

//
// Fetch weapons from API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    main(data);
  });


//
// Populate dropdown
function populateDropdown(allWeapons) {
  var dropdownHtml = "";
  for (var i = 0; i < allWeapons.length; i++) {
    var imgSrc = "/media/weapons/" + i + ".png";
    var imgString =
      '<img class="w-[32px] h-[32px]" src="' +
      imgSrc +
      '" title="' +
      allWeapons[i].name +
      '"/>';

    var finalString =
      '<a href="#" class="inline-block bg-blue-500 pt-[5px] selection" value="' +
      i +
      '">';
    finalString += imgString;
    finalString +=
      '<span title="' +
      allWeapons[i].name +
      '" class=".selectionValue">' +
      allWeapons[i].name +
      "</span>";
    finalString += "</a>";
    //console.log(finalString);

    const template = document.createElement("template");
    template.innerHTML = finalString;
    document.querySelector("#myDropdown").appendChild(template.content);
  }
}

// Search
document.querySelector("#dropdownContainer").addEventListener("input", (e) => {
  if (e.target.value != "") {
    document.querySelector("#myDropdown").classList.remove("hidden");
  } else {
    document.querySelector("#myDropdown").classList.add("hidden");
  }
});

document.querySelector("#searchInput").addEventListener("input", searchFilter);

// Close and open dropdown
document.addEventListener("click", (e) => {
  if (!e.target.closest("#searchInput")) {
    document.querySelector("#myDropdown").classList.add("hidden");
  }
});

document.querySelector("#searchInput").addEventListener("click", (e) => {
  
  if (e.target.value != "") {
    console.log("boop");
    document.querySelector("#myDropdown").classList.remove("hidden");
  }
});

// Filter
function searchFilter() {
  var searchInput = document.getElementById("searchInput");
  var filter = searchInput.value.toUpperCase();
  var div = document.querySelector("#myDropdown");
  var a = div.getElementsByTagName("a");

  for (var i = 0; i < a.length; i++) {
    var txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].classList.remove("hidden");
    } else {
      a[i].classList.add("hidden");
    }
  }
}

// Select value in Search
function selectValue(e, allWeapons) {
  //console.log(e.target.title);
  document.querySelector("#searchInput").value = e.target.title;
}

// Guesses boxes
// document.querySelector("#btnGuess").addEventListener("click", (e) => {
// var searchInput = document.querySelector("#searchInput");
//  if (searchInput.value != null) console.log("");
//});

// Counter
var attempts = 10;
function attemptCounter(){
  attempts -= 1;
  document.querySelector("#counter").innerHTML = attempts;
}

// Insert boxes when guessing
function insertGuessRow() {
  var div = document.querySelector("#guessesDiv");

  div.appendChild(buildGuessBox());
}

// Clue button
document.querySelector("#counter").addEventListener("change", e => {
  console.log(e.target.value);
})