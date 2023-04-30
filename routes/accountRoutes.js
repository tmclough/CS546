import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import validation from "../validation.js";

router
    .route("/")
    .get(async (req, res) => {
        try {
            res.render("users/account", {
                title: "Account",
                cssFile: "/public/css/account.css",
                //jsFile: "/public/js/signUp.js",
            });
        } catch (e) {
            res.sendStatus(500).json({ error: e });
        }
    });

export default router;