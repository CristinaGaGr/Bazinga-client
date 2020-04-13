import React, { useEffect, useState } from 'react';
import './history.scss';
import { HistoryCard } from './history-card/history-card';
import { getSummary } from '../../api/core.api';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../api/auth.api';
import { setUserAction } from '../../context/actions';
import { useGlobalContext } from '../../context/context';


export const History = () => {
	const history = useHistory();
	const [summary, setSummary] = useState([]);
	const [{}, dispatch] = useGlobalContext();


	useEffect(() => {
		// getSummary().then((res) => setHistory(res));
	},[]);

	const handleLogout = () => {
			logout().then(() => {
				dispatch(setUserAction(null));
				history.push('/');
			})
	};

	return (
		<div>
			<button className={'btn'} onClick={handleLogout} >Log Out</button>
			<h1>History</h1>
			{summary.map((e) =>
				<HistoryCard/>
			)}
		</div>
	)
};