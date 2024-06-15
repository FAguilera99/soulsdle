"use strict";

//const { i } = require("vite/dist/node/types.d-aGj9QkWt");

var hp = 10;

// API
const apiUrl = "https://jgalat.github.io/ds-weapons-api/";
const numWeapons = 116;

if (sessionStorage.length == 0) {
  const weaponId = Math.floor(Math.random() * numWeapons);
  console.log(weaponId);
  sessionStorage.setItem("weaponId", weaponId);
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    populateDropdown(data);
    document
      .querySelectorAll(".selection")
      .forEach(element => {
        element.addEventListener("click", (e) => selectValue(e, data));
      })
  });

// Populate dropdown
function populateDropdown(allWeapons) {
  var dropdownHtml = "";
  for (var i = 0; i < allWeapons.length; i++) {
    var imgSrc = "./media/weapons/" + i + ".png";
    var imgString =
      '<img class="w-[32px] h-[32px]" src="' +
      imgSrc +
      '" title="' +
      allWeapons[i].name +
      '"/>';
    
    var finalString =
      '<a href="#base" class="inline-block hover:bg-white pt-[5px] selection" value="' + i + '">';
    finalString += imgString;
    finalString +=
      '<span title="' +
      allWeapons[i].name +
      '" class=".selectionValue">' +
      allWeapons[i].name +
      "</span>";
    finalString += "</a>";

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
  if (!e.target.closest("#dropdownProfileButton")) {
    document.querySelector("#myDropdown").classList.add("hidden");
  }
});

document.querySelector("#searchInput").addEventListener("click", (e) => {
  if (e.target.value != "") {
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
  console.log(e.target.title);
  document.querySelector("#searchInput").value = e.target.title;
}

// Guesses boxes
document.querySelector("#btnGuess").addEventListener("click", (e) => {
  var searchInput = document.querySelector("#searchInput");
  if (searchInput.value != null) console.log("");
});

function insertGuessRow() {
  var div = document.querySelector("#guessesDiv");

  div.appendChild(buildGuessBox());
}
