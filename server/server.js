import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Import routers
import UserRouter from './api/user.router';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use('/api', posts);

// APIs
app.use(UserRouter);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  // const cssPath = process.env.NODE_ENV === 'production' ? '/css/flat-ui-pro.css' : '/css/flat-ui-pro.css';
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MERN Starter - Blog App</title>
        <!-- bootstrap & fontawesome -->
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/font-awesome.css" />

        <!-- page specific plugin styles -->
        <link rel="stylesheet" href="/css/select2.css" />

        <!-- text fonts -->
        <link rel="stylesheet" href="/css/ace-fonts.css" />

        <!-- ace styles -->
        <link rel="stylesheet" href="/css/ace.css"
          class="ace-main-stylesheet" id="main-ace-style" />

        <link rel="stylesheet" href="/css/demo.css" />
        <link rel="stylesheet" href="/css/pokemon.css" />

        <!-- focus point -->
        <link rel="stylesheet" href="/css/focuspoint.css" />

        <link rel="stylesheet" href="/css/jquery-ui.custom.css" />

        <!-- captcha -->
        <link rel="stylesheet" type="text/css" href="/css/jquery.realperson.css">
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/js/ace-extra.js"></script>
        <!--[if !IE]> -->
        <script type="text/javascript">
          window.jQuery
              || document.write("<script src='/js/jquery.js'>"
                  + "<"+"/script>");
        </script>
        <script type="text/javascript">
          if ('ontouchstart' in document.documentElement)
            document.write("<script src='/js/jquery.mobile.custom.js'>"
                + "<"+"/script>");
        </script>
        <script src="/js/bootstrap.js"></script>
        <script src="/js/jquery-ui.custom.js"></script>
        <script src="/js/jquery.ui.touch-punch.js"></script>
        <script src="/js/jquery.easypiechart.js"></script>
        <script src="/js/jquery.sparkline.js"></script>
        <script src="/js/flot/jquery.flot.js"></script>
        <script src="/js/flot/jquery.flot.pie.js"></script>
        <script src="/js/flot/jquery.flot.resize.js"></script>

        <!-- ace scripts -->
        <script src="/js/ace/elements.scroller.js"></script>
        <script src="/js/ace/elements.fileinput.js"></script>
        <script src="/js/ace/elements.typeahead.js"></script>
        <script src="/js/ace/elements.spinner.js"></script>
        <script src="/js/ace/elements.wizard.js"></script>
        <script src="/js/ace/elements.aside.js"></script>
        <script src="/js/ace/ace.js"></script>
        <script src="/js/ace/ace.ajax-content.js"></script>
        <script src="/js/ace/ace.touch-drag.js"></script>
        <script src="/js/ace/ace.sidebar.js"></script>
        <script src="/js/ace/ace.sidebar-scroll-1.js"></script>
        <script src="/js/ace/ace.submenu-hover.js"></script>
        <script src="/js/ace/ace.widget-box.js"></script>
        <script src="/js/ace/ace.widget-on-reload.js"></script>
        <script src="/js/spin.js"></script>

        <!-- focus-point -->
        <script src="/js/jquery.focuspoint.js"></script>
        <script src="/js/thumbnail.js"></script>

        <!-- 공통 -->
        <script src="/js/view-collection.js"></script>
        <script src="/js/loading.js"></script>

        <!-- 회원가입 -->
        <script src="/js/jquery.inputlimiter.1.3.1.js"></script>
        <script src="/js/fuelux/fuelux.wizard.js"></script>
        <script src="/js/jquery.validate.js"></script>
        <script src="/js/additional-methods.js"></script>
        <script src="/js/bootbox.js"></script>
        <script src="/js/jquery.maskedinput.js"></script>
        <script src="/js/inline/register-member-view.js"></script>

      </head>
      <body class="no-skin">
        <div id="root">${html}</div>
      </body>

      <script src="/dist/bundle.js"></script>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const initialState = { posts: [], post: {} };

    const store = configureStore(initialState);

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      });
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
