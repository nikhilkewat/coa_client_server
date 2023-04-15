const express = require("express");
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const { template_queries } = require("../queries");

const templateRouter = express.Router();

templateRouter
  .post("/", (req, res) => {
    let query = mysqlParams(
      req.body.id > 0
        ? template_queries.update_template
        : template_queries.save_template,
      {
        ...req.body
      }
    );

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {

        if (rows) {
          query = "";
          const templateId = req.body.id > 0 ? req.body.id : rows.insertId;
          query = mysqlParams(template_queries.update_template_test, {
            templateId,
            id: templateId
          });
          req.body.testMasterIds.forEach((x) => {
            query += mysqlParams(template_queries.insert_template_test, {
              testId: x,
              templateId
            });
          });

          if (query != "") {
            queryEngine.query(query, (err, rows, fields) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).send({ rows, fields });
              }
            });
          } else res.status(200).send({ rows, fields });
        }
      }
    });
  })
  .get("/", (req, res) => {
    const query = mysqlParams(template_queries.get_template_list);

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  })
  .delete("/:id", (req, res) => {
    const query = mysqlParams(template_queries.delete_template, {
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

module.exports = templateRouter;
