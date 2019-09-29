var express = require('express');
var mysql = require('mysql');
var faker = require('faker');
var bodyParser = require('body-parser');

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_ps',
    database: 'join_us'
});


app.get('/', function(req, res){
    var q = 'SELECT COUNT(*) AS count FROM users'
    connection.query(q, function(err, result){
        if(err){
            console.log(err)
        }else{
            var count = result[0].count
            res.render('home', {count: count})
        }
    })
})

app.post('/register', function(req, res){
    var person = {
        email: req.body.email
    };
    var q = 'INSERT INTO users SET ?'
    connection.query(q, person, function(err, result){
        if(err) throw err;
        res.redirect('/')
    });
})

app.listen(3000, function(){
    console.log('listening on port 3000');
});