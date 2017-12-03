import React from 'react';
import {LoginForm} from './LoginFormComponent';

function setup() {
  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    errors: {}
  };

  return shallow(<LoginForm {...props} />);
}

describe('LoginFormComponent', () => {
  test('renders form and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Login');
  });
});
