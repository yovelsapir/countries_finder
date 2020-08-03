import { countriesTypes } from './types';
import { Dispatch } from 'redux';

export const searchCountryAction = (name: string) => ({
   type: countriesTypes.SEARCH_COUNTRY,
   payload: name,
});

export const fetchCountriesAction = () => async (dispatch: Dispatch) => {
   const response = await fetch('https://restcountries.eu/rest/v2/all');
   dispatch({
      type: countriesTypes.FETCH_COUNTRIES,
      payload: await response.json(),
   });
};
