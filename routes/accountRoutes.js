import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import { postData } from "../data/index.js";
import validation from "../validation.js";

router
    .route("/")
    .get(async (req, res) => {

        try {
            const posts = await postData.getPostbyUser(req.session.user._id);
            const userInfo = await userData.getUserById(req.session.user._id);
            res.render("users/account", {
                title: "Account",
                cssFile: "/public/css/account.css",
                posts,
                userInfo
                //jsFile: "/public/js/signUp.js",
            });
        } catch (e) {
            res.sendStatus(500).json({ error: e });
        }
    });

export default router;