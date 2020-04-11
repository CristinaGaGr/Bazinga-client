import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Username } from './components/username/username';
import { GameSettings } from './components/game-settings/game-settings';
import { useStateValue } from './context/context';
import { getUser } from './api/core.api';
import { setUserAction } from './context/actions';
import { Lobby } from './components/lobby/lobby';
import { Game } from './components/game/game';
import { Ranking } from './components/ranking/ranking';
import { SignUp } from './components/auth/signup';
import { SignIn } from './components/auth/signin';
import { History } from './components/history/history';
import socketIOClient from 'socket.io-client';
import { socket } from './api/api';



const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/'} render={() => <Dashboard/>}/>
            <Route exact path={'/username/:from'} render={() => <Username/>}/>
            <Route exact path={'/set'} render={() => <GameSettings/>}/>
            <Route exact path={'/lobby'} render={() => <Lobby/>}/>
            <Route exact path={'/game'} render={() => <Game/>}/>
            <Route exact path={'/ranking'} render={() => <Ranking/>}/>
            <Route exact path={'/signup'} render={() => <SignUp/>}/>
            <Route exact path={'/signin'} render={() => <SignIn/>}/>
            <Route exact path={'/history'} render={() => <History/>}/>
        </Switch>
    )
};


export const App = () =>  {
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        getUser().then( (res) => {
            dispatch(setUserAction(res));
        });
        socket.on('FromAPI', data => console.log(data));

    }, [dispatch]);


    return (
        <div>
           <Routes/>
        </div>
    );
};

