import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { getUserById } from '../service/index.js';

export default function setJWTStrategy() {
  const secret = process.env.SECRET;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await getUserById(payload.id);
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
}
