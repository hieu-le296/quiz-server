const mysql = require('mysql');
const connectPool = require('../config/db');

module.exports = class Database {
  constructor() {
    this.pool = connectPool;

    this.pool.getConnection((err, con) => {
      if (err) throw err;
      else {
        console.log(`Database ${process.env.DB_NAME} connected!`);
      }
    });
  }
};
