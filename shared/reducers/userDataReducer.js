import * as types     from '../constants/actionTypes';
import { userState }  from '../constants/initialState';

export default function userDataReducer(state = userState, action) {
  switch (action.type) {
    case types.USERDATA_UPDATED:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
