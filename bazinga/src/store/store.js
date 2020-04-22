import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { coreReducer } from './core/core.reducer';
import { gameReducer } from './game/game.reducer';
import coreSaga from './core/core.saga';


const reducers  = combineReducers({
	coreReducer,
	gameReducer
});

const sagaMiddleware = createSagaMiddleware();

export default createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

function* rootSaga() {
	yield all([
		coreSaga()
	])
}

sagaMiddleware.run(rootSaga);