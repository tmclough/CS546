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

function checkStringArray(arr, varName) {
  //We will allow an empty array for this,
  //if it's not empty, we will make sure all tags are strings
  if (!arr || !Array.isArray(arr))
    throw `You must provide an array of ${varName}`;
  for (let i in arr) {
    if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    }
    arr[i] = arr[i].trim();
  }

  return arr;
}

function checkFirstAndLastName(strVal, varName) {
  strVal = this.checkString(strVal, varName);
  if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
  if (/[0-9]/.test(strVal)) throw `${varName} cannot contain numbers`;
  if (strVal.length < 2)
    throw `${varName} should be at least 2 characters long`;
  else if (strVal.length > 25)
    throw `${varName} can only be at max 25 characters long`;

  return strVal;
}

function checkUsername(strVal, varName) {
  strVal = this.checkString(strVal, varName);
  if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
  if (strVal.length < 2)
    throw `${varName} should be at least 2 characters long`;
  else if (strVal.length > 25)
    throw `${varName} can only be at max 25 characters long`;

  return strVal;
}

function checkEmail(strVal, varName) {
  strVal = this.checkString(strVal, varName).toLowerCase();
  if (
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      strVal
    )
  ) {
    throw `${strVal} is an invalid email`;
  }
  return strVal;
}

function checkPassword(strVal, varName) {
  strVal = this.checkString(strVal, varName);
  if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
  if (strVal.length < 8)
    throw `${varName} should be at least 8 characters long`;
  if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(strVal))
    throw `${varName} should contain at least one special character`;
  if (!/[A-Z]/.test(strVal))
    throw `${varName} should contain at least one uppercase character`;
  if (!/[0-9]/.test(strVal))
    throw `${varName} should contain at least one number`;

  return strVal;
}

const signupForm = document.querySelector("#signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    let errors = false;
    let firstNameInput = document.querySelector("#firstName").value;
    let lastNameInput = document.querySelector("#lastName").value;
    let emailAddressInput = document.querySelector("#email").value;
    let usernameInput = document.querySelector("#username").value;
    let passwordInput = document.querySelector("#password").value;

    firstNameInput = firstNameInput.trim();
    lastNameInput = lastNameInput.trim();
    emailAddressInput = emailAddressInput.trim().toLowerCase();
    usernameInput = usernameInput.trim().toLowerCase();
    passwordInput = passwordInput.trim();
    let firstNameError = undefined;
    try {
      firstNameInput = checkFirstAndLastName(firstNameInput, "First Name");
    } catch (e) {
      firstNameError = e;
      errors = true;
    }

    let lastNameError = undefined;
    try {
      lastNameInput = checkFirstAndLastName(lastNameInput, "Last Name");
    } catch (e) {
      lastNameError = e;
      errors = true;
    }
    let emailAddressError = undefined;
    try {
      emailAddressInput = checkEmail(emailAddressInput, "Email");
    } catch (e) {
      emailAddressError = e;
      errors = true;
    }
    let usernameError = undefined;
    try {
      usernameInput = checkUsername(usernameInput, "Username");
    } catch (e) {
      usernameError = e;
      errors = true;
    }
    let passwordError = undefined;
    try {
      passwordInput = checkPassword(passwordInput, "Password");
    } catch (e) {
      passwordError = e;
      errors = true;
    }
    let clientsideFirstNameError = document.querySelector(
      ".clientside-first-name-error"
    );
    let clientsideLastNameError = document.querySelector(
      ".clientside-last-name-error"
    );
    let clientsideEmailAddressError = document.querySelector(
      ".clientside-email-address-error"
    );
    let clientsideUsernameError = document.querySelector(
      ".clientside-username-error"
    );
    let clientsidePasswordError = document.querySelector(
      ".clientside-password-error"
    );
    if (errors) {
      event.preventDefault();
      if (firstNameError) {
        clientsideFirstNameError.innerHTML = firstNameError;
      }
      if (lastNameError) {
        clientsideLastNameError.innerHTML = lastNameError;
      }
      if (emailAddressError) {
        clientsideEmailAddressError.innerHTML = emailAddressError;
      }
      if (usernameError) {
        clientsideUsernameError.innerHTML = usernameError;
      }
      if (passwordError) {
        clientsidePasswordError.innerHTML = passwordError;
      }
    } else {
      signupForm.submit();
    }
  });
}
