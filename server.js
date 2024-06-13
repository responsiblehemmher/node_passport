const express = require('express');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const passport = require('passport');

/* const initializePassport = require('./passport-config')
initializePassport(passport);
 */
const users = []

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

//setup a route (GET method by default)
app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});

// for post routes
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users)
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});