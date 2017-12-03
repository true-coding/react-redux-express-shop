import React                     from 'react';
import { FaSignIn, FaRegistered} from 'react-icons/lib/fa';
import { Link }                  from 'react-router-dom'
import MenuItem                  from './menuItemComponent';

const HeaderUserAuthNav = () => {
  return (
    <ul className='nav navbar-nav'>
      <li>
        <MenuItem Component={Link} to="/login">
        <FaSignIn/>
        Login
      </MenuItem>
      </li>
      <li>
        <MenuItem Component={Link} to="/register">
        <FaRegistered/>
        Register
      </MenuItem>
      </li>
    </ul>
  );
};

export default HeaderUserAuthNav;
