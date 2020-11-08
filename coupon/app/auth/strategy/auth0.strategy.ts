import { Strategy as Auth0Strategy } from 'passport-auth0';
//Models
import { User } from '../../user/models';

export const auth0Strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/auth0/callback`,
    state: false,
}, async (accessToken, refreshToken, extraParams, profile, done) => {
    try {
        const user = await User.findOrCreate({
            where: {
                email: profile?.emails?.[0]?.value
            },
            defaults: {
                name: profile?.displayName,
                password: null
            }
        });
        return done(null, user[0].get());
    } catch (ex) {
        return done(ex, null);
    }
});