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
  sessionStorage.setItem("weaponId", 13); // 13 == blacksmith giant hammer

  var allWeapons = data;
  console.log(allWeapons[sessionStorage.getItem("weaponId")].name);

  populateDropdown(allWeapons);

  document.querySelectorAll(".selection").forEach((element) => {
    element.addEventListener("click", (e) => {
      //console.log("here " + e.target.id);
      document.querySelector("#searchInput").value = "";
      document.querySelector("#myDropdown").classList.add("hidden");
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
function generateGuessBox(e, data) {
  const weaponId = e.target.id;
  const allWeapons = data;
  var guessesDiv = document.querySelector("#guessesDiv");

  var row = generateRow(weaponId, allWeapons);
  var name = generateName(weaponId, allWeapons);
  var wpnType = generateWpnType(weaponId, allWeapons);
  var atkType = generateAtkType(weaponId, allWeapons);
  var strength = generateStat(weaponId, allWeapons, "strength");
  var dexterity = generateStat(weaponId, allWeapons, "dexterity");
  var intelligence = generateStat(weaponId, allWeapons, "intelligence");
  var faith = generateStat(weaponId, allWeapons, "faith");
  var dmgType = generateDmgType(weaponId, allWeapons);

  row.appendChild(name);
  row.appendChild(wpnType);
  row.appendChild(atkType);
  row.appendChild(strength);
  row.appendChild(dexterity);
  row.appendChild(intelligence);
  row.appendChild(faith);
  row.appendChild(dmgType);
  guessesDiv.appendChild(row);
}

// Generate row of guess
function generateRow(weaponId, allWeapons) {
  const template = document.querySelector("#rowTemplate");
  var row = template.cloneNode(true);
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
  txt.classList = "name-txt";
  txt.textContent = allWeapons[weaponId].name;
  span.appendChild(txt);

  if (weaponId == sessionStorage.getItem("weaponId")) {
    console.log("Correct!");
    span.classList.add("correct-span");
  } else {
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

  if (
    allWeapons[weaponId].weapon_type ==
    allWeapons[sessionStorage.getItem("weaponId")].weapon_type
  ) {
    console.log("Correct!");
    span.classList.add("correct-span");
  } else {
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
  } else if (correctType.includes(thisType) || thisType.includes(correctType)) {
    span.classList.add("partial-span");
  } else {
    span.classList.add("incorrect-span");
  }

  box.appendChild(span);
  return box;
}

// Generate span for strength requirement / scaling
function generateStat(weaponId, allWeapons, stat) {
  var box = generateBlockBox();
  var span = document.createElement("span");
  span.classList = "guess-span";

  var div = document.createElement("div");

  var thisReq = allWeapons[weaponId].requirements[stat];
  var correctReq =
    allWeapons[sessionStorage.getItem("weaponId")].requirements[stat];

  var thisScale = allWeapons[weaponId].bonus[stat];
  var correctScale =
    allWeapons[sessionStorage.getItem("weaponId")].bonus[stat];

  if (thisReq == correctReq && thisScale == correctScale) {
    if (thisScale == null) {
      thisScale = "No";
    }
    span.textContent = thisReq + " / " + thisScale;
    span.classList.add("correct-span");
  } else {
    if (thisReq != correctReq && thisScale != correctScale) {
      span.classList.add("incorrect-span");
    } else {
      span.classList.add("partial-span");
    }
    // a > b = false (default js behaviour)
    // in dark souls, higher is better
    // objective is (arrow) req / scale (arrow)
    // TODO FIX BREAKSPACE ON ARROWS
    if (thisReq < correctReq) {
      var arrow = createArrow("up");
      arrow.style.float = "left";
      div.appendChild(arrow);
    } else if (thisReq > correctReq) {
      var arrow = createArrow("down");
      arrow.style.float = "left";
      div.appendChild(arrow);
    }

    var txt = document.createElement("span");
    if (thisScale == null) {
      thisScale = "No";
    }
    txt.textContent = thisReq + " / " + thisScale;
    div.appendChild(txt);

    if (thisScale < correctScale) {
      var arrow = createArrow("up");
      arrow.style.float = "right";
      div.lastChild.after(arrow);
    } else if (thisScale > correctScale || correctScale == null) {
      var arrow = createArrow("down");
      arrow.style.float = "right";
      div.lastChild.after(arrow);
    }
  }

  span.appendChild(div);
  box.appendChild(span);
  return box;
}

// Generate span for special weapon
function generateDmgType(weaponId, allWeapons) {
  var box = generateBlockBox();
  var span = document.createElement("span");
  span.classList = "guess-span";

  var damages = allWeapons[weaponId].damage;
  damages = Object.keys(damages).map((key) => [key, damages[key]]);
  var myDamages = [];

  damages.forEach(element => {
    if (element[1] > 0) {
      myDamages.push(element[0]);
    }
  });

  var correctDamages = [];
  var correctId = sessionStorage.getItem("weaponId");
  damages = allWeapons[correctId].damage;
  damages = Object.keys(damages).map((key) => [key, damages[key]]);
  damages.forEach(element => {
    if (element[1] > 0) {
      correctDamages.push(element[0]);
    }
  });

  span.textContent = myDamages.join(', ');

  if (arraysEqual(myDamages, correctDamages)) {
    span.classList.add("correct-span");
  } else {
    let intersection = myDamages.filter(
      (element) => correctDamages.includes(element));

    console.log(intersection);
    
    if (intersection.length == 0) {
      span.classList.add("incorrect-span");
    } else {
      span.classList.add("partial-span");
    }
  }

  box.appendChild(span);
  return box;

  console.log(myDamages);
  console.log(correctDamages);
  console.log(arraysEqual(myDamages, correctDamages));
}

// Populate dropdown
function populateDropdown(allWeapons) {
  var dropdownHtml = "";
  for (var i = 0; i < allWeapons.length; i++) {
    var span = document.createElement("span");
    span.id = i;
    span.classList = "dropdown-row selection search-row";

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
  var a = div.querySelectorAll(".search-row");

  for (var i = 0; i < a.length; i++) {
    var txtValue = (a[i].querySelector("span")).textContent || a[i].querySelector("span").innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";

    } else {

      a[i].style.display = "none";
    }
  }
}

// Select value in Search
function selectValue(e, allWeapons) {
  //console.log(e.target.title);
  e.stopPropagation();
  
}

// Guesses boxes
// document.querySelector("#btnGuess").addEventListener("click", (e) => {
// var searchInput = document.querySelector("#searchInput");
//  if (searchInput.value != null) console.log("");
//});

// Counter
var attempts = 10;
function attemptCounter() {
  attempts -= 1;
  document.querySelector("#counter").innerHTML = attempts;
}

// Insert boxes when guessing
function insertGuessRow() {
  var div = document.querySelector("#guessesDiv");

  div.appendChild(buildGuessBox());
}

// Clue button
document.querySelector("#counter").addEventListener("change", (e) => {
  console.log(e.target.value);
});

// Helper functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createArrow(direction) {
  var img = document.createElement("img");
  img.src = "/public/icons/arrow_" + direction + ".png";
  img.classList = "arrow";
  return img;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}