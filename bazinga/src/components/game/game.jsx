import React, { useEffect, useRef, useState } from 'react';
import './game.scss';
import { QuestionCard } from './components/question-card/question-card';
import { socket } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { Lobby } from '../lobby/lobby';

export const Game = () => {
	const history = useHistory();
	const [{pinCode, gameId, user, fromJoin}] = useGlobalContext();
	const [users, setUsers] = useState([]);
	const [question, setQuestion] = useState(null);
	const [showLobby, setShowLobby] = useState(true);

	const startGame = () => {
		socket.emit('/start', gameId);
	};

	useEffect(() => {
		socket.emit('/hello', gameId, user);
		socket.on('/user', (users) => {
			setUsers(users);
		});

		socket.on('/question', (res) => {
			console.log(res);
			setQuestion(res);
			setShowLobby(false);
		});

	}, []);

	return (
		<div>
			{showLobby && <Lobby pinCode={pinCode}
								 users={users}
								 startGame={startGame}
								 fromJoin={fromJoin}/>}
			{question && <QuestionCard question={question}/>}
		</div>
	)
};