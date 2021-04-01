const express = require('express')
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
const database = require('mongodb').MongoClient;

const profiel = {
  name:'Arie',
  age: '23',
  img:'Images/Amateur darter.jpg',
}

const profielVrouw = {
  name:'Marjet',
  age: '34',
  img:'Images/marjet_dart.jpg',
}

app.engine('handlebars', exphbs({
  defaultLayout:'main',
  layoutsDir:'views/layouts',
}),
);
app.use(express.static('public'));

app.set('view engine', 'handlebars');

app.get('/home', (req, res) => {
  res.render('home', {title:'Home',profiel})
});

app.get('/', (req, res) => {
  res.render('login', {title:'Login'})
});

app.post('/', (req, res) => {
  res.render('home', {title:'Home',profiel});
});

app.get('/about', (req, res) => {
    res.render('about',{title:'about', profielVrouw})
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.static('public'));



