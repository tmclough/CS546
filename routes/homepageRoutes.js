import { Router } from "express";
const router = Router();
import { postData } from "../data/index.js";
import validation from "../validation.js";
let searchStr = "";
router.route("/").get((req, res) => {
  res.redirect("/homepage");
});
router
  .route("/homepage")
  .get(async (req, res) => {
    try {
      const postList = await postData.getAllPosts();
      res.render("users/homepage", {
        divClass: "hidden-filter",
        posts: postList,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        userLogin: req.session.user ? false : true,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const postList = await postData.getAllPosts();
    let tags = req.body.tagSelect;
    let tagsFilter = req.body.tagFilter;
    let searchText = req.body.searchText;
    if (!searchText) {
      searchText = searchStr;
    }
    if (typeof tags === "string") {
      tags = [tags];
    }

    if (typeof tagsFilter === "string") {
      tagsFilter = [tagsFilter];
    }

    let postArr = [];

    if (!tags || tags.length === 0) {
      postArr = postArr;
    } else {
      for (let i = 0; i < tags.length; i++) {
        let posts = await postData.getPostsByTag(tags[i]);
        if (posts && posts.length > 0) {
          postArr.push(posts);
        }
      }
    }
    let postArr2 = [];
    if (!tagsFilter || tagsFilter.length === 0) {
      postArr2 = [];
    } else {
      for (let i = 0; i < tagsFilter.length; i++) {
        const posts = await postData.getPostsByTag(tagsFilter[i]);

        if (posts && posts.length > 0) {
          postArr2.push(posts);
        }
      }
    }
    let postUpdated = [];
    if (searchText && searchText.trim() !== "") {
      searchStr = searchText;
      const posts = await postData.getPostsByName(searchText.trim());
      if (posts && posts.length > 0) {
        //   if (postArr2.length > 0) {
        //     postUpdated = posts.filter((post) => postArr2.includes(post));
        //     postArr.push(postUpdated);
        //   } else {
        postArr.push(posts);
        // }
      } else {
        postArr = postArr;
      }
      // console.log(postArr);
    } else {
      if (postArr.length === 0) {
        postArr = postList;
      }
    }
    // if (searchText && searchText.trim() !== "") {
    //   const posts = await postData.getPostbyUser(searchText.trim());
    //   if (posts && posts.length > 0) {
    //     if (postArr2.length > 0) {
    //       postUpdated = posts.filter((post) => postArr2.includes(post));
    //       postArr.push(postUpdated);
    //     } else {
    //       postArr.push(posts);
    //     }
    //   } else {
    //     postArr = postArr;
    //   }
    // } else {
    //   if (postArr.length === 0) {
    //     postArr = postList;
    //   }
    // }
    postArr2 = postArr2.flat(100);

    if (searchText && searchText.trim() !== "") {
      let posts = await postData.getPostsByDesciption(searchText.trim());
      if (posts && posts.length > 0) {
        if (postArr2.length > 0) {
          // console.log(posts);
          //   console.log(`postArr: ${postArr}`)
          // for(let po of postArr2){
          //   console.log(po);
          //   console.log(typeof po)
          // }
          postUpdated = posts.filter((post) => {
            // console.log(post);
            //  console.log(postArr2);
            postArr2.includes(JSON.stringify(post));
            console.log(postArr2);
            //  console.log(postArr2.includes(JSON.stringify(post)));
          });
          // for (let post of posts) {
          //   if (postArr2.indexOf(post) > -1) {
          //     postUpdated.push(post);
          //     console.log("adding to updatedlist");
          //   }
          // }

          //console.log(postUpdated);
          postArr.push(postUpdated);
          //  console.log(`postArr: ${postArr}`)
          console.log(`postUpdated: ${postUpdated}`);
          console.log(typeof postUpdated);
          console.log(postArr);
        } else {
          postArr.push(posts);
          // console.log(postArr)
        }
        // postArr.push(posts);
      } else {
        postArr = postArr;
      }
      // console.log(postArr)
    } else {
      if (postArr.length === 0) {
        postArr = postList;
      }
    }
    //   console.log(postArr2)
    // if(postArr2.length > 0){
    //    postArr = postArr.filter(item => postArr2.includes(item));
    // }

    postArr = postArr.flat(100);
    // console.log(postArr)
    //new stuff
    if (tags) {
      res.render("users/homepage", {
        divClass: "hidden-filter",
        posts: postArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
      });
    } else {
      res.render("users/homepage", {
        divClass: "search-label",
        posts: postArr,
        cssFile: "/public/css/homepage.css",
        jsFile: "/public/js/homepage.js",
        searchText: searchText,
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.redirect("/homepage");
});

export default router;
