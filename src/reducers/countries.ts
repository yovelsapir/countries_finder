import { countriesTypes } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
   data: {},
   country: {},
};

export default (state = INITIAL_STATE, action: { type: any; payload: any }) => {
   switch (action.type) {
      case countriesTypes.FETCH_COUNTRIES:
         return {
            data: { ..._.mapKeys(action.payload, 'name') },
         };

      case countriesTypes.SEARCH_COUNTRY:
         return {
            ...state,
            country: action.payload,
         };
      default:
         return state;
   }
};
