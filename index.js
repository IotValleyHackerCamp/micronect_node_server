"use strict"

let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'public')));

var server = require('http').Server(app);
var io = require('socket.io')(server);

let port = process.env.PORT || 3333
let microwaves = {data:{
	1:{status:true, since:Date.now()},
	2:{status:true, since:Date.now()},
	3:{status:true, since:Date.now()}
}}

let dbUrl = 'http://127.0.0.1:8086/'
const seuilOn = 1000


io.on('connection', function (socket) {
	// on first connection feed front with current status
  socket.emit('data', microwaves.data);
});


server.listen(port, function(){
	console.log("listening on "+port)
})

// test url to toggle a change on frontend
app.get('/test/change', (req, res)=>{
	// change related microwave status
	toggle(req.query.id)
	// update every connected client
	io.emit('data', microwaves.data)
	res.json(microwaves)
})

function toggle(id){
	microwaves.data[id].status = !microwaves.data[id].status
	microwaves.data[id].since = Date.now()
}