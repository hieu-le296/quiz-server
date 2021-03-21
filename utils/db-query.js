const mysql = require('mysql');
const connectPool = require('../config/db');

class Database {
  constructor() {
    this.pool = connectPool;
    this.createTable(questionTable);
    this.createTable(optionsTable);
    this.createTable(answerTable);
  }

  queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, con) => {
        try {
          con.query(query, values, (error, results) => {
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
  isEnabled BOOLEAN DEFAULT true
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
  let query = `SELECT q.title, q.isEnabled, GROUP_CONCAT(o.options ORDER BY o.optionID) AS options
              FROM questions q, question_options o
              WHERE q.qid = o.qid AND q.isEnabled = True
              GROUP BY q.qid
              ORDER BY q.qid ASC`;
  const db = new Database();
  return db.queryDatabase(query, []);
};

// Get the answers to match the user answer
exports.getAnswers = () => {
  let query = `SELECT GROUP_CONCAT(qa.optionNumber) AS answers 
              FROM questions q, question_answer qa
              WHERE q.qid = qa.qid AND q.isEnabled = TRUE
              ORDER BY q.qid ASC;`;
  const db = new Database();
  return db.queryDatabase(query, []);
};

// Show questions to admin, which inclues anwers
exports.showAdminQuestions = () => {
  let query = `SELECT q.qid, q.title, q.isEnabled, a.answerID, a.optionNumber, GROUP_CONCAT(o.options ORDER BY o.optionID ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs 
               FROM questions q, question_options o, question_answer a
               WHERE q.qid = o.qid AND q.qid = a.qid 
               GROUP BY q.qid DESC;
              `;
  const db = new Database();
  return db.queryDatabase(query, []);
};

// Show 1 question to admin, for editing
exports.showAdminOneQuestion = (id) => {
  let query = `
              SELECT q.qid, q.title, a.answerID, a.optionNumber, GROUP_CONCAT(o.options ) AS options, GROUP_CONCAT(o.optionID) AS optionIDs 
              FROM questions q, question_options o, question_answer a
              WHERE q.qid = o.qid AND q.qid = a.qid AND q.qid = ?
              GROUP BY q.qid;
              `;
  const db = new Database();
  return db.queryDatabase(query, [id]);
};

exports.createQuestion = async (obj) => {
  let question_query = `INSERT INTO questions(title, isEnabled) VALUES(?, ?);`;
  const db = new Database();

  try {
    const results = await db.queryDatabase(question_query, [obj.title, 1]);
    if (results === undefined) {
      return results;
    } else {
      let options = [];
      obj.options.forEach(async (element) => {
        let option = [results.insertId, element];
        options.push(option);
      });
      let options_query = `INSERT INTO question_options(qid, options) VALUES ? `;
      await db.queryDatabase(options_query, [options]);
      let answer_query = `INSERT INTO question_answer(qid, optionNumber) VALUES(?, ?);`;
      await db.queryDatabase(answer_query, [
        results.insertId,
        obj.optionNumber,
      ]);
    }
    return results;
  } catch (error) {
    return { success: false, message: 'Could not create a question' };
  }
};

exports.updateQuestionStatus = async (id, obj) => {
  let status_query = `Update questions SET isEnabled = ${obj.isEnabled} WHERE qid = ?`;
  const db = new Database();
  try {
    await db.queryDatabase(status_query, [id]);
  } catch (error) {
    return { success: false, message: 'Could not create a question' };
  }
};

exports.updateQuestion = async (id, obj) => {
  let update_title_query = `UPDATE questions SET title = ? WHERE qid = ?;`;
  const db = new Database();
  try {
    await db.queryDatabase(update_title_query, [obj.title, id]);
    let update_answer_query = `UPDATE question_answer SET optionNumber = ? WHERE qid = ?;`;
    await db.queryDatabase(update_answer_query, [obj.optionNumber, id]);
    handleOptions(id, obj);
  } catch (error) {
    return { success: false, message: 'Could not delete the question' };
  }
};

exports.deleteQuestion = (id) => {
  let delete_query = `DELETE FROM questions WHERE qid = ?;`;
  const db = new Database();
  return db.queryDatabase(delete_query, [id]);
};

exports.deleteOption = (id) => {
  let delete_option_query = `DELETE FROM question_options WHERE optionID = ?;`;
  const db = new Database();
  return db.queryDatabase(delete_option_query, [id]);
};

async function handleOptions(qid, obj) {
  const db = new Database();

  let new_options = [];

  let update_option_query = `UPDATE question_options SET options = ? WHERE optionID = ? AND qid = ?;`;
  for (let i = 0; i < obj.options.length; i++) {
    if (obj.optionIDs[i] == '') {
      // Insert new options into database
      let new_option = [qid, obj.options[i]];
      new_options.push(new_option);
    } else {
      await db.queryDatabase(update_option_query, [
        obj.options[i],
        obj.optionIDs[i],
        qid,
      ]);
    }
  }
  let options_query = `INSERT INTO question_options(qid, options) VALUES ?;`;
  await db.queryDatabase(options_query, [new_options]);
}
