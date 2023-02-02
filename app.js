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
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantList.results.find((item) => {
    return item.id.toString() === restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search = restaurantList.results.filter((item) => {
    return item.name.includes(keyword) || 
           item.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
           item.category.includes(keyword)
  })
  res.render('index', { restaurant: search, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on the http://localhost:${port}`)
})

