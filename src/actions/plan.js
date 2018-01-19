/* eslint-disable import/prefer-default-export */

import { ADD_EVENT, REMOVE_EVENT } from '../constants';

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: event,
  };
}

export function removeEvent(event) {
  return {
    type: REMOVE_EVENT,
    payload: event,
  };
}
