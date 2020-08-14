import {
   call,
   put,
   all,
   takeEvery,
   take,
   takeLatest,
} from 'redux-saga/effects';
import { countriesTypes } from '../actions/types';
import { filteredListByAlphabetic } from '../utils';
import { countriesEvent } from './events';

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
      //yield delay(200); // I'm not really need to do debounce here because I'm showing the data from global countries list.
      yield put({
         type: countriesTypes.SEARCH_COUNTRY_SUCCESS,
         payload: action.payload,
      });
   } catch (error) {
      yield put({ type: countriesTypes.SEARCH_COUNTRY_FAILED, error });
   }
}

function* watchSearchInput() {
   yield takeLatest(
      countriesTypes.SEARCH_COUNTRY_CHANGE,
      handleSearchInputChange
   );
}

// FETCH COUNTRIES
// function* fetchCountries() {
//    try {
//       yield take(countriesTypes.FETCH_COUNTRIES);
//       const countries = yield call(Api.fetchCountries);
//       const alphabeticCountries = filteredListByAlphabetic(countries, 'name');
//       yield put({
//          type: countriesTypes.FETCH_COUNTRIES,
//          payload: alphabeticCountries,
//       });
//    } catch (error) {
//       yield put({ type: countriesTypes.FETCH_COUNTRIES_ERROR, payload: error });
//    }
// }

// fetchCountriesWithEvent
function* watchfetchCountries() {
   const chan = yield call(countriesEvent);
   try {
      while (true) {
         const countries = yield take(chan);

         const alphabeticCountries = filteredListByAlphabetic(
            countries,
            'name'
         );
         yield put({
            type: countriesTypes.FETCH_COUNTRIES,
            payload: alphabeticCountries,
         });
      }
   } finally {
      console.log('connection closed');
      chan.close();
      yield put({
         type: countriesTypes.FETCH_COUNTRIES_ERROR,
         payload: 'Connection closed.',
      });
   }
}

export default function* rootSaga() {
   yield all([
      watchSearchInput(),
      watchSetCountryClicked(),
      watchSetAlphabeticClicked(),
      watchfetchCountries(),
   ]);
}
