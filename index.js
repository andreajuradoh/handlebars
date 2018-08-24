const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var exphbs = require('express-handlebars');
const knex =  require('./db/knex');

var app=express();

app.engine('handlebars', 
           exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

//añadir modules routes
var routes = require('./routes/index.js');
//var users = require('./routes/users.js');


//body.parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.post('/process', function(req , res){
    console.log('formulario: ' + req.query.form);
    console.log('Nombre: ' + req.body.name);
    console.log('Email: ' + req.body.email);
    
});


//archivos estaticos
app.use(express.static(path.join(__dirname, '/public')));


//llamar routers 
app.use('/', routes);

app.get('/user', function(req,res){
   // res.render('show');
    //consulta db
    knex('usuarios') //knex en la tabla 'usuarios' -select from
    .select() //seleccionar 
    .then( objCollectUsers => { //el resultado lo arroja en la variable usuarios
         res.render('user/index', {objUsers: objCollectUsers}); //lo manda a renderizar y lo manda a obj user//
    });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


    