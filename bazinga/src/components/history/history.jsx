import React, { useEffect, useState } from 'react';
import styles from './history.module.scss';
import { HistoryCard } from './history-card/history-card';
import { useHistory } from 'react-router-dom';
import { logout } from '../../api/auth.api';
import { setUserAction } from '../../context/actions';
import { useGlobalContext } from '../../context/context';


export const History = () => {
	const history = useHistory();
	const [summary, setSummary] = useState([]);
	const [{}, dispatch] = useGlobalContext();


	useEffect(() => {
	},[]);

	const handleLogout = () => {
			logout().then(() => {
				dispatch(setUserAction(null));
				history.push('/');
			})
	};

	return (
		<div>
			<button className={styles.button} onClick={handleLogout}><img
				src={process.env.PUBLIC_URL + '/assets/images/logout3.png'} alt={'logout'}/></button>
			<h1>History</h1>
				<HistoryCard/>
		</div>
	)
};