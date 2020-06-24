const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const db = require('./database')

const con = db.getCon()

const checkLoggedIn = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  }
}

router.get('/', (req, res) => {
  checkLoggedIn(req, res)
  res.render('index', { categories: db.getCategories() })
})

router.get('/login', (req, res) => {
    res.render('./pages/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
          if(info) {return res.send(info.message)}
          if (err) { return next(err) }
          if (!user) { return res.redirect('/login') }
          req.login(user, (err) => {
                  if (err) { return next(err); }
                  return res.redirect('/')
                })
        })(req, res, next)
})

router.get('/goals', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 0'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: rows })
  })
})

router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})


router.post('/submit_goal', (req, res) => {
  checkLoggedIn(req, res)
  const date = new Date(Date.parse(req.body.dueDate)).toISOString().slice(0, 19).replace('T', ' ')
  queryString = 'INSERT INTO goals (goal, category, due_date) VALUES (?, ?, ?)'
  con.query(queryString, [req.body.goal, req.body.category, date], (err, results, field) => {
    if (err) {
      console.log('Failed to submit goal. ' + err)
      return
    }
    const result ='Logged new goal ' + results
    console.log(result)
    return result
  })
  res.redirect('/')
})

router.post('/submit_category', (req, res) => {
  checkLoggedIn(req, res)
  const category = req.body.category
  queryString = 'INSERT INTO categories (category) VALUES (?)'
  con.query(queryString, [category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit category. ' + err)
      return
    }
    console.log('Logged new category ' + results)
  })
  res.redirect('/')
})

router.post('/complete/:goal_id', (req, res) => {
  checkLoggedIn(req, res)
  db.completeGoal(req.params.goal_id)
  res.redirect('/goals')
})

router.post('/delete/:goal_id', (req, res) => {
  checkLoggedIn(req, res)
  db.deleteGoal(req.params.goal_id)
  res.redirect('/goals')
})

module.exports = router
