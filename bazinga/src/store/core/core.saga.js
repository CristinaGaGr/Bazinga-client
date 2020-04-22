import { takeLatest, call, put } from 'redux-saga/effects';
import { getUser } from '../../api/core.api';
import { setUserActionResponse } from './core.actions';

function* setUserEffect() {
	const user = yield call(getUser);
	yield put(setUserActionResponse(user));
}


function* coreSaga() {
	yield takeLatest('USER_REQUEST', setUserEffect)
}

export default coreSaga;

