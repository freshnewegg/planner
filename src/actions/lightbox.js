/* eslint-disable import/prefer-default-export */

import { SET_LIGHTBOX_STATUS, SET_SELECTED_ACTIVITY } from '../constants';

export function setLightboxStatus(value) {
  return {
    type: SET_LIGHTBOX_STATUS,
    payload: value,
  };
}

export function setSelectedActivity(activity) {
  return {
    type: SET_SELECTED_ACTIVITY,
    payload: activity,
  };
}
