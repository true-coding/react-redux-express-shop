import * as types            from '../constants/actionTypes';
import { registrationState } from '../constants/initialState';

export default function registrationReducer(state = registrationState, action) {
  switch (action.type) {
    case types.REGISTRATION_FAILURE:
      return {
        ...state,
        isRequested: false,
        isRegistered: false,
        errors: action.errors
      };
    case types.REGISTRATION_REQUEST:
      return {
        ...state,
        isRequested: true,
        isRegistered: false
      };
    case types.REGISTRATION_SUCCESS:
      return {
        ...state,
        isRequested: false,
        isRegistered: true,
        message: action.message
      };
    default:
      return state;
  }
}
