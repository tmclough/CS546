import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import validation from "../validation.js";



router.route("/").get(async (req, res) => {
  try {
    const postList = await postData.getAllPosts();
    res.render("users/homepage", { posts: postList, cssFile:"/public/css/homepage.css" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
