import React              from 'react';
import * as types         from '../constants/actionTypes';
import * as actions       from './authenticationActions';
import configureMockStore from 'redux-mock-store';
import thunk              from 'redux-thunk';
import fetchMock          from 'fetch-mock';
import sinon from 'sinon';

import {RegistrationForm} from '../components/auth/RegistrationForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {

  function setup() {
    const props = {
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      errors: []
    };

    return shallow(<RegistrationForm {...props} />);
  }

  test('userRegistrationFailure should return action with errors as payload', () => {
    const errors = { msg: 'This email already exists'};
    const expectedAction = {
      type: types.REGISTRATION_FAILURE,
      isRequested: false,
      isRegistered: false,
      errors
    };

    expect(actions.userRegistrationFailure(errors)).toEqual(expectedAction);
  });

});
