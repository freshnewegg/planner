import { ADD_EVENT, REMOVE_EVENT, SET_SELECTED_TIME } from '../constants';
import moment from 'moment';

export default function plan(state = { events: [], time: moment() }, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter((_, i) => i != action.payload),
      };
    case SET_SELECTED_TIME:
      return {
        ...state,
        time: action.payload,
      };
    default:
      return state;
  }
}
