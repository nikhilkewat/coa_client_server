const mysql = require("mysql");
var database = require("./index");

class db {
  constructor() {
    this.token = {};
    ///this.connection = mysql.createConnection( config );
    this.pool = database;
    this.pool.getConnection((err, connection) => {
      if (!err) {
        // this.connection = connection;
        this.connection = connection;
      } else {
        console.log("getConnection", err);
      }
    });

    this.pool.on("enqueue", function () {
      console.log("Waiting for available connection slot");
    });
  }

  set setToken(newToken) {
    this.token = newToken;
  }

  async checkConnection() {
    if (this.connection ? this.connection.state != "authenticated" : true) {
      // this.connection.release();
      this.pool = database;
      this.pool.getConnection((err, connection) => {
        if (!err) {
          return (this.connection = connection);
        } else {
          console.log("checkConnection", err);
        }
      });
    }
  }

  getConnection() {
    return this.connection;
  }

  query(sql, args) {
    return new Promise(async (resolve, reject) => {
      try {
        database.getConnection((err, conn) => {
          if (err) {
            return reject(err);
          } else {
            conn.query(sql, args, (err1, rows) => {
              if (err) {
                console.trace(err);
                return reject(err1);
              }
              resolve(rows);

            });
            conn.release();
          }
        });
      } catch (ex) {
        console.trace(ex);
        return reject(ex);
      } finally {
        // this.pool.releaseConnection(this.connection);
      }
    });

    // return new Promise(async (resolve, reject) => {
    //   try {
    //     await this.checkConnection();

    //     this.connection.query(sql, args, (err, rows) => {
    //       // log.writeLog(sql, this.token);
    //       if (err) {
    //         console.trace(err);
    //         return reject(err);
    //       }

    //       resolve(rows);
    //     });
    //   } catch (ex) {
    //     console.trace(ex);
    //     return reject(ex);
    //   } finally {
    //     // this.pool.releaseConnection(this.connection);
    //   }
    // });
  }

  queryMap(arraydata, sql, args, acceptErrors) {
    var promises = arraydata.map((item, index) => {
      var finalArgs;
      if (Array.isArray(item) && args === "aoa") {
        finalArgs = item;
      } else {
        finalArgs = args.map((arg) => {
          if (arg === "index") {
            return index;
          } else if (typeof arg === "string") {
            return item[arg];
          } else {
            return arg;
          }
        });
      }

      return new Promise((resolve, reject) => {
        this.connection.query(sql, finalArgs, (err, rows) => {
          //log.writeLog(sql, this.token);
          if (err) {
            if (acceptErrors) {
              resolve(err);
            } else {
              reject(err);
            }
          } else {
            resolve(rows);
          }
        });
      });
    });
    return Promise.all(promises);
  }

  queryLoop(arraydata, acceptErrors, sql, argsbuilder) {
    var promises = arraydata.map((item, index) => {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, argsbuilder(item, index), (err, rows) => {
          // log.writeLog(sql, this.token);
          if (err) {
            if (acceptErrors) {
              resolve(err);
            } else {
              reject(err);
            }
          } else {
            resolve(rows);
          }
        });
      });
    });
    return Promise.all(promises);
  }

  queryLoopPromiseChain(arraydata, sql, argsbuilder, chaining) {
    var promises = arraydata.map((item, index) => {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, argsbuilder(item, index), (err, rows) => {
          //log.writeLog(sql, this.token);
          if (err) {
            reject(err);
          } else {
            if (item && chaining) {
              chaining(rows)
                .then((res) => {
                  resolve({
                    result: item,
                    child: res
                  });
                })
                .catch((err) => {
                  reject({
                    result: item,
                    child: err
                  });
                });
            } else if (!chaining) {
              resolve(item);
            } else {
              reject(item);
            }
          }
        });
      });
    });
    return Promise.all(promises);
  }

  queryPromiseChain(sql, args, chaining) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        // log.writeLog(sql, this.token);
        if (err) {
          reject(err);
        } else {
          if (chaining) {
            chaining(rows)
              .then((res) => {
                resolve({
                  result: rows,
                  child: res
                });
              })
              .catch((err) => {
                reject({
                  result: rows,
                  child: err
                });
              });
          } else if (!chaining) {
            resolve(rows);
          } else {
            reject(rows);
          }
        }
      });
    });
  }

  // queryLoopPromiseChainNew(arraydata, sql, argsbuilder, chaining) {
  //   var promises = arraydata.map((item, index) => {
  //     return new Promise((resolve, reject) => {
  //       if (item && chaining) {
  //         return chaining(item)
  //           .then(res => {
  //             resolve({
  //               result: item,
  //               child: res
  //             });
  //           })
  //           .catch(err => {
  //             reject({
  //               result: item,
  //               child: err
  //             });
  //           });
  //       } else if (!chaining) {
  //         resolve(item);
  //       } else {
  //         reject(item);
  //       }
  //     });
  //   });

  //   return Promise.all(promises);
  // }

  pureQueryLoop(arraydata, acceptErrors, queryBuilder) {
    var promises = arraydata.map((item, index) => {
      return new Promise(async (resolve, reject) => {
        await this.checkConnection();
        await this.connection.query(queryBuilder(item, index), (err, rows) => {
          //        log.writeLog(queryBuilder(item, index));
          if (err) {
            //            log.writeErrorLog(err);
            if (acceptErrors) {
              resolve(err);
            } else {
              reject(err);
            }
          } else {
            resolve(rows);
          }
        });
      });
    });
    return Promise.all(promises);
  }

  queryPreFix(prefix) {
    if (prefix) {
      return (prefix = "USE `" + prefix + "`; ");
    } else {
      return (prefix = "");
    }
  }
  end() {
    if (
      this.pool._freeConnections.indexOf(this.connection) == "-1" &&
      this.connection
    ) {
      try {
        this.connection.release();
      } catch (ex) {
        console.log("end", ex);
      }
    }
  }
}

module.exports = new db();
