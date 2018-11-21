// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// module.exports = (passport) => {
//     passport.serializeUser((user, done) => {
//         done(null, user);
//     });

//     passport.deserializeUser((user, done) => {
//         done(null, user);
//     })

//     passport.use(new GoogleStrategy({
//         clientID: "22493967586-ns8gcf94a1mk5g47tk7tl3pniv3l22mr.apps.googleusercontent.com",
//         clientSecret: "ED0ydoEoIiCRWH3HrPHl3ygS",
//         callbackURL: '/auth/google/callback'
//     },
//     (token, refreshToken, profile, done) => {
//         return done(null, {
//             profile: profile,
//             token: token
//         });
//     }
//     ));
// };

const GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy;

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: "22493967586-ns8gcf94a1mk5g47tk7tl3pniv3l22mr.apps.googleusercontent.com",
        clientSecret: "ED0ydoEoIiCRWH3HrPHl3ygS",
        callbackURL: '/auth/google/callback'
    }, (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};
