import React, { Component }                  from 'react';
import { connect }                           from 'react-redux';
import { bindActionCreators }                from 'redux';
import PropTypes                             from 'prop-types';
import LoginForm                             from './LoginFormComponent';
import * as authActions                      from '../../actions/authenticationActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {errors} = nextProps;
    this.setState({errors: Object.assign({}, errors)});
  }

  login(formData) {
    const {authActions} = this.props;
    const {returnUrl} = '/';
    authActions.login(formData, returnUrl);
  }

/*  login(formData) {
    const {authActions} = this.props;
    const {returnUrl} = this.props.location.query;
    authActions.login(formData, returnUrl);
  }*/

  render() {
    const {error} = this.props;
    return (
      <LoginForm
        onSubmit={this.login}
        errors={error}
      />
    );
  }
}

Login.propTypes = {
  creds: PropTypes.object,
  errors: PropTypes.object,
  authActions: PropTypes.object,
  error: PropTypes.object
};

function mapStateToProps(state) {
  const {loginState} = state;

  return {
    creds: loginState.creds,
    error: loginState.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}
export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Login)
};
