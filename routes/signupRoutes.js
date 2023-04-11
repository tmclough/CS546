import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import validation from "../validation.js";

router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render("users/signUp", {
        title: "SignUp Page",
        cssFile: "/public/css/signUp.css",
      });
    } catch (e) {
      res.sendStatus(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    console.log(userInfo);
    let errors = [];
    if (!userInfo || Object.keys(userInfo).length === 0) {
      errors.push("No data inputted.");
    }

    let firstNameError = undefined;
    try {
      userInfo.firstName = validation.checkString(
        userInfo.firstName,
        "firstName"
      );
    } catch (e) {
      firstNameError = e;
      errors.push(e);
    }

    let lastNameError = undefined;
    try {
      userInfo.lastName = validation.checkString(userInfo.lastName, "lastName");
    } catch (e) {
      lastNameError = e;
      errors.push(e);
    }
    let emailError = undefined;
    try {
      userInfo.email = validation.checkString(userInfo.email, "email");
    } catch (e) {
      emailError = e;
      errors.push(e);
    }
    let usernameError = undefined;
    try {
      userInfo.username = validation.checkString(userInfo.username, "username");
    } catch (e) {
      usernameError = e;
      errors.push(e);
    }
    let passwordError = undefined;
    try {
      userInfo.password = validation.checkString(userInfo.password, "password");
    } catch (e) {
      passwordError = e;
      errors.push(e);
    }
    console.log(errors);

    let duplicateEmailError = undefined;
    let duplicateUsernameError = undefined;
    const prevUsers = await userData.getAll();
    for (let i in prevUsers) {
      if (prevUsers[i].email === userInfo.email) {
        duplicateEmailError = "email aready in use";
        errors.push("email already in use");
        break;
      }
      if (prevUsers[i].username === userInfo.username) {
        duplicateUsernameError = "username already in use";
        errors.push("username already in use");
        break;
      }
    }

    if (errors.length > 0) {
      res.render("users/signUp", {
        title: "SignUp Page",
        cssFile: "/public/css/signUp.css",
        errors: errors,
        hasErrors: true,
        body: req.body,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        emailError: emailError,
        usernameError: usernameError,
        passwordError: passwordError,
        duplicateEmailError: duplicateEmailError,
        duplicateUsernameError: duplicateUsernameError,
      });
      return;
    }

    try {
      const newUser = await userData.addUser(
        userInfo.email,
        userInfo.username,
        userInfo.password,
        userInfo.firstName,
        userInfo.lastName
      );
      res.redirect("/login"); //redirect to account page once that's implemented.
    } catch (e) {
      res.status(500).render("errorPage", { error: e });
      //implement error page
    }
  });

export default router;
