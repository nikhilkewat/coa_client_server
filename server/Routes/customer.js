const express = require("express");
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const dbQueries = require("../queries");

const customerRouter = express.Router();

customerRouter
  .post("/", (req, res) => {
    let query = mysqlParams(
      req.body.id > 0
        ? dbQueries.customer_queries.update_customer
        : dbQueries.customer_queries.save_customer,
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
    const query = mysqlParams(dbQueries.customer_queries.get_customer_list);

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  })
  .delete("/:id", (req, res) => {
    const query = mysqlParams(dbQueries.customer_queries.delete_customer, {
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

module.exports = customerRouter;
