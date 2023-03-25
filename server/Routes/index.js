const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./products");
const testRouter = require("./COATestMaster");
const templateRouter = require("./COATemplates");

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/products",productRouter);
apiRouter.use("/testmaster",testRouter);
apiRouter.use("/templates",templateRouter);

module.exports = {
  apiRouter
};
