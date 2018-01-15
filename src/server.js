/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import Plan from './data/models/Plan/Plan';
import 'react-bootstrap-table';
import * as debug from 'debug';

const mongoose = require('mongoose');

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(passport.initialize());

if (__DEV__) {
  app.enable('trust proxy');
}
app.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);
app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.post('/food/breakfast', async (req, res) => {
  console.log(req.body);
  console.log('POSTING');

  // use existing plan if there,
  // build the correct plan by adding in the new event

  res.redirect('/');
});

async function setUpBase(initialState, req, res) {
  const css = new Set();

  // Universal HTTP client
  const fetch = createFetch(nodeFetch, {
    baseUrl: config.api.serverUrl,
    cookie: req.headers.cookie,
  });

  const store = configureStore(initialState, {
    fetch,
    // I should not use `history` on server.. but how I do redirection? follow universal-router
  });

  store.dispatch(
    setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }),
  );

  // Global (context) variables that can be easily accessed from any React component
  // https://facebook.github.io/react/docs/context.html
  const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    },
    fetch,
    // You can access redux through react-redux connect
    store,
    storeSubscription: null,
  };

  const route = await router.resolve({
    ...context,
    pathname: req.path,
    query: req.query,
  });

  if (route.redirect) {
    res.redirect(route.status || 302, route.redirect);
    return;
  }

  const data = { ...route };
  data.children = ReactDOM.renderToString(
    <App context={context}>{route.component}</App>,
  );
  data.styles = [{ id: 'css', cssText: [...css].join('') }];
  data.scripts = [assets.vendor.js];
  if (route.chunks) {
    data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
  }
  data.scripts.push(assets.client.js);
  data.app = {
    apiUrl: config.api.clientUrl,
    state: context.store.getState(),
  };

  console.log('WTF');

  const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
  res.status(route.status || 200);
  res.send(`<!doctype html>${html}`);
}

// register custom endpoints
app.get('/food/breakfast', async (req, res, next) => {
  // TODO: SANITIZE USER INPUT

  const key =
    'Bearer nBc98wIZ6B7xaCjUNT97AZ1SEEn70ZKpzMXc_dwJsq1CpQdq8s5PXs8uXX8Yv9L6dqPHR-1HdAC8sJ_qO-pnG016cckNTJnfSP2keueNPfvbBdAeIGsi6yeIu2dYWnYx';
  const url = `https://api.yelp.com/v3/businesses/search?term=breakfast&latitude=${
    req.query.latitude
  }&longitude=${req.query.longitude}`;

  const result = await nodeFetch(url, {
    headers: { Authorization: key },
  }).then(res => res.json());

  const initialState = {
    restaurants: result,
  };

  await setUpBase(initialState, req, res);
});

app.get('*', async (req, res, next) => {
  console.log(req.path);
  try {
    // const css = new Set();
    //
    // // Universal HTTP client
    // const fetch = createFetch(nodeFetch, {
    //   baseUrl: config.api.serverUrl,
    //   cookie: req.headers.cookie,
    // });

    let initialState = null;
    if (req.path == '/') {
      initialState = {
        // set default map location to new york
        map: {
          location: {
            0: {
              geometry: {
                location: {
                  lat: () => 40.7127753,
                  lng: () => -74.0059728,
                },
              },
            },
          },
        },
      };
    } else {
      initialState = {
        user: req.user || null,
      };
    }

    await setUpBase(initialState, req, res);
  } catch (err) {
    next(err);
  }
});

//
// Register server-side plan creation middleware
// -----------------------------------------------------------------------------
app.post('/plan', (req, res) => {
  const myPlan = new Plan(req.body);
  myPlan
    .save()
    .then(item => {
      res.send(`item saved to database${item}`);
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
      console.info(err);
    });
});

app.get('/plan/:id', (req, res) => {
  const id = req.params.id;
  Plan.findById(id, (err, plan) => {
    res.send(plan);
  }).catch(err => {
    res.status(404).send('not found');
  });
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Connect to mongo
// -----------------------------------------------------------------------------
const mongoDB = 'mongodb://localhost:27017/letsdosomethingplanner';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', () => {
  console.info('---FAILED to connect to mongoose');
});
db.once('open', () => {
  console.info('+++Connected to mongoose');
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
