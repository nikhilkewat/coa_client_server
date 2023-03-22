const express = require("express");
const authRouter = express.Router();
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const dbQueries = require("../queries/Auth");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

authRouter.post("/login", (req, res) => {
  let query = mysqlParams(dbQueries.login, {
    ...req.body,
  });

  queryEngine.query(query, async (err, rows, fields) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const token = jwt.sign(rows[0], keys.Secret, {
        expiresIn: "1h",
      });
      const updateRows = { ...rows[0], token: token };

      res.status(200).send({ rows: updateRows, fields });
    }
  });
});

module.exports = authRouter;
