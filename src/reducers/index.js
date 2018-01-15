import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import map from './map';
import restaurants from './restaurants';

export default combineReducers({
  user,
  runtime,
  map,
  restaurants,
});
