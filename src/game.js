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

  // ONLY FOR TESTING
  sessionStorage.setItem("weaponId", 6); // 6 == Bastard sword STR = 16/C

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

  var row = generateRow(weaponId, allWeapons);
  var name = generateName(weaponId, allWeapons);
  var wpnType = generateWpnType(weaponId, allWeapons);
  var atkType = generateAtkType(weaponId, allWeapons);
  var strength = generateStr(weaponId, allWeapons);

  row.appendChild(name);
  row.appendChild(wpnType);
  row.appendChild(atkType);
  row.appendChild(strength);
  guessesDiv.appendChild(row);
}

// Generate row of guess
function generateRow(weaponId, allWeapons) {
  var row = document.createElement("div");
  row.classList.add("guess-row");
  return row;
}

// Generate box that sorrounds each span
function generateBlockBox() {
  var box = document.createElement("div");
  box.classList = "block-box";
  return box;
}

// Generate weapon's name span
function generateName(weaponId, allWeapons) {
  var box = generateBlockBox();
  var span = document.createElement("span");

  var img = document.createElement("img");
  img.src = "/public/weapons/" + weaponId + ".png";
  img.classList = "guess-img";
  span.appendChild(img);

  span.classList = "guess-span";
  var txt = document.createElement("span");
  txt.textContent = allWeapons[weaponId].name;
  span.appendChild(txt);

  if (weaponId == sessionStorage.getItem("weaponId")) {
    console.log("Correct!");
    span.classList.add("correct-span");
  }
  else {
    console.log("Incorrect!");
    span.classList.add("incorrect-span");
  }

  box.appendChild(span);
  return box;
}

// Generate span for weapon type
function generateWpnType(weaponId, allWeapons) {
  var box = generateBlockBox();
  var span = document.createElement("span");
  span.classList = "guess-span";
  span.textContent = capitalizeFirstLetter(allWeapons[weaponId].weapon_type);

  if (allWeapons[weaponId].weapon_type == allWeapons[sessionStorage.getItem("weaponId")].weapon_type) {
    console.log("Correct!");
    span.classList.add("correct-span");
  }
  else {
    console.log("Incorrect!");
    span.classList.add("incorrect-span");
  }
  box.appendChild(span);
  return box;
}

// Generate span for attack type
function generateAtkType(weaponId, allWeapons) {
  var box = generateBlockBox();
  var span = document.createElement("span");
  span.classList = "guess-span";
  span.textContent = capitalizeFirstLetter(allWeapons[weaponId].attack_type);

  var thisType = allWeapons[weaponId].attack_type;
  var correctType = allWeapons[sessionStorage.getItem("weaponId")].attack_type;

  if (thisType == correctType) {
    span.classList.add("correct-span");
  }
  else if (correctType.includes(thisType) || thisType.includes(correctType)) {
    span.classList.add("partial-span");
  }
  else {
    span.classList.add("incorrect-span");
  }

  box.appendChild(span);
  return box;
}

// Generate span for strength requirement / scaling
function generateStr(weaponId, allWeapons) {
  var box = generateBlockBox();
  var span = document.createElement("span");
  span.classList = "guess-span";

  var thisReq = allWeapons[weaponId].requirements.strength;
  var correctReq = allWeapons[sessionStorage.getItem("weaponId")].requirements.strength;
  
  var thisScale = allWeapons[weaponId].bonus.strength;
  var correctScale = allWeapons[sessionStorage.getItem("weaponId")].bonus.strength;

  if (thisReq == correctReq && thisScale == correctScale) {
    span.textContent = thisReq + " / " + thisScale;
    span.classList.add("correct-span");
  } else {
    if (thisReq != correctReq && thisScale != correctScale) {
      span.classList.add("incorrect-span");
    } else {
      span.classList.add("partial-span");
    }
    var txt = "";
    // a > b = false (default js behaviour)
    // in dark souls, higher is better
    // objective is (arrow) req / scale (arrow)
    // TODO FIX BREAKSPACE ON ARROWS
    if (thisReq < correctReq) {
      var reqArrow = document.createElement("img");
      reqArrow.classList = "req-arrow";
      reqArrow.src = "/public/icons/arrow_up.png";
      span.appendChild(reqArrow);
    } else if (thisReq > correctReq) {
      var reqArrow = document.createElement("img");
      reqArrow.classList = "req-arrow";
      reqArrow.src = "/public/icons/arrow_down.png";
      span.appendChild(reqArrow);
    }

    var txt = document.createElement("span");
    txt.textContent = thisReq + " / " + thisScale;
    span.appendChild(txt);

    if (thisScale < correctScale) {
      var reqArrow = document.createElement("img");
      reqArrow.classList = "req-arrow";
      reqArrow.src = "/public/icons/arrow_up.png";
      span.appendChild(reqArrow);
    } else if (thisScale > correctScale) {
      var reqArrow = document.createElement("img");
      reqArrow.classList = "req-arrow";
      reqArrow.src = "/public/icons/arrow_down.png";
      span.appendChild(reqArrow);
    }
  }

  box.appendChild(span);
  return box;
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
    img.title = "&nbsp;" + allWeapons[i].name;
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
  e.stopPropagation();
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

// Helper functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}