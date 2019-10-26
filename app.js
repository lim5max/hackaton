let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http)


app.get('/', function(req, res) {
    
    res.sendFile(__dirname + '/templates/index.html');

  })
app.get('/login', function(req, res) {
    
  res.sendFile(__dirname + '/templates/login.html');

})
app.get('/classes', function(req, res) {
    
  res.sendFile(__dirname + '/templates/classes.html');

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