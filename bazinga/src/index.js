import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './context/context';
import { initialState, reducer } from './context/reducer';

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();