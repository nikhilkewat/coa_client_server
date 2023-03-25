const express = require("express");
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const { test_master_queries } = require("../queries");

const testMasterRouter = express.Router();

testMasterRouter
  .post("/", (req, res) => {
    let query = mysqlParams(
      req.body.id > 0
        ? test_master_queries.update_testMaster
        : test_master_queries.save_testMaster,
      {
        ...req.body
      }
    );

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(rows.insertId);
        if (rows) {
          query = "";
          const coaTestMasterId = req.body.id > 0 ? req.body.id : rows.insertId;
          query = mysqlParams(test_master_queries.update_test_master_result, {
            coaTestMasterId,
            id:coaTestMasterId
          });
          req.body.testResultsGroupConcat.split(",").forEach((x) => {
            query += mysqlParams(
              test_master_queries.insert_test_master_result,
              { result: x, coaTestMasterId }
            );
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
    const query = mysqlParams(test_master_queries.get_testMaster_list);

    queryEngine.query(query, (err, rows, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ rows, fields });
      }
    });
  })
  .delete("/:id", (req, res) => {
    const query = mysqlParams(test_master_queries.delete_testMaster, {
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

module.exports = testMasterRouter;
