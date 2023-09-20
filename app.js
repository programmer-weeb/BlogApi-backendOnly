const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()
const port = 3000
const AuthorModel = require('./models/AuthorModel')
const bcrypt = require('bcryptjs')

const indexRouter = require('./routers/indexRouter')
const apiRouter = require('./routers/apiRouter')

app.use(express.urlencoded({ extended: false }))

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const author = await AuthorModel.findOne({ username }).exec()
        const doesPasswordMatch = await bcrypt.compare(password, author.password)
        if (doesPasswordMatch) {
            return done(null, author)
        } else {
            return done(null, false, { message: 'invalid password' })
        }
    })
)

app.use('/', indexRouter)
app.use('/api', apiRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))