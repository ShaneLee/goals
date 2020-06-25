const mysql = require('mysql')
const moment = require('moment')
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

const con = getDBConnection('simple_goals')

const deletePeriodQuery = (period) => {
  period = period.toLowerCase()
  const del = 'DELETE from goals '

  switch (period) {
    case 'week':
      return del + 'WHERE complete = 0 AND YEARWEEK(DATE(due_date), 1) = YEARWEEK(CURDATE(), 1)'
    case 'month':
      return del + 'WHERE complete = 0 AND MONTH(DATE(due_date)) = MONTH(CURDATE())'
  }

}


const db = module.exports = {}

db.getCon = () => {
  return con
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

db.deleteGoalsInPeriod = (period) => {
  const queryString = deletePeriodQuery(period) 
  con.query(queryString, (err, results, field) => {
    if (err) {
      console.log('Failed to delete goal ' + err)
      return
    }
    console.log('Deleted goal' + results)
  })
  
}

db.completeGoal = (id) => {
  queryString = 'UPDATE goals set complete = 1, completed_date = ? WHERE goal_id = ?'
  con.query(queryString, [moment().format("YYYY-MM-DD HH:mm:ss"), id], (err, results, field) => {
    if (err) {
      console.log('Failed to complete goal ' + err)
      return
    }
    console.log('Completed goal' + results)
  })
  
}
