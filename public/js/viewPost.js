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
  filterToggleButtonImage.src = "/public/images/chevron-up.svg";
});
filterToggleButton.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterLabel.style.visibility = "hidden";
  filterToggleButtonImage.src = "/public/images/chevron-down.svg";
});
filterLabel.addEventListener("mouseenter", () => {
  filterLabel.style.opacity = 1;
  filterLabel.style.visibility = "visible";
  filterToggleButtonImage.src = "/public/images/chevron-up.svg";
});
filterLabel.addEventListener("mouseleave", () => {
  filterLabel.style.opacity = 0;
  filterLabel.style.visibility = "hidden";
  filterToggleButtonImage.src = "/public/images/chevron-down.svg";
});

function checkString(strVal, varName) {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  // //if (!isNaN(strVal))
  //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

function checkCommentInput(comment, varName) {
  comment = this.checkString(comment, varName);
  if (comment.length === 0)
    throw `${varName} should be at least 2 characters long`;
  else if (comment.length > 60)
    throw `${varName} can only be at max 60 characters long`;

  return comment;
}

function attachDeleteCommentListener() {
  const deleteCommentButton = document.querySelectorAll(
    ".delete-comment-button"
  );
  deleteCommentButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      let deleteCommentForm = event.target.parentNode;
      deleteCommentForm.submit();
      let commentContainer =
        event.target.parentNode.parentNode.parentNode.parentNode;
      commentContainer.innerHTML = "";
      commentContainer.style.padding = 0;
      commentContainer.style.marginBottom = 0;
    });
  });
}

attachDeleteCommentListener();

const addCommentButton = document.querySelector(".add-comment-button");
const addCommentInputContainer = document.querySelector(
  ".add-comment-input-container"
);
const header = document.querySelector("header");
addCommentButton.addEventListener("click", (event) => {
  event.preventDefault();
  header.style.zIndex = 0;
  addCommentInputContainer.style.opacity = 1;
  addCommentInputContainer.style.visibility = "visible";
  let newCommentInput = document.querySelector("#add-comment-input");
  newCommentInput.value = "";
  newCommentInput.focus();
});

const addCommentConfirmButton = document.querySelector(
  ".add-comment-confirm-button"
);
const comments = document.querySelector(".comments");
const addCommentForm = document.querySelector("#add-comment-form");

if (addCommentForm) {
  addCommentForm.addEventListener("submit", (event) => {
    header.style.zIndex = 10000;
    let newCommentInput = document.querySelector("#add-comment-input").value;
    let commentError;
    let errors = false;
    try {
      newCommentInput = checkCommentInput(newCommentInput, "comment");
    } catch (e) {
      commentError = e;
      errors = true;
    }

    let clientsideCommentError = document.querySelector(
      ".clientside-comment-error"
    );
    clientsideCommentError.innerHTML = "";
    if (errors) {
      event.preventDefault();
      if (commentError) {
        clientsideCommentError.innerHTML = commentError;
      }
    } else {
      let newCommentContainer = document.createElement("div");
      newCommentContainer.classList.add("comment-container");

      let newComment = document.createElement("p");
      newComment.innerHTML = newCommentInput;
      newCommentContainer.appendChild(newComment);

      let deleteCommentButton = document.createElement("button");
      deleteCommentButton.classList.add("delete-comment-button");
      deleteCommentButton.innerHTML = "Delete Comment";
      newCommentContainer.appendChild(deleteCommentButton);

      comments.appendChild(newCommentContainer);

      addCommentInputContainer.style.opacity = 0;
      addCommentInputContainer.style.visibility = "hidden";

      attachDeleteCommentListener();

      addCommentForm.submit();
    }
  });
}

const exitAddCommentButton = document.querySelector(".exit-add-comment");

exitAddCommentButton.addEventListener("click", (event) => {
  header.style.zIndex = 10000;
  addCommentInputContainer.style.opacity = 0;
  addCommentInputContainer.style.visibility = "hidden";
  let clientsideCommentError = document.querySelector(
    ".clientside-comment-error"
  );
  clientsideCommentError.innerHTML = "";
});
