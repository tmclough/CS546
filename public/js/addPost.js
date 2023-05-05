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
  filterLabel.style.visibility = "visible";
  filterToggleButtonImage.src = "public/images/chevron-up.svg";
});
filterToggleButton.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterLabel.style.visibility = "hidden";
  filterToggleButtonImage.src = "public/images/chevron-down.svg";
});
filterLabel.addEventListener("mouseenter", () => {
  filterLabel.style.opacity = 1;
  filterLabel.style.visibility = "visible";
  filterToggleButtonImage.src = "public/images/chevron-up.svg";
});
filterLabel.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterLabel.style.visibility = "hidden";
  filterToggleButtonImage.src = "public/images/chevron-down.svg";
});

function checkString(strVal, varName) {
  if (!strVal) throw `you must supply a ${varName}!`;
  if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  // //if (!isNaN(strVal))
  //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

function checkItemName(strVal, varName) {
  strVal = this.checkString(strVal, varName);
  //if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
  if (strVal.length < 2)
    throw `${varName} should be at least 2 characters long`;
  else if (strVal.length > 60)
    throw `${varName} can only be at max 60 characters long`;
  return strVal;
}

function checkDescription(strVal, varName) {
  strVal = this.checkString(strVal, varName);
  //if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
  if (strVal.length > 200)
    throw `${varName} can only be at max 200 characters long`;

  return strVal;
}

const addPicBtn = document.getElementById("add-image-button");
let imageUploadLabel = document.querySelector(".image-upload-label");
let numberOfPictures = 0;

addPicBtn.addEventListener("click", (event) => {
  if (numberOfPictures < 3) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "images";
    fileInput.classList.add("imageUpload");
    imageUploadLabel.appendChild(fileInput);
    numberOfPictures++;
  }
});

const addPostForm = document.querySelector("#add-post-form");

if (addPostForm) {
  addPostForm.addEventListener("submit", (event) => {
    let errors = false;
    let itemNameInput = document.querySelector("#itemName").value;
    let descriptionInput = document.querySelector("#description").value;
    let locationInput = document.querySelector("#location");
    let tagInputs = document.querySelectorAll("input[name='tagSelect2']");
    let imageInput = document.querySelector(".imageUpload");

    let itemNameInputError = undefined;
    try {
      itemNameInput = checkItemName(itemNameInput, "item name");
    } catch (e) {
      errors = true;
      itemNameInputError = e;
    }

    let descriptionInputError = undefined;
    try {
      itemNameInput = checkDescription(descriptionInput, "description");
    } catch (e) {
      errors = true;
      descriptionInputError = e;
    }

    let locationInputError = undefined;
    if (locationInput.selectedIndex === -1) {
      locationInputError = "must input a location";
      errors = true;
    }

    let checkedTagSelectInputs = Array.from(tagInputs).filter(
      (input) => input.checked
    );
    let tagInputError = undefined;
    if (checkedTagSelectInputs.length === 0) {
      tagInputError = "must input at least one tag";
      errors = true;
    }

    let imageInputError = undefined;
    if (imageInput.files.length === 0) {
      imageInputError = "must input at least one image";
    }

    let clientsideItemNameError = document.querySelector(
      ".clientside-item-name-error"
    );
    let clientsideDescriptionError = document.querySelector(
      ".clientside-description-error"
    );
    let clientsideLocationError = document.querySelector(
      ".clientside-location-error"
    );
    let clientsideTagsError = document.querySelector(".clientside-tags-error");
    let clientsideImageError = document.querySelector(
      ".clientside-image-error"
    );

    clientsideItemNameError.innerHTML = "";
    clientsideDescriptionError.innerHTML = "";
    clientsideLocationError.innerHTML = "";
    clientsideTagsError.innerHTML = "";
    clientsideImageError.innerHTML = "";

    if (errors) {
      event.preventDefault();
      if (itemNameInputError) {
        clientsideItemNameError.innerHTML = itemNameInputError;
      }
      if (descriptionInputError) {
        clientsideDescriptionError.innerHTML = descriptionInputError;
      }
      if (locationInputError) {
        clientsideLocationError.innerHTML = locationInputError;
      }
      if (tagInputError) {
        clientsideTagsError.innerHTML = tagInputError;
      }
      if (imageInputError) {
        clientsideImageError.innerHTML = imageInputError;
      }
    } else {
      addPostForm.submit();
    }
  });
}
