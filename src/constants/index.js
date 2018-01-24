/* eslint-disable import/prefer-default-export */

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SET_LIGHTBOX_STATUS = 'SET_LIGHTBOX_STATUS';
export const SET_SELECTED_ACTIVITY = 'SET_SELECTED_ACTIVITY';
export const SET_SELECTED_TIME = 'SET_SELECTED_TIME';
export const CHANGE_EVENT_TIME = 'CHANGE_EVENT_TIME';

export const host =
  process.env.API_SERVER_URL ||
  `http://localhost:${process.env.PORT || 3000}` + '/plan/';

export const placesUrl =
  'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
export const g_api_key = '&key=AIzaSyBupkySfNlvYgfI2QEs9-mXANFwL_JwTmM';
export const detailsUrl =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
export const photosUrl =
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';
