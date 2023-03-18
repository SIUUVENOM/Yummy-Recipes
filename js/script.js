let rowData = document.querySelector(".row");
$(document).ready(() => {
  getCategory().then(() => {
    $(".loading-screen").fadeOut(1000);
    $("body").css("overflow", "visible");
  });
});

$(".right i").click(() => {
  if ($(".side-nav .hidden").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});
function openNav() {
  $(".side-nav .hidden").animate({ left: "0px" }, 500);
  $(".side-nav .right").animate(
    { left: `${$(".side-nav ").outerWidth()}` },
    500
  );
  $(".right .close").removeClass("fa-bars");
  $(".right .close").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".navbar-nav li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

function closeNav() {
  $(".side-nav .hidden").animate({ left: "-400px" }, 500);
  $(".side-nav .right").animate({ left: "0px" }, 500);
  $(".right .close").removeClass("fa-x");
  $(".right .close").addClass("fa-bars");
  for (let i = 0; i < 5; i++) {
    $(".navbar-nav li")
      .eq(i)
      .animate({ top: "300px" }, (i + 5) * 100);
  }
}
let data = [];
async function getCategory() {
  data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  );
  data = await data.json();
  display(data.meals);
}
getCategory();

function display(array) {
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `
        <div class="col-md-3 my-5">
                    <div class="meal position-relative overflow-hidden rounded-2" onclick="getDetails(${array[i].idMeal})">
                        <div class="meal-img">
                            <img src="${array[i].strMealThumb}" alt="meals" class="w-100 rounded">
                        </div>
                        <div class="meal-layer position-absolute top-100 rounded">
                            <h3 class="my-5 py-5 px-4">${array[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
  }
  rowData.innerHTML = str;
}

async function getSearchByName(search) {
  closeNav();
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  data = await data.json();
  displaySearch(data.meals);
}

async function searchByLetter(search) {
  closeNav();
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`
  );
  data = await data.json();
  displaySearch(data.meals);
}

function displaySearch(array) {
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `
        <div class="col-md-3 my-5">
                    <div class="meal position-relative overflow-hidden rounded-2" onclick="getDetails(${array[i].idMeal})">
                        <div class="meal-img">
                            <img src="${array[i].strMealThumb}" alt="meals" class="w-100 rounded">
                        </div>
                        <div class="meal-layer position-absolute top-100 rounded">
                            <h3 class="my-5 py-5 px-4">${array[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `;
  }
  document.querySelector(".search-container").innerHTML = str;
}

function displaySrearch() {
  rowData.innerHTML = `
  <div class="col-md-6 my-5">
                    <input type="text" class="search-name form-control text-white bg-transparent" placeholder="Search By Name" onkeyup="getSearchByName(this.value)">
                    </div>
  <div class="col-md-6 my-5">
                    <input type="text" class="form-control text-white bg-transparent" placeholder="Search By First Letter" onkeyup="searchByLetter(this.value)" maxlength="1">
  </div>
                    `;
}

async function categories() {
  data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  data = await data.json();
  displayCategories(data.categories);
}

function displayCategories(array) {
  rowData.innerHTML = "";
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `
        <div class="col-md-3 my-5">
                    <div class="meal position-relative overflow-hidden rounded-2" onclick="filterCaegory('${array[i].strCategory}')">
                        <div class="meal-img">
                            <img src="${array[i].strCategoryThumb}" alt="meals" class="w-100 rounded">
                        </div>
                        <div class="meal-layer position-absolute top-100 rounded text-center">
                            <h3>${array[i].strCategory}</h3>
                            <p>${array[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        `;
  }
  rowData.innerHTML = str;
}

async function area() {
  data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  data = await data.json();
  displayArea(data.meals);
}

function displayArea(array) {
  rowData.innerHTML = "";
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `
        <div class="col-md-3 my-5">
                    <div class="rounded-2 text-center text-white cursor-pointer" onclick="filterArea('${array[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${array[i].strArea}</h3>
                    </div>
                    </div>
        `;
  }
  rowData.innerHTML = str;
}

async function ingredents() {
  data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  data = await data.json();
  displayIngredents(data.meals.slice(0, 20));
}

function displayIngredents(array) {
  rowData.innerHTML = "";
  let str = ``;
  for (let i = 0; i < array.length; i++) {
    str += `
        <div class="col-md-3 my-5">
                    <div class="rounded-2 text-center text-white cursor-pointer" onclick="filterIngrednts('${
                      array[i].strIngredient
                    }')">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${array[i].strIngredient}</h3>
                    <p>${array[i].strDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
                    </div>
                    </div>
        `;
  }
  rowData.innerHTML = str;
}

async function getDetails(id) {
  closeNav();
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  data = await data.json();
  displayDetails(data.meals[0]);
}

function displayDetails(array) {
  console.log(array);
  rowData.innerHTML = "";
  document.querySelector(".search-container").innerHTML = "";
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (array[`strIngredient${i}`] != "") {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        array[`strMeasure${i}`]
      } ${array[`strIngredient${i}`]}</li>`;
    }
  }
  console.log(ingredients);
  let tags = array.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let str = `
  <div class="col-md-4">
  <div class="image rounded mt-1">
  <img src="${array.strMealThumb}" class="w-100 rounded">
  <h3 class="text-white">${array.strMeal}</h3>
</div>
  </div>
  <div class="col-md-8">
  <div class="details text-white mt-1">
  <h2>instractions</h2>
  <p>${array.strInstructions}</p>
  <h3 class="fw-bolder"><span>Area :</span>${array.strArea}</h3>
  <h3 class="fw-bolder"><span>Category :</span>${array.strCategory}</h3>\
  <h3 class="fw-bolder">Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${ingredients}
  </ul>
  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${tagsStr}
  </ul>
  <a target="_blank" href="${array.strSource}" class="btn btn-success mx-2">Source</a>
  <a target="_blank" href="${array.strYoutube}" class="btn btn-danger">Youtube</a>
  </div>
  </div>
  `;
  rowData.innerHTML = str;
}

async function filterCaegory(categ) {
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`
  );
  data = await data.json();
  display(data.meals);
}

async function filterArea(area) {
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  data = await data.json();
  display(data.meals);
}

async function filterIngrednts(ingred) {
  data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  data = await data.json();
  display(data.meals);
}

function contacts() {
  rowData.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-block">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled="true">Submit</button>
    </div>
</div>
  `;
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInput = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInput = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInput = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInput = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInput = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInput = true;
  });
}
let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function inputsValidation() {
  if (nameInput) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInput) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInput) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInput) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInput) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInput) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
