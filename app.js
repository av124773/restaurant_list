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

/**
 * route setting: 路徑指向根目錄時的設定 
 * 
 * @param {object} req - 主機收到的 request
 * @param {object} res - 主機想回傳的 response
 */
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

/**
 * route setting: 路徑指向餐廳 id 時的設定 
 * 
 * @param {object} req - 主機收到的 request
 * @param {object} res - 主機想回傳的 response
 * @type {string} restaurant_id - 截取 request 中的餐廳 id 資訊
 * @type {object} restaurant - 拿網址中的餐廳 id 和 restaurantList 裡的 id 作比對
 *                             如果找到符合的資料就將它存到 restaurant 中
 */
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  const restaurant = restaurantList.results.find((item) => {
    return item.id.toString() === restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

/**
 * route setting: 路徑指向搜尋時的設定 
 * 
 * @param {object} req - 主機收到的 request
 * @param {object} res - 主機想回傳的 response
 * @type {string} keyword - 截取 request 中的 keyword 資訊
 * @type {object} search - 使用 filter 將符合 keyword 的資料都篩選出來(不分大小寫)並儲存
 */
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

