import React, { useEffect, useState } from 'react';
import styles from './game.module.scss';
import { QuestionCard } from './components/question-card/question-card';
import { socket } from '../../api/api';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { Lobby } from '../lobby/lobby';
import { useTransition } from 'react-spring';
import { useHorizontalTransition } from '../../constants/animations.constants';
import { Ranking } from './components/ranking/ranking';

export const Game = () => {
	const history = useHistory();
	const [screen, setScreen] = useState('lobby');
	const [{pinCode, gameId, user, fromJoin, owner}] = useGlobalContext();
	const [users, setUsers] = useState([]);
	const [question, setQuestion] = useState(null);
	const [ranking, setRanking] = useState([]);

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

		socket.on('/ranking', (res) => {
			setTimeout(() => {
				res = res.sort((a, b) => b.score - a.score).slice(0, 5).map(e => ({...e, height: 70}));
				setScreen('ranking');
				setRanking(res);

				setTimeout(() => {
					// const isLast =  question.questionNumber === question.totalQuestions;
					if (owner) {
						socket.emit('/new-question');
					}
				}, 3000);

			}, 2000);
		});

	}, [gameId, user]);

	const transitions = useHorizontalTransition(screen);

	return (
		<div>
			{screen === 'lobby' && <button className={styles.back}  onClick={() => history.push('/')}><img src={process.env.PUBLIC_URL + '/assets/images/back-arrow.png'} alt={'back-arrow'}/></button>}
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
											 key={key}
											 question={question}/>;
					case 'ranking':
						return <Ranking style={props}
											 key={key}
											 ranking={ranking}/>;
					default:
						return <></>
				}
			})}
		</div>
	)
};