import {
  ADD_EVENT,
  REMOVE_EVENT,
  SET_SELECTED_TIME,
  CHANGE_EVENT_TIME,
} from '../constants';
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
    case CHANGE_EVENT_TIME:
      return {
        ...state,
        events: state.events.map(
          (content, i) =>
            i === action.payload.id
              ? {
                  ...content,
                  range: {
                    start: action.payload.start,
                    end: action.payload.end,
                  },
                }
              : content,
        ),
      };
    default:
      return state;
  }
}
