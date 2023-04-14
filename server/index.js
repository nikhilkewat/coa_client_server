const express = require("express");
const cors = require("cors");

const { apiRouter } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5011;

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT - ${PORT}`);
});
