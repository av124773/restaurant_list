// require packages used in the project
const express = require('express')
const app = express()
const port = 3001

// require express-handlebars here
const exphbs = require('express-handlebars')

// require local .json here
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on the http://localhost:${port}`)
})

