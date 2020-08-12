import { call, put, all, takeEvery, take } from 'redux-saga/effects';
import { countriesTypes } from '../actions/types';
import Api from '../Api/Api';
import { filteredListByAlphabetic } from '../utils';

// WATCH FOR ALPHABETIC CLICKED
function* handleChangeCurrentAlphabetic(action: any) {
   try {
      yield put({
         type: countriesTypes.SET_CURRENT_ALPHABETIC_SUCCESS,
         payload: action.payload,
      });
   } catch (error) {
      yield put({ type: countriesTypes.SET_CURRENT_ALPHABETIC_FAILED, error });
   }
}

function* watchSetAlphabeticClicked() {
   try {
      yield takeEvery(
         countriesTypes.SET_CURRENT_ALPHABETIC_CHANGE,
         handleChangeCurrentAlphabetic
      );
   } catch (error) {
      yield put({ type: countriesTypes.SET_CURRENT_ALPHABETIC_FAILED });
   }
}

// WATCH FOR COUNTRY CLICKED
function* handleChangeCurrentCountry(action: any) {
   try {
      yield put({
         type: countriesTypes.SET_CURRENT_COUNTRY_SUCCESS,
         payload: action.payload,
      });
   } catch (error) {
      yield put({ type: countriesTypes.SET_CURRENT_COUNTRY_FAILED, error });
   }
}

function* watchSetCountryClicked() {
   try {
      yield takeEvery(
         countriesTypes.SET_CURRENT_COUNTRY_CHANGE,
         handleChangeCurrentCountry
      );
   } catch (error) {
      yield put({ type: countriesTypes.SET_CURRENT_COUNTRY_FAILED });
   }
}

// SEARCH BOX CHANGE
function* handleSearchInputChange(action: any) {
   try {
      yield put({
         type: countriesTypes.SEARCH_COUNTRY_SUCCESS,
         payload: action.payload,
      });
   } catch (error) {
      yield put({ type: countriesTypes.SEARCH_COUNTRY_FAILED, error });
   }
}

function* watchSearchInput() {
   try {
      yield takeEvery(
         countriesTypes.SEARCH_COUNTRY_CHANGE,
         handleSearchInputChange
      );
   } catch (error) {
      yield put({ type: countriesTypes.SEARCH_COUNTRY_FAILED });
   }
}

// FETCH COUNTRIES
function* fetchCountries() {
   try {
      yield take(countriesTypes.FETCH_COUNTRIES);
      const countries = yield call(Api.fetchCountries);
      const alphabeticCountries = filteredListByAlphabetic(countries, 'name');
      yield put({
         type: countriesTypes.FETCH_COUNTRIES,
         payload: alphabeticCountries,
      });
   } catch (error) {
      yield put({ type: countriesTypes.FETCH_COUNTRIES_ERROR, payload: error });
   }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
   yield all([
      watchSearchInput(),
      watchSetCountryClicked(),
      watchSetAlphabeticClicked(),
      fetchCountries(),
   ]);
}
