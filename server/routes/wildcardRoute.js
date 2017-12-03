import { Router }       from 'express';
import { matchRoutes }  from 'react-router-config';
import createStore      from '../../shared/lib/createStore';
import Routes           from '../../shared/Routes';
import renderer         from '../../shared/lib/renderer';

const wildcardRouter = Router();

wildcardRouter.route('*')
  .get(async function (req, res) {

    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path)
      .map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
      })
      .map(promise => {
        if (promise) {
          return new Promise((resolve, reject) => {
            promise.then(resolve).catch(resolve);
          });
        }
      });

    Promise.all(promises).then(() => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    });
  });

export default wildcardRouter;
