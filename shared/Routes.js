import React            from 'react';
import App              from './components/App';
import HomePage         from './components/home/HomePage';
import RegistrationPage from './components/auth/RegistrationContainer';
import LoginPage        from './components/auth/LoginContainer';
import AdminContainer   from "./components/admin/AdminContainer";
import requiresAuth     from "./components/common/RequiresAuthContainer";

export default [
  {
    ...App,
    routes: [
      {
        ... HomePage,
        path: '/',
        exact: true
      },
      {
        ...RegistrationPage,
        path: '/register'
      },
      {
        ...LoginPage,
        path: '/login'
      },
      {
        component: requiresAuth(AdminContainer, {role: 'admin', redirectTo: '/'}),
        path: '/admin/users/:page'
      }
    ]
  }
];

// todo not found page
