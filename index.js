const express = require('express')
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs({
  defaultLayout:'main',
  layoutsDir:'views/layouts',
}),
);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {title:'Home', profiel})
});
app.get('/about', (req, res) => {
    res.render('about')
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.static('public'));

const profiel = [{
  name:"Arie",
  age: "23"
}]
