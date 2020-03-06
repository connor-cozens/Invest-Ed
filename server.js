var express =       require("express")
var redis =         require("redis")
//var passport =      require("passport")
var session =       require('express-session')
var redisStore =    require('connect-redis')(session)
var mysql =         require('mysql');
var async =         require("async")
var cookieParser =  require("cookie-parser")
var cors = require("cors");
var bodyParser = require("body-parser")

var client = redis.createClient()
var app = express()
//var router = express.Router()

//require('./config/passport.js')

//var port = process.env.PORT || 3000
var port = 3000

app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true,
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl: 260
    })
}))

app.use(cookieParser("secretSign#143_!223"))
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

//app.use(passport.initialize())
//app.use(passport.session())

var Register = require('./routes/Register')
var Login = require('./routes/Login')
var Index = require('./routes/Index')
var Visualize = require('./routes/Visualize')
var Contact = require('./routes/Contact')
var Logout = require('./routes/Logout')


app.use('/', Index)
app.use('/login', Login)
app.use('/register', Register)
app.use('/visualize', Visualize)
app.use('/contact', Contact)
app.use('/logout', Logout)


app.listen(port, () =>{
    console.log("Server is running on port: " + port)
})