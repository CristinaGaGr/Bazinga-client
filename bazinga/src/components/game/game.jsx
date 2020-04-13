import React, { useEffect, useState } from 'react';
import styles from './game.module.scss';
import { QuestionCard } from './components/question-card/question-card';
import { socket } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { Lobby } from '../lobby/lobby';
import { useTransition } from 'react-spring';
import { useHorizontalTransition } from '../../constants/animations.constants';

export const Game = () => {
	const history = useHistory();
	const [screen, setScreen] = useState('lobby');
	const [{pinCode, gameId, user, fromJoin}] = useGlobalContext();
	const [users, setUsers] = useState([]);
	const [question, setQuestion] = useState(null);

	const startGame = () => {
		socket.emit('/start', gameId, user);
	};

	useEffect(() => {
		socket.emit('/hello', gameId, user);
		socket.on('/user', (users) => {
			setUsers(users);
		});

		socket.on('/question', (res) => {
			console.log(res);
			setQuestion(res);
			setScreen('question');
		});

	}, [gameId, user]);

	const transitions = useHorizontalTransition(screen);


	return (
		<div>
			{transitions.map(({item, props, key}) => {
				switch (item) {
					case 'lobby':
						return <Lobby style={props}
									  className={styles.container}
									  key={key}
									  pinCode={pinCode}
									  users={users}
									  startGame={startGame}
									  fromJoin={fromJoin}/>;
					case 'question':
						return <QuestionCard style={props}
											 className={styles.container}
											 key={key}
											 question={question}/>;
					default:
						return <></>
				}
			})}
		</div>
	)
};