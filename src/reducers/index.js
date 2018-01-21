import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import map from './map';
import restaurants from './restaurants';
import plan from './plan';
import lightbox from './lightbox';
import saved_events from './saved_events';
import mapped_restaurants from './mapped_restaurants';

export default combineReducers({
  user,
  runtime,
  map,
  restaurants,
  plan,
  lightbox,
  mapped_restaurants,
  saved_events,
});
