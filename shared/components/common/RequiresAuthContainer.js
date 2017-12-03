import React, {Component} from "react";
import history            from "../../lib/history";
import {connect}          from "react-redux";

export default function requiresAuth(ChildComponent, {role, redirectTo}) {
  class AuthenticationComponent extends Component {
    constructor(props) {
      super(props);

      this.checkAndRedirect = this.checkAndRedirect.bind(this);
      this.isAuthorized = this.isAuthorized.bind(this);
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect() {
      if (!this.isAuthorized()) {
        history.push(redirectTo);
      }
    }

    isAuthorized() {
      const {user} = this.props;
      const hasRole = user && user.roles && user.roles.filter(r => r === role);
      return typeof hasRole !== "undefined" && hasRole !== null && hasRole.length > 0;
    }

    render() {
      const results = this.isAuthorized();
      return !!results && <ChildComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    const {userDataState} = state;
    return {user: userDataState.user}
  };


  return connect(mapStateToProps)(AuthenticationComponent);
}
