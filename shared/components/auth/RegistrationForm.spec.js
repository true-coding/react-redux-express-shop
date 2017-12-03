import React from 'react';
import {RegistrationForm} from './RegistrationForm';

function setup() {
  const props = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    errors: []
  };

  return shallow(<RegistrationForm {...props} />);
}

describe('RegistrationForm', () => {
  test('renders form and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Register');
  });
});
