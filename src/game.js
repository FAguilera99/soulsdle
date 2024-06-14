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

var allWeapons;
var weapon;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((userData) => {
    // Process the retrieved user data
    allWeapons = userData;
    console.log(userData[sessionStorage.getItem("weaponId")]);
    weapon = userData[sessionStorage.getItem("weaponId")];
    // Cheat (only for debugging and showcasing)
    console.log(weapon.name);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Search
document.querySelector("#dropdownContainer").addEventListener("input", (e) => {
  if (e.target.value != "") {
    document.querySelector("#myDropdown").classList.remove("hidden");
  } else {
    document.querySelector("#myDropdown").classList.add("hidden");
  }
});

document.querySelector("#searchInput").addEventListener("input", searchFilter);

// Filter
function searchFilter() {
  var searchInput = document.getElementById("searchInput");
  var filter = input.value.toUpperCase();
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
document.querySelector(".selection").addEventListener("click", selectValue);

function selectValue(e) {
  document.querySelector("#searchInput").value = e.target.textContent;
}

// Guesses boxes
document.querySelector("#btnGuess").addEventListener('click', e => {
  var searchInput = document.querySelector("#searchInput");
  if (searchInput.value != null)
    console.log("");
})

function insertGuessRow() {
  var div = document.querySelector("#guessesDiv");

  div.appendChild(buildGuessBox());
}
