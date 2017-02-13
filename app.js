var express = require('express');
var app = express();
var http = require('http');
var $ = require('jquery');

options = {
  host: 'localhost',
  port: 8086,
  path: '/query?db=micronect&q=select%20last(value)%20from%20microwaves%20limit%201'
};

function getMicronectValue(){
  http.get(options, function(response) {
      
}

app.get('/', function(req, res){
  console.log('get method receive');
  http.get(options, function(response) {
    console.log('sending http get and waiting for response');
    response.on('data', function(data) {
      console.log('parsing response in JSON');
      var obj = JSON.parse(data);
      console.log(obj.results[0].series[0].values[0][1])
    })
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

