export const registrationSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{min:13}],
      errorMessage: 'Password has to be minimum 13 characters length.'
    },
    matches: {
      options: ['(?=.*[a-zA-Z])(?=.*[0-9]+).*', 'g'],
      errorMessage: 'Password must be alphanumeric.'
    },
    errorMessage: 'Invalid Password'
  },
  'firstName': {
    notEmpty: false,
    isLength: {
      options: [{max: 100}],
      errorMessage: 'The firs name must be under 100 characters'
    },
    matches: {
      options: ["^[a-z ,.'-]+$", "i"],
      errorMessage: "The first name can only contain letters and the characters (,.'-)"
    }
  },
  'lastName': {
    notEmpty: false,
    isLength: {
      options: [{max: 100}],
      errorMessage: 'The last name must be under 100 characters'
    },
    matches: {
      options: ["^[a-z ,.'-]+$", "i"],
      errorMessage: "The last name can only contain letters and the characters (,.'-)"
    }
  }
};

export const loginSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  }
};
