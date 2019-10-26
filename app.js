const session = require('express-session')
const express = require('express')
let app = require('express')()
let http = require('http').createServer(app);
//let io = require('socket.io')(http)
const bodyParser = require('body-parser')

let router = express.Router();


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

app.use('/', router)
http.listen(6700, ()=>{
    console.log('listening on *:6700');
})