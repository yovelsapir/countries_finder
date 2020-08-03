import undoable from 'redux-undo';
import { countriesTypes } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
   data: {},
   country: '',
   error: '',
   done: false,
   searchValue: '',
};

const countriesReducer = (
   state = INITIAL_STATE,
   action: { type: any; payload?: any }
) => {
   switch (action.type) {
      // FETCH ALL COUNTRIES
      case countriesTypes.FETCH_COUNTRIES:
         return {
            ...state,
            data: { ..._.mapKeys(action.payload, 'name') },
            done: true,
         };
      case countriesTypes.FETCH_COUNTRIES_ERROR:
         return {
            ...state,
            data: [],
            error: 'Failed to fetch countries',
            done: true,
         };

      // SET CURRENT COUNTRY
      case countriesTypes.SET_CURRENT_COUNTRY_CHANGE:
         return {
            ...state,
            done: false,
         };
      case countriesTypes.SET_CURRENT_COUNTRY_SUCCESS:
         return {
            ...state,
            country: action.payload,
            done: true,
         };
      case countriesTypes.SET_CURRENT_COUNTRY_FAILED:
         return {
            ...state,
            country: {},
            error: 'Country not found.',
         };

      // SEARCH COUNTRY
      case countriesTypes.SEARCH_COUNTRY_CHANGE:
         return {
            ...state,
            done: false,
         };
      case countriesTypes.SEARCH_COUNTRY_SUCCESS:
         return {
            ...state,
            searchValue: action.payload,
            done: true,
         };
      case countriesTypes.SEARCH_COUNTRY_FAILED:
         return {
            ...state,
            error: 'Not found.',
            done: true,
         };
      default:
         return state;
   }
};

export default undoable(countriesReducer);
