//Import express and express router as shown in lecture code and worked in previous labs
import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import validation from "../validation.js";
import xss from "xss";
router
  .route("/")
  .get(async (req, res) => {
    try {
      res.render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
        jsFile: "/public/js/logIn.js",
      });
    } catch (e) {
      res.sendStatus(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let username = xss(req.body.username);
    let password = xss(req.body.password);

    let usernameError = undefined;
    let passwordError = undefined;
    try {
      username = validation.checkUsername(username, "username");
    } catch (e) {
      usernameError = e;
    }
    try {
      password = validation.checkPassword(password, "password");
    } catch (e) {
      passwordError = e;
    }
    if (usernameError || passwordError) {
      res.status(400).render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
        body: req.body,
        usernameError: usernameError,
        passwordError: passwordError,
      });
      return;
    }

    //Look for user with password and username
    try {
      let user = await userData.getUserByUsernamePassword(username, password);
      if (!user) {
        return res.status(500).render("error/errorPage", { error: "Internal Server Error", errorCode: 500 });
      }
      req.session.user = user;
      res.redirect("/homepage");
    } catch (e) {
      let invalidLoginError = e;
      res.status(400).render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
        body: req.body,
        invalidLoginError: invalidLoginError,
      });
    }
  });

export default router;
