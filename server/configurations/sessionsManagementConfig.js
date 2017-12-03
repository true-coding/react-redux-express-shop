import connectionProvider           from '../data_access/connectionProvider';
import {serverSettings}             from '../settings';
import session                      from 'express-session';
import mongoStoreFactory            from 'connect-mongo';

export default function sessionManagementConfig(app){

  session.Session.prototype.login = function (user) {
    this.userInfo = user;
  };

  const MongoStore = mongoStoreFactory(session);

  app.use(session({
    store: new MongoStore({
      dbPromise: connectionProvider(serverSettings.serverUrl, serverSettings.database),
      ttl: (2 * 60 * 60)
    }),
    secret: serverSettings.session.password,
    saveUninitialized: true,
    resave: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,  // todo setup https
      maxAge: (2 * 60 * 60 * 1000)
    },
    name: 'id'
  }));
}
