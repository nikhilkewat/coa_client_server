const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./products");
const testRouter = require("./COATestMaster");
const templateRouter = require("./COATemplates");
//@ts-ignore
const authRouter = require("./Auth");
const coaGenerateReportRouter = require("./COAGenerateReport");
const customerRouter = require("./customer");

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/testmaster", testRouter);
apiRouter.use("/templates", templateRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/generatereport",coaGenerateReportRouter);
apiRouter.use("/customer",customerRouter);

module.exports = {
  apiRouter
};
