import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Username } from './components/username/username';
import { GameSettings } from './components/game-settings/game-settings';
import { useGlobalContext } from './context/context';
import { getUser } from './api/core.api';
import { setUserAction } from './context/actions';
import { Game } from './components/game/game';
import { Ranking } from './components/game/components/ranking/ranking';
import { SignUp } from './components/auth/signup';
import { SignIn } from './components/auth/signin';
import { History } from './components/history/history';



const Routes = () => {
    return (
        <Switch>
            <Route exact path={'/'} render={() => <Dashboard/>}/>
            <Route exact path={'/username/:from'} render={() => <Username/>}/>
            <Route exact path={'/set'} render={() => <GameSettings/>}/>
            <Route exact path={'/game'} render={() => <Game/>}/>
            <Route exact path={'/ranking'} render={() => <Ranking/>}/>
            <Route exact path={'/signup'} render={() => <SignUp/>}/>
            <Route exact path={'/signin'} render={() => <SignIn/>}/>
            <Route exact path={'/history'} render={() => <History/>}/>
        </Switch>
    )
};


export const App = () =>  {
    const [{}, dispatch] = useGlobalContext();

    useEffect(() => {
        getUser().then( (res) => {
            dispatch(setUserAction(res));
        });
    }, [dispatch]);

    return (
        <div>
           <Routes/>
        </div>
    );
};

