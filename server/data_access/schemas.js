import mongoose       from 'mongoose';
import Promise          from "bluebird";


const bcrypt = Promise.promisifyAll(require("bcrypt"));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    match:/^[a-z ,.'-]+/,
    maxLength: 100
  },
  lastName: {
    type: String,
    match:/^[a-z ,.'-]+/,
    maxLength: 100
  },
  username: {
    type: String,
    index: {
      unique: false
    }
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 13
  },
  email: {
    type: String,
    require: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  roles: {
    type: Array,
    default: ["user"]
  }

});

UserSchema.methods.passwordIsValid = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, results) {
    if (err) {
      callback(false);
      return;
    }

    callback(null, results);
  });
};

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 15.5, (err, hash) => {
    if (err) {
      next(err);
      return;
    }

    this.password = hash;
    next();
  });

});

export {UserSchema as UserSchema};

const LoginsSchema = new Schema({
  identityKey: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  timeout: {
    type: Date,
    required: true,
    default: new Date()
  },
  inProgress: {
    type: Boolean,
    default: false
  }
});

LoginsSchema.static("canAuthenticate", async function (key) {
  const login = await this.findOne({identityKey: key});

  if (!login || login.failedAttempts < 5 ) {
    return true;
  }

  const timeout = (new Date() - new Date(login.timeout).addMinutes(1));
  if (timeout >= 0) {
    await login.remove();
    return true;
  }
  return false;
});

LoginsSchema.static("failedLoginAttempt", async function (key) {
  const query = {identityKey: key};
  const update = {$inc: {failedAttempts: 1}, timeout: new Date(), inProgress: false};
  const options = {setDefaultsOnInsert: true, upsert: true};
  return  await this.findOneAndUpdate(query, update, options).exec();
});

LoginsSchema.static("successfulLoginAttempt", async function (key) {
  const login = await this.findOne({identityKey: key});
  if (login) {
    return await login.remove();
  }
});

LoginsSchema.static("inProgress", async function(key) {
  const login = await this.findOne({identityKey: key});
  const query = {identityKey: key};
  const update = {inProgress: true};
  const options = {setDefaultsOnInsert: true, upsert: true};
  await this.findOneAndUpdate(query, update, options).exec();
  return (login && login.inProgress);
});

export {LoginsSchema as LoginsSchema};
