import { ADD_EVENT } from '../constants';

export default function plan(state = { events: [] }, action) {
  switch (action.type) {
    case ADD_EVENT:
      console.log('PAYLOAD');
      console.log(action.payload);
      console.log(state.events);
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
}
