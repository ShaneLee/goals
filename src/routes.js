const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const db = require('./database')

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
  res.render('./pages/goals', { goals: db.getGoals() })
})

router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})


router.post('/submit_goal', (req, res) => {
  checkLoggedIn(req, res)
  db.submitGoal(req.body.goal, req.body.category, req.body.dueDate)
  res.redirect('/')
})

router.post('/submit_category', (req, res) => {
  checkLoggedIn(req, res)
  category = req.body.category
  res.redirect('/')
})

router.post('/delete/:goal_id', (req, res) => {
  checkLoggedIn(req, res)
  db.deleteGoal(req.params.goal_id)
  res.redirect('/goals')

})

module.exports = router
