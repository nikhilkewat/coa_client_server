const express = require("express");
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const dbQueries = require("../queries");

const userRouter = express.Router();

userRouter
  .post("/", (req, res) => {
    let query = mysqlParams(
      req.body.id > 0
        ? dbQueries.user_queries.update_user
        : dbQueries.user_queries.save_user,
      {
        ...req.body
      }
    );

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  })
  .get("/", (req, res) => {
    const query = mysqlParams(dbQueries.user_queries.get_user_list);

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  })
  .delete("/:id", (req, res) => {
    const query = mysqlParams(dbQueries.user_queries.delete_user, {
      ...req.params
    });
    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  });

module.exports = userRouter;
