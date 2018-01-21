/* eslint-disable import/prefer-default-export */

import {
  ADD_EVENT,
  REMOVE_EVENT,
  SET_SELECTED_TIME,
  CHANGE_EVENT_TIME,
} from '../constants';

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

export function setTime(time) {
  return {
    type: SET_SELECTED_TIME,
    payload: time,
  };
}

export function changeEventTime(id, start, end) {
  return {
    type: CHANGE_EVENT_TIME,
    payload: {
      id,
      start,
      end,
    },
  };
}
