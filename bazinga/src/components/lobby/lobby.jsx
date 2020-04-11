import React, { useEffect, useRef, useState } from 'react';
import './lobby.scss';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/context';
import { socket } from '../../api/api';


export const Lobby = () => {
	const history = useHistory();
	const [{pinCode, gameId}] = useStateValue();
	const [users, setUsers] = useState([]);

	const pinCodeRef = useRef(null);

	const copy = () => {
		pinCodeRef.current.select();
		navigator.clipboard.writeText(pinCodeRef.current.value);
	};

	const startGame = () => {
		socket.to(gameId).emit('/start');
		history.push('/game');
	};

	useEffect(() => {
		socket.join(gameId);
		socket.to(gameId).on('/user', (users) => {
			setUsers(users);
		});

		return () => {
			console.log('LOBBY: destroy');
			socket.leave(gameId);
		}
	}, []);

	return (
		<div>
			<div>
				<h4>Coy and share:</h4>
				<input ref={pinCodeRef} type={'text'} value={pinCode} disabled={true}/>
				<button onClick={copy}>Copy</button>
			</div>
			<h2>Your friends:</h2>
		<div>
			{users.map((e) =>
				<div key={e}>{e}</div>
			)}
		</div>
			<button onClick={startGame}>Start Game!</button>
		</div>
	)
};