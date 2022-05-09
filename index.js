import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes'

// conexion a la base de datos con MongoDB
mongoose.Promise = global.Promise
const DB = 'mongodb://localhost:27017/DBTareasEP'
mongoose
  .connect(DB)
  .then((mongoose) => console.log('Connected to the DB on port 27017'))
  .catch((err) => console.log('err'))

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'views')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/cice', router)
app.set('port', process.env.PORT || 4800)

app.listen(app.get('port'), () => {
  console.log('Server running on port ', app.get('port'))
})
