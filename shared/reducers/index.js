import { combineReducers } from 'redux';
import userDataReducer     from './userDataReducer';
import loginReducer        from './loginReducer';
import registrationReducer from './registrationReducer';
import adminReducer        from "./adminReducer";
import {
  reducer as formReducer
}                          from 'redux-form';

export default combineReducers({
  userDataState: userDataReducer,
  loginState: loginReducer,
  registrationState: registrationReducer,
  adminState: adminReducer,
  form: formReducer
});
