const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/about', (req, res) => {
    res.render('about')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('public'));