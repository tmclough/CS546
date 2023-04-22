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

// searchForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const selectedTag = document.getElementById("tag-select").value;
//   const response = await fetch(`/homepage?tag=${selectedTag}`);
//   const responseData = await response.text();
//   const posts = JSON.parse(responseData);
//   const postElements = document.querySelectorAll(".post");
//   for (let i = 0; i < postElements.length; i++) {
//     postElements[i].style.display = "none";
//     const postTags = postElements[i].getAttribute("data-tags").split(",");
//     if (selectedTag === "" || postTags.includes(selectedTag)) {
//       postElements[i].style.display = "block";
//     }
//   }
// });

const filterToggleButton = document.querySelector(".filter-toggle-button");
const filterLabel = document.querySelector(".filter-label");
const filterToggleButtonImage = document.querySelector(
  ".filter-toggle-button-image"
);
filterToggleButton.addEventListener("mouseenter", () => {
  filterLabel.style.opacity = 1;
  filterToggleButtonImage.src = "public/images/chevron-up.svg";
});
filterToggleButton.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterToggleButtonImage.src = "public/images/chevron-down.svg";
});
filterLabel.addEventListener("mouseenter", () => {
  filterLabel.style.opacity = 1;
  filterToggleButtonImage.src = "public/images/chevron-up.svg";
});
filterLabel.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterToggleButtonImage.src = "public/images/chevron-down.svg";
});
