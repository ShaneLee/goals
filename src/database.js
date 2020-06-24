const mysql = require('mysql')
require('dotenv').config()

const getDBConnection = (database) => {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: database
  })
}

const con = getDBConnection('goals')

const db = module.exports = {}

db.getGoals = () => {
  const queryString = 'SELECT * FROM goals'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    return rows
  })
}

db.getCategories = () => {
  const queryString = 'SELECT * FROM categories'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /: ' + err)
    }
    console.log('Getting data from database for /')
    return rows
  })
}

db.submitGoal = (goal, category, dueDate) => {
  const date = Date.parse(dueDate).toISOString().slice(0, 19).replace('T', ' ')
  queryString = 'INSERT INTO goals (goal, category, dueDate) VALUES (?, ?, ?)'
  con.query(queryString, [goal, category, dueDate], (err, results, field) => {
    if (err) {
      console.log('Failed to submit goal. ' + err)
      return
    }
    const result ='Logged new goal ' + results
    console.log(result)
    return result
  })
}

db.submitCategory = (category) => {
  queryString = 'INSERT INTO categories (category) VALUES (?)'
  con.query(queryString, [category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit category. ' + err)
      return
    }
    console.log('Logged new category ' + results)
  })
}

db.deleteGoal = (id) => {
  queryString = 'DELETE from goals WHERE goal_id = ?'
  con.query(queryString, [id], (err, results, field) => {
    if (err) {
      console.log('Failed to delete goal ' + err)
      return
    }
    console.log('Deleted goal' + results)
  })
  
}
