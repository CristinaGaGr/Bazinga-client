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
			<img src={process.env.PUBLIC_URL + '/assets/images/logo.png'}
				 alt={'logo'}
				 className={styles.logo}
			/>
			<div className={styles.intro}>The new quiz game for challenging your friends!</div>
			<button className={'btn'} onClick={fromCreate}>CREATE A GAME</button>
			<Link className={'btn'} to={'/username/join'}>JOIN</Link>
			{(firstLoad) &&
			<div className={styles.auth}>
				{(user) ?
					<Link to={'/history'}>Welcome {user.username}</Link>
					:
					<>
						<Link to={'/signin'}>Sign In</Link>
						<span>Or <Link className={styles.createAccount} to={'/signup'}>create an account</Link></span>
					</>}
			</div>
			}

		</div>
	)
};