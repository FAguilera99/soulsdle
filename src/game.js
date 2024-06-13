"use strict";

var hp = 10;

// API
const apiUrl = "https://jgalat.github.io/ds-weapons-api/";
const numWeapons = 116;

if (sessionStorage.length == 0){
    const weaponId = Math.floor(Math.random() * numWeapons);
    console.log(weaponId);
    sessionStorage.setItem("weaponId", weaponId);
}

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((userData) => {
    // Process the retrieved user data
    const weapon = userData[sessionStorage.getItem("weaponId")];
    // Cheat (only for debugging and showcasing)
    console.log(weapon.name);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Search
document.querySelector("#dropdownContainer").addEventListener("input", (e) => {
  if (e.target.value != "") {
    //document.querySelector("#myDropdown").classList.remove("hidden");
    //document.querySelector("#myDropdown").classList.add("block");
  } else {
    //document.querySelector("#myDropdown").classList.remove("block");
    //document.querySelector("#myDropdown").classList.add("hidden");
  }
});

// Filter
function filterFunction() {
  var input = document.getElementById("myInput");
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
  document.querySelector("#myInput").value = e.target.textContent;
}
//
