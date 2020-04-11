import React, { useState } from 'react';
import './username.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useStateValue } from '../../context/context';
import { createGame, joinGame } from '../../api/game.api';
import { setGameAction } from '../../context/actions';

export const Username = () => {
	const history = useHistory();
	const [{user}, dispatch] = useStateValue();
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
				history.push('/lobby');
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