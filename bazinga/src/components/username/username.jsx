import React, { useState } from 'react';
import './username.scss';
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
			history.push('/set');
		} else {
			let usernameToSend = '';
			if (user) {
				usernameToSend = user;
			} else {
				usernameToSend = username;
			}
			joinGame(usernameToSend, pin).then((res) => {
				dispatch(setGameAction(pin, res));
				dispatch(setUserAction(usernameToSend));
				dispatch(fromJoinAction());
				history.push('/game');
			});
		}
	};

	return (
		<form>
			{(!user) &&
			<>
				<label>Username</label>
				<input type={'text'}
					   name={'username'}
					   onChange={(e) => setUsername(e.target.value)}
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
				required
				placeholder={'Enter Pin Code'}
			/>
			}
			<button type={'submit'} onClick={goToGame}>Go</button>
		</form>
	)
};