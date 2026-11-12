const express = require('express')
const { Pool } = require('pg')

const app = express()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result.rows)
})

const router = express.Router()

router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Hello World',
  })
})

router.get('/*', (_req, res) => {
  res.status(400).json({
    error: 'Запрос не может быть обработан, маршрут не найден',
  })
})

app.use('/', router)

app.listen(3000, () => {
  console.log('Сервер запущен')
})
