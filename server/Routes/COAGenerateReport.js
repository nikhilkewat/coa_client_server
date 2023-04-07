const express = require("express");
const mysqlParams = require("mysql-named-params-escape");
const queryEngine = require("../database/dbWrapper");
const { coa_test_report_queries, test_master_queries } = require("../queries");

const coaGenerateReportRouter = express.Router();

coaGenerateReportRouter
  .post("/", (req, res) => {
    let query = mysqlParams(
      req.body.id > 0
        ? test_master_queries.update_testMaster
        : coa_test_report_queries.save_coa_report_master,
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
          const coaReportMasterId =
            req.body.id > 0 ? req.body.id : rows.insertId;
          // query = mysqlParams(coa_test_report_queries.save_coa_report_tran, {
          //   coaReportMasterId,
          //   id: coaReportMasterId
          // });
          req.body.results.forEach((x) => {
            query += mysqlParams(coa_test_report_queries.save_coa_report_tran, {
              ...x,
              coaReportMasterId
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

module.exports = coaGenerateReportRouter;
