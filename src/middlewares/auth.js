const passport = require('passport')
const createHttpError = require('http-errors')

const protect = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || info || !user)
      return next(new createHttpError.Unauthorized('Please authenticate.'))
    req.user = user
    next()
  })(req, res, next)
}

const auth =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createHttpError.Forbidden(
          `User role ${req.user.role} is not authorized to access this route`
        )
      )
    }
    next()
  }

export { auth }
export default protect
