import * as types   from "../constants/actionTypes";
import {adminState} from "../constants/initialState";

export default function adminReducer(state = adminState, action) {
  switch (action.type) {
    case types.USERS_FAILURE:
      return {
        ...state,
        isRequested: false,
        errorMessage: action.errorMessage
      };
    case types.USERS_REQUEST:
      return {
        ...state,
        isRequested: true
      };
    case types.USERS_RECEIVED:
      return {
        ...state,
        isRequested: false,
        users: action.users,
        totalPages: action.totalPages,
        page: action.page
      };
    case types.REMOVE_USER_FAILURE:
      return {
        ...state,
        isRequested: false,
        errorMessage: action.errorMessage
      };
    case types.REMOVE_USER_REQUESTED:
      return {
        ...state,
        isRequested: true
      };
    case types.REMOVE_USER_COMPLETED:
      return {
        ...state,
        isRequested: false,
        users: state.users.filter(user => user.email !== action.user.email)
      };
    default:
      return state;
  }
}
