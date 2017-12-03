import {
  UserSchema,
  LoginsSchema
}                         from './schemas';
import { serverSettings } from '../settings';
import connectionProvider from './connectionProvider';

export const getUserModel = async () => {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model('User', UserSchema);
  } catch ( err ) {
    throw err;
  }
};

export const getLoginsModel = async function() {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model("Logins", LoginsSchema);
  } catch(err) {
    throw err;
  }
};
