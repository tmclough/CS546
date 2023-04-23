import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import validation from "../validation.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      res.render("users/signUp", {
        title: "SignUp Page",
        cssFile: "/public/css/signUp.css",
      });
    } catch (e) {
      res.sendStatus(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let userInfo = req.body;
    let errors = false;
    let firstNameError = undefined;
    try {
      userInfo.firstName = validation.checkFirstAndLastName(
        userInfo.firstName,
        "first name"
      );
    } catch (e) {
      firstNameError = e;
      errors = true;
    }

    let lastNameError = undefined;
    try {
      userInfo.lastName = validation.checkFirstAndLastName(
        userInfo.lastName,
        "last name"
      );
    } catch (e) {
      lastNameError = e;
      errors = true;
    }
    let emailError = undefined;
    try {
      userInfo.email = validation.checkEmail(userInfo.email, "email");
    } catch (e) {
      emailError = e;
      errors = true;
    }
    let usernameError = undefined;
    try {
      userInfo.username = validation.checkUsername(userInfo.username, "username");
    } catch (e) {
      usernameError = e;
      errors = true;
    }
    let passwordError = undefined;
    try {
      userInfo.password = validation.checkPassword(userInfo.password, "password");
    } catch (e) {
      passwordError = e;
      errors = true;
    }

    let duplicateEmailError = undefined;
    let duplicateUsernameError = undefined;
    const prevUsers = await userData.getAll();
    for (let i in prevUsers) {
      if (prevUsers[i].email === userInfo.email) {
        duplicateEmailError = "email aready in use";
        errors = true;
        break;
      }
      if (prevUsers[i].username === userInfo.username) {
        duplicateUsernameError = "username already in use";
        errors = true;
        break;
      }
    }

    if (errors) {
      res.status(400).render("users/signUp", {
        title: "SignUp Page",
        cssFile: "/public/css/signUp.css",
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
      res.redirect("/login");
    } catch (e) {
      res.sendStatus(500).json({ error: e });
    }
  });

export default router;
