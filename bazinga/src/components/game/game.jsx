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
import { FinalRanking } from './components/final-ranking/final-ranking';

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

	const leave = () => {
		socket.emit('/bye');
		history.push('/');
	};

	useEffect(() => {
		let questionNumber = 0;
		let totalQuestions = 0;

		socket.emit('/hello', gameId, user);
		socket.on('/user', (users) => {
			setUsers(users);
		});

		socket.on('/question', (res) => {
			console.log(res);
			setQuestion(res);
			totalQuestions = res.totalQuestions;
			questionNumber = res.questionNumber;
			setScreen('question');
		});

		socket.on('/ranking', (res) => {
			console.log(questionNumber);
			setTimeout(() => {
				const isLast = questionNumber === totalQuestions;
				if (isLast) {
					res = res.sort((a, b) => b.score - a.score).map(e => ({...e, height: 70}));
					setScreen('finalRanking');
				} else {
					res = res.sort((a, b) => b.score - a.score).slice(0, 5).map(e => ({...e, height: 70}));
					setScreen('ranking');
				}
				setRanking(res);

				setTimeout(() => {
					console.log(questionNumber, totalQuestions);
					if (owner) {
						if (isLast) {
							console.log('game finished');
						} else {
							socket.emit('/new-question');
						}
					}
				}, 3000);

			}, 2000);
		});

	}, [gameId, user]);

	const transitions = useHorizontalTransition(screen);

	return (
		<div>
			{screen === 'lobby' || screen === 'finalRanking' && <button className={styles.back} onClick={leave}><img
				src={process.env.PUBLIC_URL + '/assets/images/back-arrow.png'} alt={'back-arrow'}/></button>}
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
					case 'finalRanking':
						return <FinalRanking style={props}
											 key={key}
											 ranking={ranking}/>;
					default:
						return <></>
				}
			})}
		</div>
	)
};