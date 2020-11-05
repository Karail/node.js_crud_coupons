import passport from 'passport';
//Strategy's
import { jwtStrategy } from '../strategy/jwt.strategy';
//Models
import { User } from '../../user/models';

passport.use(jwtStrategy);

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ where: { id } });
        if (user) {
            return done(null, user);
        } else {
            throw Error('user is not fined');
        }
    } catch (ex) {
        return done(ex, null);
    }
});

export default passport;