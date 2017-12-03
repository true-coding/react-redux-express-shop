/* eslint-disable no-console */
import chalk                  from 'chalk';
import { Router }             from 'express';
import cors                   from 'cors';
import {
  getUserModel,
  getLoginsModel
}                             from '../data_access/modelFactory';
import Promise                from 'bluebird';
import {
  registrationSchema,
  loginSchema
}                             from '../validation/validationSchemas';

const authenticationRouter = Router();

authenticationRouter.route("/api/user/register")
  .post(cors(), async function (req, res) {
    try {

      req.checkBody(registrationSchema);
      const errors = req.validationErrors();

      if (errors) {
        return res.status(500).json(errors);
      }

      const User = await getUserModel();

      const {email, password, firstName, lastName} = req.body;

      const submittedEmail = req.body.email;
      const existingUser = await User.findOne({username: email}).exec();
      if (existingUser) {
        return res.status(409).send(`The specified email ${submittedEmail} address already exists.`);
      }

      const submittedUser = {
        firstName: firstName,
        lastName: lastName,
        username: submittedEmail,
        email: email,
        password: password,
        created: Date.now()
      };

      console.log(chalk.yellow("Creating New User"));
      const user = new User(submittedUser);

      await user.save()
        .then(function (user) {
          if (user) {
            console.log(chalk.yellow(`Created User ${JSON.stringify(user)}`));
          }
        })
        .catch(function (err) {
          if (err) {
            console.log(chalk.yellow(`Error occurred saving User ${err}`));
          }
        });

      res.status(201).json({user: {firstName: user.firstName, lastName: user.lastName, email: user.email}});
    } catch (err) {
      throw err;
    }
  });

authenticationRouter.route("/api/user/login")
  .post(cors(), async function (req, res) {
    const delayLogin = response => {
      setTimeout(() => {
        response();
      }, 1000);
    };

      try {
        const User = await getUserModel();

        const {clientIp} = req;
        const {email, password} = req.body;

        req.checkBody(loginSchema);
        const errors = req.validationErrors();

        if (errors) {
          return delayLogin(() => res.status(401).send("Invalid username or password"));
        }

        const identityKey = `${email}-${clientIp}`;
        const Logins = await getLoginsModel();

        if (await Logins.inProgress(identityKey)) {
          return delayLogin(() => res.status(500).send("Login already in progress."));
        }

        if(!await Logins.canAuthenticate(identityKey)){
          return delayLogin(() => res.status(500).send("The account is temporarily locked out."));
        }

        const existingUser = await User.findOne({username: email}).exec();

        if (!existingUser) {
          await Logins.failedLoginAttempt(identityKey);
          return delayLogin(() => res.status(401).send('Invalid username or password'));
        }

        existingUser.passwordIsValid(password, async function (err, results) {
          if (err) {
            return delayLogin(() => res.status(500).send('There is a problem logging in at the moment. Please try again later'));
          } else if (!results) {
            return delayLogin(() => res.status(401).send('Invalid username or password'));
          }

          const userInfo = {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.email,
            roles: existingUser.roles
          };

          await Logins.successfulLoginAttempt(identityKey);

          req.session.login(userInfo);

          return delayLogin(() => res.status(200).json({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.email,
            roles: existingUser.roles
          }));
        });
      }
      catch (err) {
        return delayLogin(() => res.status(500).send('There is a problem logging in at the moment. Please try again later'));
      }
    }
  )
;

authenticationRouter.route('/api/user/logout')
  .get(cors(), function (req, res) {
    return new Promise(function (resolve, reject) {
      try {
        if (req.session) {
          req.session.destroy();
          resolve(res.sendStatus(200));
        }
      }
      catch (err) {
        return reject(res.sendStatus(500));
      }
    });

  });

export default authenticationRouter;
