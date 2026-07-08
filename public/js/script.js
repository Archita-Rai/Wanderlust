// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// to remove navbar boder when we click on navbar-toggler
const navbar = document.querySelector(".navbar");
const nav_toggler = document.querySelector(".navbar-toggler");

nav_toggler.addEventListener("click", () => {
  navbar.classList.toggle("no-border");
});

// to remove search on md screen when we clic on navbar-toggler
const searchBox = document.querySelector(".search-box-md");
const homeOption = document.querySelector(".home-option");
nav_toggler.addEventListener("click", () => {
  console.log("hello");
  searchBox.classList.toggle("hidden");
  homeOption.classList.toggle("hidden");
});

// to show taxes when we click on switch or on the switch
let taxSwitch = document.getElementById("switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});


// after click on arrow btn to go on the top of screen
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // adds smooth scrolling effect
  });
}

// to show dialog box
const myModal = new bootstrap.Modal(document.getElementById("myDialog"));
myModal.show();
