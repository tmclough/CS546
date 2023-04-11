import loginRoutes from "./loginRoutes.js";
import signupRoutes from "./signupRoutes.js";

const constructorMethod = (app) => {
  app.use("/login", loginRoutes);
  app.use("/signup", signupRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
