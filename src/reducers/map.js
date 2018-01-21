import { SET_MAP_LOCATION } from '../constants';

export default function map(
  state = {
    location: {
      0: {
        geometry: {
          location: {
            lat: 40.7127753,
            lng: -74.0059728,
          },
        },
      },
    },
  },
  action,
) {
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
