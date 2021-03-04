const mysql = require('mysql');
const connectPool = require('../config/db');

class Database {
  constructor() {
    this.pool = connectPool;
    this.createTable(questionTable);
    this.createTable(optionsTable);
    this.createTable(answerTable);
  }

  queryDatabase(query) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, con) => {
        try {
          console.log('Database Connected!');
          con.query(query, (error, results) => {
            try {
              resolve(results);
              con.release();
            } catch (error1) {
              reject(error);
            }
          });
        } catch (error2) {
          reject(err);
        }
      });
    });
  }

  createTable(query) {
    return this.queryDatabase(query);
  }
}

let questionTable = `
CREATE TABLE IF NOT EXISTS questions(
  qid INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(200) NOT NULL,
  isEnabled BOOLEAN DEFAULT NULL
);`;

let optionsTable = `
CREATE TABLE IF NOT EXISTS question_options (
	optionID INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  qid INT(11) NOT NULL,
  options VARCHAR(200) NOT NULL,
  FOREIGN KEY (qid) REFERENCES questions (qid) ON DELETE CASCADE ON UPDATE CASCADE
);`;

let answerTable = `
CREATE TABLE IF NOT EXISTS question_answer (
	answerID INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  qid INT(11) NOT NULL,
  optionNumber INT(11) NOT NULL,
  FOREIGN KEY (qid) REFERENCES questions (qid) ON DELETE CASCADE ON UPDATE CASCADE
);`;

// Show questions to users
exports.showQuestions = () => {
  let query = `SELECT q.qid, q.question, GROUP_CONCAT(o.options ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs
              FROM questions q, question_options o
              WHERE q.qid = o.qid
              GROUP BY q.qid`;
  const db = new Database();
  return db.queryDatabase(query);
};

// Show questions to admin, which inclues anwers
exports.showAdminQuestions = () => {
  let query = `SELECT q.qid, q.question, a.answerID, a.optionNumber, GROUP_CONCAT(o.options ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs 
               FROM questions q, question_options o, question_answer a
               WHERE q.qid = o.qid AND q.qid = a.qid 
               GROUP BY q.qid
              `;
  const db = new Database();
  return db.queryDatabase(query);
};
