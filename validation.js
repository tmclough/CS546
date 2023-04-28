import { ObjectId } from "mongodb";

export const locations = [
  "ABS Engineering Center",
  "Babbio Center",
  "Burchard Building",
  "Carnegie Laboratory",
  "Davidson Laboratory ",
  "Edwin A. Stevens Hall & DeBaun Auditorium",
  "Gateway North",
  "Gateway South",
  "Kenneth J. Altorfer Academic Complex",
  "Kidde Hall",
  "McLean Hall",
  "Morton Hal",
  "Nicoll Environmental Laboratory",
  "North Building",
  "Peirce Hall",
  "Rocco Technology Center",
  "Samuel C. Williams Library",
  "1 Ninth Street",
  "2 Ninth Street",
  "807 Castle Point Terrace",
  "Gatehouse",
  "Griffith Building",
  "Hoxie House",
  "Martha Bayard Stevens Hall",
  "Ruesterholz Admissions Center",
  "Student Wellness Center",
  "Wesley J. Howe Center",
  "University Center Complex",
  "River Terrace",
  "Castle Point Hall",
  "Davis Hall",
  "Humphreys Hall",
  "Jonas Hall",
  "Lore-El Center",
  "Palmer Hall",
  "Harries Tower",
  "South Tower",
];

export const tags = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Clothing",
  "Sport Equipment",
  "Books",
  "School Supplies",
  "Other"
]

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    // //if (!isNaN(strVal))
    //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
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
  },

  checkFirstAndLastName(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (/[0-9]/.test(strVal)) throw `${varName} cannot contain numbers`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 25)
      throw `${varName} can only be at max 25 characters long`;

    return strVal;
  },

  checkUsername(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 25)
      throw `${varName} can only be at max 25 characters long`;

    return strVal;
  },

  checkEmail(strVal, varName) {
    strVal = this.checkString(strVal, varName).toLowerCase();
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        strVal
      )
    ) {
      throw `${strVal} is an invalid email`;
    }
    return strVal;
  },

  checkPassword(strVal, varName) {
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
  },

  checkLocation(strVal, varName) {
    strVal = this.checkString(strVal, varName).toLowerCase();
    lowerCaseLocations = locations.map((i) => {
      return i.toLowerCase();
    })
    if (!lowerCaseLocations.includes(strVal)) throw "Error: invalid location";
    return strVal;
  },


  checkItemName(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    if (strVal.length < 2)
      throw `${varName} should be at least 2 characters long`;
    else if (strVal.length > 60)
      throw `${varName} can only be at max 60 characters long`;

    return strVal;
  },

  checkDescription(strVal, varName) {
    strVal = this.checkString(strVal, varName);
    if (strVal.includes(" ")) throw `${varName} should not contain spaces`;
    else if (strVal.length > 200)
      throw `${varName} can only be at max 200 characters long`;

    return strVal;
  },

  checkTags(arr, varName) {
    arr = this.checkStringArray(arr, varName);
    arr = arr.map((i) => {
      return i.toLowerCase();
    })
    lowerCaseTags = tags.map((i) => {
      return i.toLowerCase();
    })
    for (let i = 0; i < arr.length; i++) {
      if (!lowerCaseLocations.includes(arr[i])) throw `Error: Invalid Tags ${arr[i]}`;
    }

    return arr;
  }
};

export default exportedMethods;
