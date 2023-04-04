const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./products");
const testRouter = require("./COATestMaster");
const templateRouter = require("./COATemplates");
const authRouter = require("./Auth");
const coaGenerateReportRouter = require("./COAGenerateReport");

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/testmaster", testRouter);
apiRouter.use("/templates", templateRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/generatereport",coaGenerateReportRouter);

module.exports = {
  apiRouter
};
