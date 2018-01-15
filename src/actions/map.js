/* eslint-disable import/prefer-default-export */

import { SET_MAP_LOCATION } from '../constants';

export function setMapVariable(_value) {
  return {
    type: SET_MAP_LOCATION,
    payload: {
      value: _value,
    },
  };
}
