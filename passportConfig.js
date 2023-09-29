const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Author = require('./models/AuthorModel')
const bcrypt = require('bcryptjs')

passport.use(
	'login',
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await Author.findOne({ username })

			if (!user) {
				return done(null, false, { message: 'User not found' })
			}

			const validate = await user.isValidPassword(password)

			if (!validate) {
				return done(null, false, { message: 'Wrong Password' })
			}

			return done(null, user, { message: 'Logged in Successfully' })
		} catch (error) {
			return done(error)
		}
	})
)

passport.use(
	'signup',
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await Author.create({ username, password })

			return done(null, user)
		} catch (error) {
			done(error)
		}
	})
)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	try {
		const user = await Author.findById(id)
		done(null, user)
	} catch (err) {
		done(err)
	}
})
