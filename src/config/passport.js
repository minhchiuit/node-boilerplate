import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './env.config'
import User from '../models/user.model'

const jwtOptions = {
  secretOrKey: config.jwt.secret.access,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)
    if (!user) return done(null, false)
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export { jwtStrategy }
