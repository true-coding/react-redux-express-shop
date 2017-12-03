import React, { Component } from 'react';
import {Field, reduxForm}   from 'redux-form';
import {Link}               from 'react-router-dom';
import PropTypes            from 'prop-types';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.confirmPassword && (values.confirmPassword != values.password)) {
    errors.password = errors.confirmPassword = 'Password Mismatch';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  else if (values.password && (values.confirmPassword != values.password)) {
    errors.password = errors.confirmPassword = 'Password Mismatch';
  }

  return errors;
};


class RenderField extends Component {

  render() {
    const {input, label, type, className, meta: {touched, error}} = this.props;
    let wrapperClass = 'form-group';
    if (touched && error) {
      wrapperClass = `${wrapperClass} error`;
    }

    return (
      <div className={wrapperClass}>
        <label>{label}</label>
        <div className={``}>
          <input {...input} placeholder={label} type={type} className={className} ref={input.name}/>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

export const RegistrationForm = ({handleSubmit, onSubmit, errors}) => {

  return (
    <div className='register'>
      <div className='register-form'>
        <div className='register-heading'>
          <i className='fa fa-user-plus fa-4x' aria-hidden='true'></i>
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field name='firstName' component={RenderField} type='text' placeholder='First Name (optional)'
                 className='form-control' label='First Name' tabIndex='1' focusField='firstName'
          />
          <Field name='lastName' component={RenderField} type='text' placeholder='Last Name (optional)'
                 className='form-control' label='Last Name' tabIndex='2'
          />
          <Field name='email' component={RenderField} type='email' placeholder='Email (required)'
                 className='form-control' label='Email' tabIndex='3'
          />
          <Field name='password' component={RenderField} type='password' placeholder='Password (required)'
                 className='form-control' label='Password' tabIndex='4'
          />
          <Field name='confirmPassword' component={RenderField} type='password'
                 placeholder='Confirm Password (required)' className='form-control' label='Confirm Password'
                 tabIndex='5'
          />
          {/* todo errors not visible - check reducers and actions */}
          {errors &&
          errors.map((error, i) => {
            return <div key={i} className="error"><span>{error.msg}</span></div>
          })

          }
          <button className='btn btn-primary' tabIndex='6'>Register</button>
        </form>
        <div className='register_sign-in'>
          <Link to='/login'>Login?</Link>
        </div>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  errors: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


export default reduxForm({
    form: 'registrationForm',
    validate
  }
)(RegistrationForm);

