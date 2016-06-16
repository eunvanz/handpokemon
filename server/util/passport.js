import User from '../models/user.model';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

export const setup = (passport) => {
  passport.user(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
