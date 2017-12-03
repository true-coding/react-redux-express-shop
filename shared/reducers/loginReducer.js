import { loginState }  from '../constants/initialState';
import * as types      from '../constants/actionTypes';

export default function loginReducer(state = loginState, action) {
  switch (action.type) {
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isRequested: false,
        isAuthenticated: false,
        error: action.error
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isRequested: true,
        isAuthenticated: false
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isRequested: false,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
