import React from 'react';
import './dashboard.scss';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/context';
import { createGame } from '../../api/game.api';
import { setGameAction } from '../../context/actions';


export const Dashboard = () => {
	const history = useHistory();
	const [{user, firstLoad}] = useStateValue();

	const fromCreate = () => {
		if (user) {
			history.push('/set');
		} else {
			history.push('/username/create');
		}
	};

	return (
		<div>
			<h1>BAZINGA!</h1>
			<button onClick={fromCreate}>CREATE</button>
			<Link to={'/username/join'}>JOIN</Link>

			{(firstLoad) &&
			<>
				{(user) ?
					<Link to={'/history'}>{user}</Link>
					:
					<>
						<Link to={'/signin'}>Sign In</Link>
						<Link to={'/signup'}>Or create an account</Link>
					</>}
			</>
			}

		</div>
	)
};