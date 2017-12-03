import React, { Component }  from 'react';
import PropTypes             from 'prop-types';
import FaSignOut             from 'react-icons/lib/fa/sign-out';
import requiresAuth          from "../common/RequiresAuthComponent";
import MenuItem              from './menuItemComponent';
import { Link }              from 'react-router-dom'

class HeaderUserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {user, logout} = this.props;
    const func = () => <MenuItem Component={Link} to="/admin/users/1">Admin</MenuItem>;
    const Component = requiresAuth(func, {role: "admin", user: user});
    return (
      <ul className='nav navbar-nav'>
        <li>
          <MenuItem Component={Link} to="/">{user.identity}</MenuItem>
        </li>
        <li>
          <MenuItem Component={Link} to="/" onClick={logout}>
            <FaSignOut/>
            Logout
          </MenuItem>
        </li>
        <li>
          <Component/>
        </li>
      </ul>
    );
  }
}

HeaderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default HeaderUserProfile;
