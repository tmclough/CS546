import loginRoutes from "./loginRoutes.js";

const constructorMethod = (app) => {
  app.use("/", loginRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
