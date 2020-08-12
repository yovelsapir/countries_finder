import { countriesTypes } from './types';

// FETCH ALL COUNTRIES
export const fetchCountriesAction = () => ({
   type: countriesTypes.FETCH_COUNTRIES,
});

export const fetchCountriesFailedAction = () => ({
   type: countriesTypes.FETCH_COUNTRIES_ERROR,
});

// SET CURRENT COUNTRY CHANGE
export const setCurrentCountryChange = (country: any) => ({
   type: countriesTypes.SET_CURRENT_COUNTRY_CHANGE,
   payload: country,
});

export const setCurrentCountrySuccess = (country: any) => ({
   type: countriesTypes.SET_CURRENT_COUNTRY_SUCCESS,
   payload: country,
});

export const setCurrentCountryFailed = () => ({
   type: countriesTypes.SET_CURRENT_COUNTRY_FAILED,
});

// SET CURRENT ALPHABETIC CHANGE
export const setCurrentAlphabeticChange = (alphabetic: any) => ({
   type: countriesTypes.SET_CURRENT_ALPHABETIC_CHANGE,
   payload: alphabetic,
});

export const setCurrentAlphabeticSuccess = (alphabetic: any) => ({
   type: countriesTypes.SET_CURRENT_ALPHABETIC_SUCCESS,
   payload: alphabetic,
});

export const setCurrentAlphabeticFailed = () => ({
   type: countriesTypes.SET_CURRENT_ALPHABETIC_FAILED,
});

// SEARCH COUNTRIES
export const searchCountryChangeAction = (searchValue: string) => ({
   type: countriesTypes.SEARCH_COUNTRY_CHANGE,
   payload: searchValue,
});

export const searchCountrySuccessAction = (countryName: string) => ({
   type: countriesTypes.SEARCH_COUNTRY_SUCCESS,
   payload: countryName,
});

export const searchCountryFailedAction = () => ({
   type: countriesTypes.SEARCH_COUNTRY_FAILED,
});
