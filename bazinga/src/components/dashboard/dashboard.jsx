import React from 'react';
import styles from  './dashboard.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';


export const Dashboard = () => {
	const history = useHistory();
	const [{user, firstLoad}] = useGlobalContext();

	const fromCreate = () => {
		if (user) {
			history.push('/set');
		} else {
			history.push('/username/create');
		}
	};

	return (
		<div className={`container ${styles.container}`}>
			<button className={'btn'} onClick={fromCreate}>CREATE</button>
			<Link className={'btn'} to={'/username/join'}>JOIN</Link>
			{(firstLoad) &&
			<>
				{(user) ?
					<Link to={'/history'}>{user.username}</Link>
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