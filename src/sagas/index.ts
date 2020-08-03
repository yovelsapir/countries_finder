import { call, put, all, takeEvery, take } from 'redux-saga/effects';
import { countriesTypes } from '../actions/types';
import Api from '../Api/Api';

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

function* fetchCountries() {
   try {
      yield take(countriesTypes.FETCH_COUNTRIES);
      const countries = yield call(Api.fetchCountries);
      yield put({
         type: countriesTypes.FETCH_COUNTRIES,
         payload: countries,
      });
   } catch (error) {
      yield put({ type: countriesTypes.FETCH_COUNTRIES_ERROR, payload: error });
   }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
   yield all([watchSearchInput(), watchSetCountryClicked(), fetchCountries()]);
}
