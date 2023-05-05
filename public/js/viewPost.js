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

// const claimButton = document.querySelector(".claim-button");
// claimButton.addEventListener("click", async (event) => {
//   event.preventDefault();
//   const { post } = JSON.parse(event.target.getAttribute("data-post"));
//   const response = await fetch(`/posts/${post._id}/claim`, {
//     method: "POST",
//   });
//   if (response.ok) {
//     const updatedPost = await response.json();
//     console.log("Updated post:", updatedPost);
//     // Update the post information on the client-side
//   } else {
//     console.error("Unable to update post:", response.statusText);
//   }
// });
let post = $(".post");
let claimButton = $(".claim-button");
//console.log("before clicked")
claimButton.on("click", function (event) {
  event.preventDefault();
  //console.log("in claimed button client side")
  let currentLink = $(this);
  let currentId = currentLink.data("id");

  let requestConfig = {
    method: "POST",
    url: "/post/claimed/" + currentId,
  };

  $.ajax(requestConfig).then(function (responseData) {
    post.html(responseData);
  });
});

// console.log("here1")
// let post = document.querySelector(".post");
// console.log(post)
// let claimButton = document.querySelector(".claim-button");

// claimButton.addEventListener("click", function (event) {
//   console.log("here")
//   event.preventDefault();
//   let currentLink = this;
//   let currentId = currentLink.getAttribute("data-id");

//   let requestConfig = {
//     method: "POST",
//     url: "/post/claimed/" + currentId,
//   };
//   console.log("getting here")
//   $.ajax(requestConfig).then(function (responseMessage) {
//     console.log("in ajax")
//     let newElement = $(responseMessage);

// bindEventsToPostItem(newElement);
//     post.replaceWith(newElement);
//     console.log(post)
//   });
//   console.log("after ajax")
// });

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
  "#add-comment-confirm-button"
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

    let clientsideAddCommentError = document.querySelector(
      ".clientside-add-comment-error"
    );
    clientsideAddCommentError.innerHTML = "";
    if (errors) {
      event.preventDefault();
      if (commentError) {
        clientsideAddCommentError.innerHTML = commentError;
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

const replyCommentButtons = document.querySelectorAll(".reply-comment-button");
const replyCommentInputContainer = document.querySelector(
  ".reply-comment-input-container"
);

replyCommentButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    header.style.zIndex = 0;
    replyCommentInputContainer.style.opacity = 1;
    replyCommentInputContainer.style.visibility = "visible";
    let hiddenCommentId = document.createElement("input");
    hiddenCommentId.type = "text";
    hiddenCommentId.hidden = true;
    hiddenCommentId.name = "commentId";
    hiddenCommentId.value = button.value;
    let replyCommentForm = document.querySelector("#reply-comment-form");
    replyCommentForm.appendChild(hiddenCommentId);
    let replyCommentInput = document.querySelector("#reply-comment-input");
    replyCommentInput.value = "";
    replyCommentInput.focus();
  });
});

const replyCommentConfirmButton = document.querySelector(
  "#reply-comment-confirm-button"
);
const replyCommentForm = document.querySelector("#reply-comment-form");
const repliesContainer = document.querySelector(".replies-container");
const replies = document.querySelector(".replies");

if (replyCommentForm) {
  replyCommentForm.addEventListener("submit", (event) => {
    header.style.zIndex = 10000;
    let replyCommentInput = document.querySelector(
      "#reply-comment-input"
    ).value;
    let replyError;
    let errors = false;

    try {
      replyCommentInput = checkCommentInput(replyCommentInput, "comment");
    } catch (e) {
      replyError = e;
      errors = true;
    }
    let clientsideReplyCommentError = document.querySelector(
      ".clientside-reply-comment-error"
    );
    clientsideReplyCommentError.innerHTML = "";

    if (errors) {
      event.preventDefault();
      if (replyError) {
        clientsideReplyCommentError.innerHTML = replyError;
      }
    } else {
      let newReply = document.createElement("p");
      newReply.innerHTML = replyCommentInput;
      newReply.classList.add("reply");
      replies.appendChild(newReply);

      replyCommentInputContainer.style.opacity = 0;
      replyCommentInputContainer.style.visibility = "hidden";
      replyCommentForm.submit();
    }
  });
}

const exitAddCommentButton = document.querySelector(".exit-add-comment");

exitAddCommentButton.addEventListener("click", (event) => {
  header.style.zIndex = 10000;
  addCommentInputContainer.style.opacity = 0;
  addCommentInputContainer.style.visibility = "hidden";
  let clientsideAddCommentError = document.querySelector(
    ".clientside-add-comment-error"
  );
  clientsideAddCommentError.innerHTML = "";
});

const exitReplyCommentButton = document.querySelector(".exit-reply-comment");
exitReplyCommentButton.addEventListener("click", (event) => {
  header.style.zIndex = 10000;
  replyCommentInputContainer.style.opacity = 0;
  replyCommentInputContainer.style.visibility = "hidden";
  let clientsideReplyCommentError = document.querySelector(
    ".clientside-reply-comment-error"
  );
  clientsideReplyCommentError.innerHTML = "";
});

function checkId(id, varName) {
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== "string") throw `Error:${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
  return id;
}

const claimForm = document.querySelector("#claim-form");
if (claimForm) {
  claimForm.addEventListener("submit", (event) => {
    let hasErrors = false;
    let id = claimForm.name.toString();
    let idError = undefined;
    try {
      id = checkId(id, "id");
    } catch (e) {
      idError = e;
      hasErrors = true;
    }

    let ratingSelectError = undefined;
    const ratingSelect = document.querySelector("#rating");
    const selectedRating = ratingSelect.selectedIndex;
    if (selectedRating === -1) {
      ratingSelectError = "must input a rating";
      hasErrors = true;
    }

    const clientsideClaimError = document.querySelector(
      "clientside-claim-error"
    );
    clientsideClaimError.innerHTML = "";
    if (hasErrors) {
      event.preventDefault();
      if (idError) {
        let idErrorP = document.createElement("p");
        idErrorP.innerHTML = idError;
        clientsideClaimError.appendChild(idErrorP);
      }
      if (ratingSelectError) {
        let ratingErrorP = document.createElement("p");
        ratingErrorP.innerHTML = ratingSelectError;
        clientsideClaimError.appendChild(ratingErrorP);
      }
    } else {
      claimForm.submit();
    }
  });
}
