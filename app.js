const path = require('path')
let app = require('express')();
let express = require('express');
let http = require('http').createServer(app);
let io = require('socket.io')(http)
const layout = require('express-layout')
const bodyParser = require("body-parser")
//app.use(express.session());
let student_array = [

{
  login: "Tjaaa",
  username: "Alexandr101"
}

]
let teachers_array = [

{
  login: "Goka"
}

]

const middleware = [
  layout(),
  express.static(path.join(__dirname, 'templates')),
]
app.use(middleware)


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
    
    res.render('index');

  })
app.get('/login', function(req, res) {
    
  res.sendFile(__dirname + '/templates/login.html');

})

app.get('/classes', function(req, res) {
    
  res.sendFile(__dirname + '/templates/classes.html');

})
app.post('/login', (req, res)=>{
  teacher = req.body.student
  student = req.body.teacher
  console.log(teacher, student)
  if ((teacher && student) == ""){
    res.render('login', {
      error: "Type login"
    })
  }

})
app.get('/tech_classes', function(req, res) {
    
  res.sendFile(__dirname + '/templates/index.html');

})
io.on("connection", (socket)=>{
    console.log('user connected')
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
})
app.listen(5000)