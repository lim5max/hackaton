let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http)
const bodyParser = require('body-parser')
const session = require('express-session')


const midllewares = [
  bodyParser.urlencoded()
]

app.use(midllewares)

app.get('/dashboard', function(req, res) {
    
    res.sendFile(__dirname + '/templates/dashboard.html');

  })

app.post('/dashboard', function(req, res){
  teacher_name  =  req.body.teachername
  password      =  req.body.password


})


http.listen(6700, ()=>{
    console.log('listening on *:6700');
})