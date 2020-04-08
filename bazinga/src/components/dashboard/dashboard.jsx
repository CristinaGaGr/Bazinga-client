import React from 'react';
import './dashboard.scss';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
	return (
		<div>
			<h1>BAZINGA!</h1>
			<Link to={'/username'}>CREATE</Link>
			<Link to={'/username'}>JOIN</Link>
		</div>
	)
};