const toggleButton = document.querySelector(".toggle-button");
toggleButton.addEventListener("click", () => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const toggleButtonImage = document.querySelector(".toggle-button-image");
  if (dropdownMenu.classList.contains("open")) {
    dropdownMenu.classList.remove("open");
    toggleButtonImage.src = "/public/images/align-justify.svg";
    toggleButtonImage.classList.remove("rotate");
  } else {
    dropdownMenu.classList.add("open");
    toggleButtonImage.src = "/public/images/x.svg";
    toggleButtonImage.classList.add("rotate");
  }
  // if (dropdownMenu.style.display === "none") {
  //   dropdownMenu.style.display = "block";
  //   toggleButtonImage.src = "/public/images/x.svg";
  //   toggleButtonImage.classList.add("rotate");
  // } else {
  //   dropdownMenu.style.display = "none";
  //   toggleButtonImage.src = "/public/images/align-justify.svg";
  //   toggleButton.classList.add("rotate");
  // }
});

window.addEventListener("resize", () => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const toggleButtonImage = document.querySelector(".toggle-button-image");
  dropdownMenu.classList.remove("open");
  toggleButtonImage.src = "/public/images/align-justify.svg";
  toggleButtonImage.classList.remove("rotate");
});

document.addEventListener("click", (event) => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (
    !event.target.closest(".dropdown-menu") &&
    !event.target.closest(".toggle-button")
  ) {
    dropdownMenu.classList.remove("open");
    const toggleButtonImage = document.querySelector(".toggle-button-image");
    dropdownMenu.classList.remove("open");
    toggleButtonImage.src = "/public/images/align-justify.svg";
    toggleButtonImage.classList.remove("rotate");
  }
});

// const searchForm = document.getElementById("search-form");
// console.log("here too");

// searchForm.addEventListener("submit", async (event) => {
//   console.log("onclick function");
//   event.preventDefault();
//   const sideForm = document.getElementById("hidden-filter");
//   if (sideForm) {
//     console.log("getting here");
//     try {
//       if (!sideForm.classList.contains("block")) {
//         sideForm.style.display = "block";
//       }

//       // Send form data to the server using AJAX
//       const formData = new FormData(searchForm);
//       console.log(searchForm)
//       const response = await fetch('/homepage', {
//         method: 'POST',
//         body: formData
//       });

//       // Handle the server response here
//       const data = await response.json();
//       console.log(data);

//     } catch (e) {
//       console.log("in the catch");
//     }
//   }
// });

// const searchForm = document.getElementById("search-form");

// searchForm.addEventListener("submit", async (event) => {
//   const sideForm = document.getElementById("hidden-filter");
//   if (sideForm) {
//     console.log("getting here");
//     try {
//       sideForm.style.display = "none"
//       if (!sideForm.classList.contains("block")) {
//         sideForm.style.display = "block"
//         localStorage.setItem('hiddenDivVisible', 'true');
//       }
//     } catch (e) {
//       //event.preventDefault();
//       console.log("in the catch");
//       // const message = typeof e === 'string' ? e : e.message;
//       // sideForm.classList.add('hidden');
//     }
//   }
// });

// window.addEventListener('load', async(event)=>{
//   const hiddenDiv = document.getElementById("hidden-filter")
//   if(localStorage.getItem('hiddenDivVisible')){
//     hiddenDiv.style.display = 'block'
//   }
// })

// console.log("getting here");
// const searchForm = document.getElementById("search-form");
// console.log("here too");
// searchForm.addEventListener("submit", async (event) => {
//   console.log("onclick function");
//    event.preventDefault();
//   const sideForm = document.getElementById("hidden-filter");
//   if (sideForm) {
//     console.log("getting here");
//     try {
//       // sideForm.classList.add("hidden")
//       // console.log("in the try");
//       // sideForm.classList.remove("hidden")
//       // hide containers by default
//       if (!sideForm.classList.contains("block")) {
//         sideForm.style.display = "block"
//       }
//     } catch (e) {
//       //event.preventDefault();
//       console.log("in the catch");
//       // const message = typeof e === 'string' ? e : e.message;
//       // sideForm.classList.add('hidden');
//     }
//   }
// });

// const filterForm = document.getElementById("browse-category-filter");

// filterForm.addEventListener("submit", async (event) => {
//   //event.preventDefault();
//   const sideForm = document.getElementById("hidden-filter");
//   if (sideForm) {
//     try {
//       // hide containers by default
//       if (sideForm.classList.contains("block")) {
//         sideForm.style.display = "none"
//         localStorage.setItem('hiddenDivVisible', 'false');

//     } }catch (e) {
//       const message = typeof e === "string" ? e : e.message;
//       errorTextElement.textContent = e;
//       errorContainer.classList.add("hidden");
//     }
//   }
// });

function clickPostFunction(postId) {
  fetch(`/post/${postId}`, { method: "GET" })
    .then((response) => response.text())
    .then((data) => {
      window.location.href = `/post/${postId}`;
    })
    .catch((error) => console.log(error));
}

const filterToggleButton = document.querySelectorAll(".filter-toggle-button");
const filterLabel = document.querySelectorAll(".filter-label");
const filterToggleButtonImage = document.querySelectorAll(
  ".filter-toggle-button-image"
);

for (let i = 0; i < filterToggleButton.length; i++) {
  filterToggleButton[i].addEventListener("mouseenter", () => {
    filterLabel[i].style.opacity = 1;
    filterLabel[i].style.visibility = "visible";
    filterToggleButtonImage[i].src = "public/images/chevron-up.svg";
  });
  filterToggleButton[i].addEventListener("mouseleave", () => {
    filterLabel[i].style.opacity = 0;
    filterLabel[i].style.visibility = "hidden";
    filterToggleButtonImage[i].src = "public/images/chevron-down.svg";
  });
  filterLabel[i].addEventListener("mouseenter", () => {
    filterLabel[i].style.opacity = 1;
    filterLabel[i].style.visibility = "visible";
    filterToggleButtonImage[i].src = "public/images/chevron-up.svg";
  });
  filterLabel[i].addEventListener("mouseleave", () => {
    filterLabel[i].style.opacity = 0;
    filterLabel[i].style.visibility = "hidden";
    filterToggleButtonImage[i].src = "public/images/chevron-down.svg";
  });
}

// const welcome = document.querySelector(".welcome");

// setTimeout(() => {
//   welcome.textContent = "Home"; // Change the text back to "Home" after 3 seconds
// }, 3000);
