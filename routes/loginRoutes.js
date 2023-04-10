//Import express and express router as shown in lecture code and worked in previous labs

import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      
      res.render("users/login", { title: "Login Page" });
    } catch (e) {
      res.sendStatus(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    console.log("check1");
    const { username, password } = req.body;
    console.log("check2");
    //Look for user with password and username
    let user = userData.getUserByUsernamePassword(username, password);
    console.log("check3");
    // client.close();
    //valid user then redirect to homepage
    if (user) {
      console.log("check4");
      res.redirect("/homepage");
    } else {
      console.log("check5");
      res.render("login", { error: "Invalid username or password" });
    }
  });

export default router;
