import 'babel-polyfill';
import express                    from 'express';
import morgan                     from 'morgan';
import bodyParser                 from 'body-parser';
import chalk                      from 'chalk';
import apiRouteConfig             from './configurations/apiRoutesConfig';
import sessionManagementConfig    from './configurations/sessionsManagementConfig';
import redirectRequest            from './configurations/redirectRequest';
import expressValidator           from 'express-validator';
import https                      from 'https';
import pem                        from 'pem';

/*eslint-disable no-console*/

const insecurePort = 8000,
  insecureApp = express(),
  app = express(),
  host = 'localhost';

sessionManagementConfig(app);

//app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(express.static('public'));

//redirectRequest(insecureApp);
apiRouteConfig(app);

try {
  app.listen(insecurePort, function(err) {
    if (err) {
      throw err;
    }
    console.log(chalk.green(`Express server listening at http://${host}:${insecurePort}...`));
  });
/*  pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
      throw err
    }
    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(443);
  });*/

} catch (err) {
  console.log(chalk.red(err));
}
