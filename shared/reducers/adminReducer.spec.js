import * as usersActions from '../actions/usersActions';
import adminReducer from './adminReducer';

describe('Admin Reducer', () => {
  test('should remove user when passed REMOVE_USER_COMPLETED',  () => {
    // arrange
    const initialState = {
      users: [
       {email: 'mike@gmail.com'},
       {email: 'bob@test.com'},
       {email: 'remove@gmail.com'}
      ]
    };

    const userToRemove = {email: 'remove@gmail.com'};
    const action = usersActions.removeUserCompleted(userToRemove);

    // act
    const newState = adminReducer(initialState, action);

    // assert
    expect(newState.users.length).toEqual(2);
    expect(newState.users[0].email).toEqual('mike@gmail.com');
    expect(newState.users[1].email).toEqual('bob@test.com');
  });
});
