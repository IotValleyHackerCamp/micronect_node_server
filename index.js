"use strict"

let express = require('express') 
let app = express()
let microwaves = {}
let dbUrl = 'http://something:8086/'
const seuilOn = 1000;

function process(data){
	return {
		microwaves:{
			1:true,
			2:false,
			3:true
		}
	}
}


setInterval(()=>{
	// get data from db here
	microwaves = process([])
}, 1000)

app.get('/', (req, res)=>{
	res.send('coucou')
})

app.get('/status', (req, res)=>{
	res.send(microwaves)
})


app.listen(3333)