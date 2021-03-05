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
  title VARCHAR(200) NOT NULL UNIQUE,
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
  let query = `SELECT q.qid, q.title, GROUP_CONCAT(o.options ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs
              FROM questions q, question_options o
              WHERE q.qid = o.qid
              GROUP BY q.qid`;
  const db = new Database();
  return db.queryDatabase(query);
};

// Show questions to admin, which inclues anwers
exports.showAdminQuestions = () => {
  let query = `SELECT q.qid, q.title, a.answerID, a.optionNumber, GROUP_CONCAT(o.options ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs 
               FROM questions q, question_options o, question_answer a
               WHERE q.qid = o.qid AND q.qid = a.qid 
               GROUP BY q.qid
              `;
  const db = new Database();
  return db.queryDatabase(query);
};

exports.createQuestion = async (obj) => {
  let question_query = `INSERT INTO questions(title, isEnabled) VALUES('${obj.title}', 1)`;
  const db = new Database();

  try {
    const results = await db.queryDatabase(question_query);
    if (results === undefined) {
      return results;
    } else {
      obj.options.forEach(async (element) => {
        let options_query = `INSERT INTO question_options(qid, options) VALUES(${results.insertId}, '${element}')`;
        await db.queryDatabase(options_query);
      });
      let answer_query = `INSERT INTO question_answer(qid, optionNumber) VALUES(${results.insertId}, '${obj.optionNumber}')`;
      await db.queryDatabase(answer_query);
    }
    return results;
  } catch (error) {
    return { success: false, message: 'Could not create a question' };
  }
};

exports.updateQuestion = async (id, obj) => {
  const db = new Database();
  let update_title_query = `UPDATE questions SET title = '${obj.title}' WHERE qid = ${id}`;
  try {
    await db.queryDatabase(update_title_query);
    let update_answer_query = `UPDATE question_answer SET optionNumber = ${obj.optionNumber} WHERE qid =${id}`;
    await db.queryDatabase(update_answer_query);

    // Compare the length of 2 arrays
    if (obj.optionIDs.length === obj.options.length) {
      for (let i = 0; i < obj.optionIDs.length; i++) {
        let update_option_query = `UPDATE question_options SET options = '${obj.options[i]}' WHERE optionID = ${obj.optionIDs[i]} AND qid = ${id}`;
        await db.queryDatabase(update_option_query);
      }
    }
  } catch (error) {
    return { success: false, message: 'Could not delete the question' };
  }
};

exports.deleteQuestion = (id) => {
  let delete_query = `DELETE FROM questions WHERE qid = ${id}`;
  const db = new Database();
  return db.queryDatabase(delete_query);
};
