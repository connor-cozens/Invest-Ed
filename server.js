var express =       require("express")
var redis =         require("redis")
var session =       require('express-session')
var redisStore =    require('connect-redis')(session)
var mysql =         require('mysql');
var async =         require("async")
var cookieParser =  require("cookie-parser")
var cors = require("cors");
var nodemailer = require('nodemailer')
var bodyParser = require("body-parser")
var passport = require('passport')

const { port } = require('./config')

var client = redis.createClient()
client.on('connect', () => {
  console.log('Connected to Redis')
})

var app = express()

var expiryDate = 3600000
app.use(cookieParser('temporarySecret'))//new
app.use(session({
    name: 'sessionID',//new
    secret: 'temporarySecret',
    httpOnly: false,
    cookie: {expires: new Date(Date.now() + (30 * 86400 * 1000))}, //new
    resave: false,
    saveUninitialized: false,
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl: 260
    }),
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Added fields to cors to allow incoming requests to include session in header
app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    callback(null, true);
  }
}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var Register = require('./routes/Register')
var Login = require('./routes/Login')
var Index = require('./routes/Index')
var Visualize = require('./routes/Visualize')
var Contact = require('./routes/Contact')
var Logout = require('./routes/Logout')
var Dashboard = require('./routes/Dashboard')
var ChangePassword = require('./routes/ChangePassword')


app.use('/', Index)
app.use('/login', Login)
app.use('/register', Register)
app.use('/visualize', Visualize)
app.use('/contact', Contact)
app.use('/logout', Logout)
app.use('/dashboard',Dashboard)
app.use('/change-password', ChangePassword)


app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
})
