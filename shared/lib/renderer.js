import React              from 'react';
import { Provider }       from 'react-redux';
import { renderRoutes }   from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter }   from 'react-router-dom';
import serialize          from 'serialize-javascript';
import Routes             from '../../shared/Routes';


export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
    <html>
      <head>
        <title>MERN Stack - Shop</title>
        <base href="/" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="E-commerce shop with MERN Stack">
        <meta name="author" content="M Tracy">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="client.bundle.js"></script>
      </body>
    </html>
  `;
};
