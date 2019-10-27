const session = require('express-session')
const express = require('express')
let app = require('express')()
const http = require('http')
let io = require('socket.io')(http)
var fs = require('fs')


const bodyParser = require('body-parser')

let router = express.Router();

let students = [
  {
    "status" : "absent",
    "device_name": ""
  }
]
const midllewares = [
  
  bodyParser.urlencoded()
]
app.use(express.static(__dirname + '/templates'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true}))
app.use(midllewares)

router.get('/dashboard', function(req, res) {
    
    res.sendFile(__dirname+'/templates/dashboard.html');

  })

router.post('/dashboard', function(req, res){
  teacher_name  =  req.body.teachername
  password      =  req.body.password
  console.log(password, teacher_name)
  if (password == "password" && teacher_name == "limkee") {
    req.session.thname = teacher_name
    
    res.redirect('/admin_panel')
  }else{
    res.redirect('/dashboard')
  }
  


})
router.get('/admin_panel', (req, res)=>{
  
  if (!req.session.thname){
    res.redirect('/dashboard');

  }else{
    res.sendFile(__dirname+'/templates/index.html')
  }
})
router.get('/student_registration', (req, res)=>{
  res.sendFile(__dirname + '/templates/user_reg.html')


})
router.post('/student_registration', (req, res)=> {
  students.append({
    "username" : req.body.username,
    "surname" :  req.body.surname,
    "bl_name" :  req.body.bl_name,
    "status"  : "absent"
  
  })

  res.redirect('/student_login')
  
  
  
})
router.get('/classes', (req, res)=>{
  res.sendFile(__dirname+'/templates/classes.html')


})
app.use('/', router)
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on("new connection", (msg)=> {
    for (j in students){
      if (j.device_name == msg.device_name){
        j.status = "on lecture"


      }
    }
  })
});
http.createServer(app)
.listen(6800, function () {
  console.log('Example app listening on port 6800! Go to https://localhost:6800/')
})