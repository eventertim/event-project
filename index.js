var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var env = require('node-env-file');
var path = require('path');
var morgan = require('morgan');

var app = express();

env(path.join(__dirname, '.env'));

app.set('port', (process.env.PORT || 5000));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(cors());

// morgan
app.use(morgan('dev'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://eventertim:event123@ds159892.mlab.com:59892/eventer_db', { useMongoClient: true });

app.use('/api/user', require('./routes/users'));

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});