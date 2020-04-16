import React, { useState } from 'react';
import styles from './username.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { checkGame, joinGame } from '../../api/game.api';
import { fromJoinAction, setGameAction, setUserAction } from '../../context/actions';

export const Username = () => {
	const history = useHistory();
	const [{user}, dispatch] = useGlobalContext();
	const {from} = useParams();

	const [username, setUsername] = useState('');
	const [pin, setPin] = useState('');
	const [error, setError] = useState('');

	const [loading, setLoading] = useState(false);

	const goToGame = (e) => {
		setLoading(true);
		e.preventDefault();
		setError('');
		if (from === 'create') {
			const mockUser = {
				_id: null,
				username
			};
			dispatch(setUserAction(mockUser));
			history.push('/set');
			setLoading(false);
		} else {
			let usernameToSend = '';
			if (user) {
				usernameToSend = user.username;
			} else {
				usernameToSend = username;
			}
			checkGame(usernameToSend, pin)
				.then(() => {
					joinGame(usernameToSend, pin)
						.then((res) => {
							const mockUser = {
								_id: user._id || null,
								username: usernameToSend
							};
							dispatch(setGameAction(pin, res));
							dispatch(setUserAction(mockUser));
							dispatch(fromJoinAction());
							setLoading(false);
							history.push('/game');
						})
						.catch(() => setLoading(false));
				})
				.catch((e) => {
					setError(e.response.data.error);
					setLoading(false);
				});
		}
	};

	return (
		<div>
			<button className={styles.back} onClick={() => history.push('/')}><img
				src={process.env.PUBLIC_URL + '/assets/images/back-arrow.png'} alt={'back-arrow'}/></button>
			<form className={styles.container} autoComplete={'off'}>
				{(!user) &&
				<>
					<input type={'text'}
						   name={'username'}
						   onChange={(e) => setUsername(e.target.value)}
						   max={32}
						   required
						   placeholder={'Write your username'}
					/>
				</>
				}
				{(from === 'join') &&
				<input
					type={'number'}
					name={'pincode'}
					onChange={(e) => setPin(e.target.value)}
					min={1000}
					max={9999}
					required
					placeholder={'Enter Pin Code'}
				/>
				}
				{error.length ? <div className={styles.error}>{error}</div> : <></>}
				<button className={'btn'}
						type={'submit'}
						disabled={loading}
						onClick={goToGame}>
					Go
				</button>
			</form>
		</div>
	)
};