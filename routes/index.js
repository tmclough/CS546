import loginRoutes from "./loginRoutes.js";
import signupRoutes from "./signupRoutes.js";
import homepageRoutes from "./homepageRoutes.js";
import postsRoute from "./posts.js"
import accountRoute from "./accountRoutes.js"

const constructorMethod = (app) => {
  app.use("/login", loginRoutes);
  app.use("/signup", signupRoutes);
  app.use("/post", postsRoute);
  app.use("/account", accountRoute);
  app.use("/", homepageRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
