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

const loginForm = document.querySelector("#login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    let errors = false;
    let usernameInput = document.querySelector("#username").value;
    let passwordInput = document.querySelector("#password").value;

    usernameInput = usernameInput.trim().toLowerCase();
    passwordInput = passwordInput.trim();

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
    let clientsideUsernameError = document.querySelector(
      ".clientside-username-error"
    );
    let clientsidePasswordError = document.querySelector(
      ".clientside-password-error"
    );
    clientsideUsernameError.innerHTML = "";
    clientsidePasswordError.innerHTML = "";
    if (errors) {
      event.preventDefault();
      if (usernameError) {
        clientsideUsernameError.innerHTML = usernameError;
      }
      if (passwordError) {
        clientsidePasswordError.innerHTML = passwordError;
      }
    } else {
      loginForm.submit();
    }
  });
}
