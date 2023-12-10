/* eslint-disable linebreak-style */
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const indexRouter = require('./routers/indexRouter')
const apiRouter = require('./routers/apiRouter')

// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_URI).then(() => {
	console.log('db con')
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
	session({
		secret: 'asecret',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			// eslint-disable-next-line no-undef
			mongoUrl: process.env.DB_URI,
			collectionName: 'sessions',
		}),
	})
)

require('./passportConfig')

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/api', apiRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
