// @flow
import { takeLatest, put, call } from 'redux-saga/effects';
import { type Saga } from 'redux-saga';
import {
	STATUS_DEFAULT,
	STATUS_LOADING,
	STATUS_SUCCESS,
	STATUS_FAILURE,
} from 'constants/PayloadStatus';
import {
	FETCH_Test_START,
	fetchTestSuccess,
	fetchTestFailure,
} from 'actions/TestActions';

function* fetchTest(action) {
  try {
    yield put(fetchTestSuccess());
  } catch (e) {
    __DEV__ && console.log(e);
    yield put(fetchTestFailure());
  }
}

function* watcher(): Saga<*> {
  yield takeLatest(FETCH_Test_START, fetchTest);
}

export default watcher;