import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import validation from "../validation.js";
import { locations } from "../validation.js";
import multer from "multer";
import aws from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, filterFilter: fileFilter });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

router
  .route("/")
  .get(async (req, res) => {
    res.render("posts/addPost", {
      title: "Add Post",
      cssFile: "/public/css/addPost.css",
      jsFile: "/public/js/addPost.js",
      userLogin: req.session.user ? false : true,
      locations: locations,
    });
  })
  .post(upload.single("image"), async (req, res) => {
    let postInfo = req.body;
    let fileInfo = req.file;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read-write",
      ContentType: "image/jpeg",
    };



    s3.upload(params, async (error, data) => {
      if (error) {
        res.status(500).send({ error: error });
      }

      console.log(postInfo);
      try {
        const post = await postData.addPost(
          req.session.user._id,
          postInfo.name,
          postInfo.description,
          data.Location,
          [],
          postInfo.location
        );
        if (post) {
          res.send({ postAdded: true });
        } else {
          res.send({ error: "something happend" });
        }
      } catch (e) {
        res.status(500).send({ error: e });
      }
    });
  });

router.route("/:id").get(async (req, res) => {
  const id = validation.checkId(req.params.id);

  try {
    const post = await postData.getPostById(id);
    res.render("posts/viewPost", {
      title: "View Post",
      cssFile: "/public/css/viewPost.css",
      jsFile: "/public/js/viewPost.js",
      post: post,
      userLogin: req.session.user ? false : true,
    });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

export default router;
