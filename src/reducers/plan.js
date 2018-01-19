import { ADD_EVENT, REMOVE_EVENT } from '../constants';

export default function plan(state = { events: [] }, action) {
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
    default:
      return state;
  }
}
