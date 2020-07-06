const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const db = require('./database')
const utils = require('./utils')

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
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})

router.get('/goals/:tag', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 0 AND LOWER(tags) LIKE ?'
  con.query(queryString, [`%${req.params.tag}%`],  (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})

router.get('/week', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 0 AND YEARWEEK(DATE(due_date), 1) = YEARWEEK(CURDATE(), 1)'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})
router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})

router.get('/completed_week', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 1 AND YEARWEEK(DATE(time_completed), 1) = YEARWEEK(CURDATE(), 1)'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})

router.get('/month', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 0 AND MONTH(DATE(due_date)) = MONTH(CURDATE())'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})
router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})

router.get('/completed_month', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM goals WHERE complete = 1 AND MONTH(DATE(time_completed)) = MONTH(CURDATE())'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_goals: ' + err)
      return []
    }
    console.log('Getting data from database for /get_goals')
    res.render('./pages/goals', { goals: utils.dateFormatter(rows) })
  })
})


router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})

router.post('/submit_goal', (req, res) => {
  checkLoggedIn(req, res)
  db.insertGoal(utils.reqToGoal(req))
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

router.post('/update_many', (req, res) => {
  db.updateMany(req, res)
})

router.post('/complete_many', (req, res) => {
  db.completeMany(req, res)
})

router.post('/delete_many', (req, res) => {
  db.deleteMany(req, res)
})

router.post('/uncomplete_many', (req, res) => {
  db.uncompleteMany(req, res)
})

router.post('/complete', (req, res) => {
  checkLoggedIn(req, res)
  db.completeGoal(req.body)
  res.redirect('/goals')
})

router.post('/delete/:goal_id', (req, res) => {
  checkLoggedIn(req, res)
  db.deleteGoal(req.params.goal_id)
  res.redirect('/goals')
})

router.get('/delete_all/:period', (req, res) => {
  checkLoggedIn(req, res)
  db.deleteGoalsInPeriod(req.params.period)
  res.redirect('/goals')
})

module.exports = router
