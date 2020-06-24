const path = require('path')
const express = require('express')
const layout = require('express-layout')

const routes = require('./routes')
const app = express()

const bodyParser = require('body-parser')

const session = require('express-session')
const uniqid = require('uniqid')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const users = [
    {
          id: process.env.USER_ID, 
          email: process.env.USER,
          password: process.env.PASSWORD}
]

passport.use(new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
          const user = users[0]
          if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                  }
            if (password != user.password) {
                      return done(null, false, { message: 'Invalid credentials.\n' });
                    }
            return done(null, user);
        }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.json(),
  bodyParser.urlencoded({extended: false})
]
app.use(middlewares)

app.use(session({
  genid: (req) => {
      return uniqid()
  },
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

app.listen(9001, () => {
  console.log(`App running on port 9100`)
})
