import React, { useState } from 'react';
import styles from './username.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { joinGame } from '../../api/game.api';
import { fromJoinAction, setGameAction, setUserAction } from '../../context/actions';

export const Username = () => {
	const history = useHistory();
	const [{user}, dispatch] = useGlobalContext();
	const {from} = useParams();

	const [username, setUsername] = useState('');
	const [pin, setPin] = useState('');

	const goToGame = (e) => {
		e.preventDefault();
		if (from === 'create') {
			const mockUser = {
				_id: null,
				username
			};
			dispatch(setUserAction(mockUser));
			history.push('/set');
		} else {
			let usernameToSend = '';
			if (user) {
				usernameToSend = user.username;
			} else {
				usernameToSend = username;
			}
			joinGame(usernameToSend, pin).then((res) => {
				const mockUser = {
					_id: null,
					username: usernameToSend
				};
				dispatch(setGameAction(pin, res));
				dispatch(setUserAction(mockUser));
				dispatch(fromJoinAction());
				history.push('/game');
			});
		}
	};

	return (
		<div>
			<button className={styles.back} onClick={() => history.push('/')}><img src={process.env.PUBLIC_URL + '/assets/images/back-arrow.png'} alt={'back-arrow'}/></button>
			<form className={styles.container}>
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
				<button className={'btn'} type={'submit'} onClick={goToGame}>Go</button>
			</form>
		</div>
	)
};