import {
  applyMiddleware,
  createStore
}                       from 'redux';
import thunk            from 'redux-thunk';
import axios            from 'axios';
import reducers         from '../reducers/index';
import appSettings      from '../constants/applicationSettings';

export default req => {

  const client = axios.create({
    baseURL: appSettings.serverPath,
    headers: { cookie: req.get('cookie') || '' }
  });

  let user = {};
  if (req.session.userInfo) {
    const {firstName, lastName, username, _id, roles} = req.session.userInfo;

    user = {
      firstName,
      lastName,
      username,
      roles
    };
  }

  const store = createStore(
    reducers,
    {userDataState: {user: user}},
    applyMiddleware(thunk.withExtraArgument(client))
  );

  return store;
};
// func? todo
