import React, { useEffect, useState } from 'react';
import './history.scss';
import { HistoryCard } from './history-card/history-card';
import { getSummary } from '../../api/core.api';
import { Link } from 'react-router-dom';

export const History = () => {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// getSummary().then((res) => setHistory(res));
	},[]);

	return (
		<div>
			<Link to={'/'}>Log Out</Link>
			<h1>History</h1>
			{history.map((e) =>
				<HistoryCard/>
			)}
		</div>
	)
};