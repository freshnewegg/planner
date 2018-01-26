/* eslint-disable import/prefer-default-export */

import {
  ADD_EVENT,
  REMOVE_EVENT,
  SET_SELECTED_TIME,
  CHANGE_EVENT_TIME,
  placesUrl,
  g_api_key,
  detailsUrl,
  photosUrl,
} from '../constants';

import nodeFetch from 'node-fetch';

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

export function fetchPhotos(selectedActivity) {
  // console.log(this.state.placesUrl.concat(newProps.selectedActivity ? newProps.selectedActivity.replace(/ /g, '+') : '', this.state.key));
  const url = placesUrl.concat(
    selectedActivity ? selectedActivity.replace(/ /g, '+') : '',
    g_api_key,
  );
  return nodeFetch(url)
    .then(result => result.json())
    .then(result => {
      if (result.results.length > 0) {
        const detailUrl = detailsUrl.concat(
          result.results[0].place_id,
          g_api_key,
        );

        return nodeFetch(detailUrl)
          .then(resp => resp.json())
          .then(detailResult => {
            const photos = detailResult.result.photos;
            if (photos.length == 10) {
              const newArr = [];
              for (let i = 0; i < 10; i++) {
                newArr.push(
                  photosUrl.concat(photos[i].photo_reference, g_api_key),
                );
              }
              return newArr;
            }
          });
      }
      console.log(result);
    });
}
