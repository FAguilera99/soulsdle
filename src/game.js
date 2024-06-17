"use strict";

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
  console.log(allWeapons[sessionStorage.getItem("weaponId")].name);

  populateDropdown(allWeapons);

  document.querySelectorAll(".selection").forEach((element) => {
    element.addEventListener("click", (e) => {
      //console.log("here " + e.target.id);
      attemptCounter();
      selectValue(e, data);
      generateGuessBox(e, data);
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
// Generate row of boxes when a guess is selected
function generateGuessBox(e, data){
  const weaponId = e.target.id;
  const allWeapons = data;
  var guessesDiv = document.querySelector("#guessesDiv");
  //console.log("weaponid " + weaponId);

  var container = generateContainer(weaponId, allWeapons);
  var name = generateNameBox(weaponId, allWeapons);

  container.appendChild(name);
  guessesDiv.appendChild(container);
}

// Generate container div
function generateContainer(weaponId, allWeapons) {
  var row = document.createElement("div");
  row.classList.add("guess-container");
  return row;
}

// Generate weapon's name box
function generateNameBox(weaponId, allWeapons) {
  var container = document.createElement("div");

  if (weaponId == sessionStorage.getItem("weaponId")) {
    console.log("Correct!");
    container.classList = "correct-container";
  }
  else {
    console.log("Incorrect!");
    container.classList = "incorrect-container";
  }
  return container;
}

// Populate dropdown
function populateDropdown(allWeapons) {
  var dropdownHtml = "";
  for (var i = 0; i < allWeapons.length; i++) {
    var span = document.createElement("span");
    span.id = i;
    span.classList = "dropdown-row selection"; 
    //span.classList = "inline-block cursor-pointer bg-blue-500 pt-[5px] selection";    

    var imgSrc = "/weapons/" + i + ".png";
    var img = document.createElement("img");
    img.src = imgSrc;
    img.id = i;
    img.classList = "w-[48px] h-[48px]";
    img.title = allWeapons[i].name;
    span.appendChild(img);

    var innerSpan = document.createElement("span");
    innerSpan.title = allWeapons[i].name;
    innerSpan.id = i;
    innerSpan.textContent = allWeapons[i].name;
    innerSpan.classList.add("selection");
    span.appendChild(innerSpan);

    document.querySelector("#myDropdown").appendChild(span);
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