const mysql = require("mysql");
const keys = require("../config/dev");

const connection = mysql.createPool(keys.dbConfig);

module.exports = connection;
