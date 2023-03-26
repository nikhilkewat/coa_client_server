const express = require("express");
const authRouter = express.Router();
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const dbQueries = require("../queries/Auth");
const jwt = require("jsonwebtoken");
const keys = require("../config/dev");

authRouter.post("/login", (req, res) => {
  let query = mysqlParams(dbQueries.login, {
    ...req.body,
  });

  queryEngine.query(query, async (err, rows, fields) => {
    if (err) {
      res.status(500).send(err);
    } else {
      
      if (rows[0]) {
      
        const token = jwt.sign({ ...rows[0] }, keys.Secret, {
          algorithm: "HS256",
          expiresIn: "1d"
        });

        const updateRows = { success: true,user: rows[0], token: token };
        res.status(200).send(updateRows);
      } else {
        res.status(200).send({
          success: false,
          message: "Invalid Username or password."
        });
      }
    }
  });
});

module.exports = authRouter;
