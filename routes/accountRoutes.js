import { Router } from "express";
const router = Router();
import { userData } from "../data/index.js";
import { postData } from "../data/index.js";
import validation from "../validation.js";
import xss from "xss";


    .route("/")
    .get(async (req, res) => {
        if (!req.session.user) {
            res.status(400).render("error/errorPage", { error: "Error: user not signed in", errorCode: 400 });
        }
        try {
            const posts = await postData.getPostbyUser(xss(req.session.user._id));
            const userInfo = await userData.getUserById(xss(req.session.user._id));
            res.render("users/account", {
                title: "Account",
                userLogin: req.session.user ? false : true,
                cssFile: "/public/css/account.css",
                posts,
                userInfo
                //jsFile: "/public/js/signUp.js",
            });
        } catch (e) {
            res.status(500).render("error/errorPage", { error: e, errorCode: 500 });
        }

    });
  } catch (e) {
    res.sendStatus(500).json({ error: e });
  }
});


export default router;
