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


const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/'} render={() => <Dashboard/>}/>
            <Route exact path={'/username'} render={() => <Username/>}/>
            <Route exact path={'/set'} render={() => <GameSettings/>}/>
            <Route exact path={'/lobby'} render={() => <Lobby/>}/>
            <Route exact path={'/game'} render={() => <Game/>}/>
            <Route exact path={'/ranking'} render={() => <Ranking/>}/>
        </Switch>
    )
};


export const App = () =>  {
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        getUser().then( (res) => dispatch(setUserAction(res)) )
    }, [dispatch]);


    return (
        <div>
           <Routes/>
        </div>
    );
};

