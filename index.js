const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('main')
})
app.get('/about', (req, res) => {
    res.render('about')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})