import { createStore } from 'redux';
import reducers from '../reducers';
import * as authenticationActions from '../actions/authenticationActions';
import { userState } from '../constants/initialState';

describe('Store', () => {
  test('Should handle userDataUpdate', () => {
    // arrange
    const store = createStore(reducers, {userDataState:{userState}});
    const user = {
      firstName: 'mike',
      lastName: 'tr',
      username: 'mike-tr',
      roles: ['user']
    };

    // act
    const action = authenticationActions.userDataUpdate(user);
    store.dispatch(action);

    // assert
    const actual = store.getState().userDataState.user;

    expect(actual).toEqual(user);
  });
});
