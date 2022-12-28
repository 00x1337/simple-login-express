const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const {users} = require('./database/model/user');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = '145hythry451rt5yr4ghthty5hty5';
const mustacheExpress = require('mustache-express');

app.engine('blade.html', mustacheExpress());
app.set('view engine', 'blade.html');

// Replace 'database' with the name of your database, 'username' with your username, and 'password' with your password
const sequelize = new Sequelize('app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
var Token;
app.locals.Token = Token;
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
function authenticate(req, res, next) {
    // Get the JWT from the request header
    const token = req.header('Authorization');

    // Verify the JWT
    try {
        const decoded = jwt.verify(Token, secret);
        // JWT is valid, set the user on the request object
        req.user = decoded;
        next();
    } catch (err) {
        // JWT is invalid, return 401 Unauthorized
        return res.status(401).send('Unauthorized');
    }
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/dashboard', authenticate,(req, res) => {
    res.send('Hello, World!');
});
app.post('/login', (req, res) => {
    // Validate the form submission
    if (!req.body) {
        return res.status(400).send('Request body is undefined');
    }

    // Check if the username and password properties are defined

    if (!users) {
        return res.status(500).send('User model is undefined');
    }

    // Check if the username and password match a user in the database
    users.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then((user) => {
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
         Token = jwt.sign({
            id: user.id,
            username: user.username
        }, secret, {
            expiresIn: '1h'
        });
        const decoded = jwt.verify(Token, secret);
        const userId = decoded.id;
        console.log(Token)
        console.log(userId)
        res.send('Logged in successfully');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
});
app.post('/register', (req, res) => {
    // Validate the form submission
console.log(req.body);

    // Create a new user in the database
    users.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.send('Registered successfully');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
});

app.get('/login', (req, res) => {
    if(Token){
        res.redirect("/");
    }
    res.render('login');
});
app.get('/reg', (req, res) => {
    if(Token){
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, 'reg.html'));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
