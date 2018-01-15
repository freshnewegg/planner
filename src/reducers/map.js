import { SET_MAP_LOCATION } from '../constants';

export default function map(state = {}, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return {
        ...state,
        location: action.payload.value,
      };
    default:
      return state;
  }
}
