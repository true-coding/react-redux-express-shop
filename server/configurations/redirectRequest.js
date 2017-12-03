const httpsRedirectConfig = (app) => {
  app.all('*', ((req, res, next) => {
     res.redirect(307, `https://localhost${req.url}`);
     next();
  }));
};

export default httpsRedirectConfig;
