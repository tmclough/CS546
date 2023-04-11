//Import express and express router as shown in lecture code and worked in previous labs

import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import validation from "../validation.js";
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      res.render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
      });
    } catch (e) {
      res.sendStatus(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let errors = [];
    if (!req.body || Object.keys(req.body).length === 0) {
      errors.push("Error: No data inputted.");
    }
    let { username, password } = req.body;
    try {
      username = validation.checkString(username, "username")
    } catch (e) {
      errors.push(e);
    }
    try {
      password = validation.checkString(password, "password");
    } catch (e) {
      errors.push(e);
    }
    if (errors.length > 0) {
      res.status(400).render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
        body: req.body,
        errors: errors,
        hasErrors: true
      });
      return;
    }
    //Look for user with password and username
    let user = userData.getUserByUsernamePassword(username, password);

    // client.close();
    //valid user then redirect to homepage
    if (user) {
      res.redirect("/homepage");
    } else {
      errors.push("Invalid username or password");
      res.status(400).render("users/login", {
        title: "Login Page",
        cssFile: "/public/css/logIn.css",
        body: req.body,
        errors: errors,
        hasErrors: true
      });
    }
  });

export default router;
