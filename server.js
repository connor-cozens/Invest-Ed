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

var client = redis.createClient()
var app = express()

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