import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import symbolsRoutes from './routes/symbols.js'
import usersRoutes from './routes/users.js'

/* setting up server */
const app = express()
dotenv.config()
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

/* setting up database and starting the server */


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))
).catch((error) => console.log(error.message))

/* setting up routes */
app.use('/api/symbols', symbolsRoutes)
app.use('/api/users', usersRoutes)








