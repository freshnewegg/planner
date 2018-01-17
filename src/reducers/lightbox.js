import { SET_LIGHTBOX_STATUS, SET_SELECTED_ACTIVITY } from '../constants';

export default function lightbox(
  state = { lightboxOpen: false, selectedActivity: null },
  action,
) {
  switch (action.type) {
    case SET_LIGHTBOX_STATUS:
      return {
        ...state,
        lightboxOpen: action.payload,
      };
    case SET_SELECTED_ACTIVITY:
      return {
        ...state,
        selectedActivity: action.payload,
      };
    default:
      return state;
  }
}
