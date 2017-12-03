import React     from 'react';
import PropTypes from 'prop-types';
import moment    from 'moment';
import { Table } from 'react-bootstrap';
import {TiArrowBack, TiArrowForward} from 'react-icons//lib/ti';

const Users = ({users, page, totalPages, removeUser, getUsers}) => {
  return (
      <Table responsive>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Created On</th>
          <th></th>
        </tr>
        <tr>
          <td>
            {page > 1 &&
            <button className="btn btn-primary" onClick={() => getUsers(page-1)}>
              <TiArrowBack/>
            </button>
            }
          </td>
          <td colSpan="3">{page} / {totalPages}</td>
          <td className="text-align-right page-button">
            {page < totalPages &&
            <button className="btn btn-primary" onClick={() => getUsers(page+1)}>
              <TiArrowForward/>
            </button>
            }
          </td>
        </tr>
        </thead>
        <tbody>
        {users && users.length && users.map((user, i) => {
          const date = `${moment(user.created).format("MMMM Do YYYY")}`;
          return (
            <tr key={i}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{date.toString()}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>removeUser(user)}>Delete</button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
  );
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
