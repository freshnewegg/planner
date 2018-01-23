import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';
import { persistStore, autoRehydrate } from 'redux-persist';

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
      devToolsExtension,
    );
  } else {
    enhancer = compose(applyMiddleware(...middleware), autoRehydrate());
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // begin periodically persisting the store
  persistStore(store, { blacklist: ['restaurants', 'mapped_restaurants'] });

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
