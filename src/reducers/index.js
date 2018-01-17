import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import map from './map';
import restaurants from './restaurants';
import plan from './plan';
import lightbox from './lightbox';

export default combineReducers({
  user,
  runtime,
  map,
  restaurants,
  plan,
  lightbox,
});
