import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";

router
    .route("/")
    .get(async (req, res) => {
        //code here for GET
        try {
            res.render("users/signUp", {
                title: "Login Page",
                cssFile: "/public/css/signUp.css",
            });
        } catch (e) {
            res.sendStatus(400).json({ error: e });
        }
    })
    .post(async (req, res) => {
        let userInfo = req.body;
        let errors = [];
        if (!userInfo || Object.keys(userInfo).length === 0) {
            errors.push("No data inputted.");
        }
        try {
            userInfo.email = validation.checkString(userInfo.email, "email");
            userInfo.username = validation.checkString(userInfo.username, "username");
            userInfo.password = validation.checkString(userInfo.password, "password");
            userInfo.firstName = validation.checkString(userInfo.firstName, "firstName");
            userInfo.lastName = validation.checkString(userInfo.lastName, "lastName");
        } catch (e) {
            errors.push(e);
        }


        const prevUsers = await UserData.getAll();
        for (let i in prevUsers) {
            if (prevUsers[i].email === userInfo.email) {
                errors.push("email already in use");
                break;
            }
            if (prevUsers[i].username === userInfo.username) {
                errors.push("username already in use");
                break;
            }
        }

        if (errors.length > 0) {
            res.render("users/signUp", {
                errors: errors,
                hasErrors: true,
                body: req.body
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
            )
            res.redirect("/"); //redirect to account page once that's implemented.
        } catch (e) {
            res.status(500).render("errorPage", { error: e });
            //implement error page
        }
    });

export default router;