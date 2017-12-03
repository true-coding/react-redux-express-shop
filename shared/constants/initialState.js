export const userState = {
  user:{}
};

export const loginState = {
  isAuthenticated: false,
  isRequested: false,
  errors: {},
  creds: {
    username: "",
    password: ""
  }
};

export const registrationState = {
  isAuthenticated: false,
  isRequested: false,
  isRegistered: false,
  errors: {},
  registration: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
};

export const adminState = {
  users: [],
  totalPages: 0,
  page: 0
};
