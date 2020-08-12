import undoable from 'redux-undo';
import { countriesTypes } from '../actions/types';

const INITIAL_STATE = {
   data: {},
   country: '',
   alphabetic: '',
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
            data: action.payload,
            done: true,
         };
      case countriesTypes.FETCH_COUNTRIES_ERROR:
         return {
            ...state,
            data: {},
            error: 'Failed to fetch countries',
            done: true,
         };

      // SET CURRENT COUNTRY
      case countriesTypes.SET_CURRENT_COUNTRY_CHANGE:
         return {
            ...state,
            done: false,
            alphabetic: '',
            country: '',
         };
      case countriesTypes.SET_CURRENT_COUNTRY_SUCCESS:
         return {
            ...state,
            country: action.payload,
            done: true,
            alphabetic: action.payload[0],
         };
      case countriesTypes.SET_CURRENT_COUNTRY_FAILED:
         return {
            ...state,
            country: {},
            error: 'Country not found.',
            done: true,
            alphabetic: '',
         };

      // SET CURRENT ALPHABETIC
      case countriesTypes.SET_CURRENT_ALPHABETIC_CHANGE:
         return {
            ...state,
            done: false,
         };
      case countriesTypes.SET_CURRENT_ALPHABETIC_SUCCESS:
         return {
            ...state,
            alphabetic: action.payload,
            country: '',
            done: true,
         };
      case countriesTypes.SET_CURRENT_ALPHABETIC_FAILED:
         return {
            ...state,
            alphabetic: '',
            country: '',
            error: 'Alphabetic not found.',
            done: true,
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
