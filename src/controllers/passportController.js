const LocalStrategy = require('passport-local').Strategy
const usersRepo = new (require('../repositories/UsersRepo'))()
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const log4js = require('../utils/log4js')


passport.use('login', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    async function (req, email, password, done) {
        const user = await usersRepo.getById('email', email)
        try {
            if (!user) {
                return done(null, false,
                    log4js.logWarn('Passport: User Not found.'));
            } else if (!isValidPassword(user, password)) {
                return done(null, false,
                    log4js.logWarn('Passport: Invalid Password.'));
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error)
        }
    }
))


passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    function (req, email, password, done) {
        findOrCreateUser = async function () {
            try {
                const user = await usersRepo.getById('email', email)
                if (user) {
                    return done(null, false,
                        log4js.logWarn('message', 'User Already Exists'))
                } else {
                    const newUser = {
                        username: req.body.username,
                        password: createHash(password),
                        email: email,
                        address: req.body.address,
                        age: req.body.age,
                        phone: req.body.countryCode + req.body.phone,
                        avatar: req.body.avatar
                    }
                    try {
                        await usersRepo.save(newUser)
                        log4js.logInfo('User Registration successful')
                        return done(null, newUser)
                    }
                    catch (error) {
                        error.message = `Error al crear nuevo usuario`
                        log4js.logError(error)
                        throw new Error(error)
                    }
                }
            }
            catch (error) {
                error.message = 'Signup Error'
                log4js.logError(error)
                return done(error)
            }
        }
        process.nextTick(findOrCreateUser)
    }
))



const isValidPassword = function (user, password) {
    return bcryptjs.compareSync(password, user.password);
}

var createHash = function (password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10), null)
}

passport.serializeUser(function (user, done) {
    done(null, user.email)
})

passport.deserializeUser(async function (email, done) {
    try {
        const user = await usersRepo.getById("email", email)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
})

module.exports = passport