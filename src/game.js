"use strict";

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
  .then(response => response.json())
  .then(data => {
    console.log(data);
    populateDropdown(data);
    document.querySelector(".selection").addEventListener("click", selectValue);
  }
  )

// Populate dropdown
function populateDropdown(allWeapons) {
  var dropdownHtml = "";
  for (var i = 0; i < allWeapons.length; i++) {
    const template = document.createElement('template');

    var string = "";
    string = '<a href="#base" class="block selection" value="' + i + '">';
    string += allWeapons[i].name;
    string += "</a>";

    template.innerHTML = string;
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
function selectValue(e) {
  document.querySelector("#searchInput").value = e.target.textContent;
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
