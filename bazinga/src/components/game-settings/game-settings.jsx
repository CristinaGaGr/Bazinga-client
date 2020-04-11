import React, { useState } from 'react';
import './game-settings.scss';
import { Link, useHistory } from 'react-router-dom';
import { createGame } from '../../api/game.api';
import { useStateValue } from '../../context/context';
import { setGameAction } from '../../context/actions';

const allCategories = [
	'Entertainment: Books',
	'Entertainment: Film',
	'Entertainment: Music',
	'Entertainment: Television',
	'Entertainment: Video Games',
	'Science & Nature',
	'Geography',
	'Sports',
	'History'
];

export const GameSettings = () => {
	const history = useHistory();
	const [screen, setScreen] = useState(1);
	const [numberOfQuestions, setNumberOfQuestions] = useState(0);
	const [difficulty, setDifficulty] = useState('');
	const [categories, setCategories] = useState([]);

	const [{user}, dispatch] = useStateValue();

	const chooseCategory = (category) => {
		if (category === 'all') {
			setCategories(allCategories);
		} else {
			const existCategory = categories.find((e) => e === category);
			if (existCategory) {
				const newCategories = categories.filter((e) => e !== category);
				setCategories(newCategories);
			} else {
				setCategories([...categories, category]);
			}
		}
	};

	const goToLobby = () => {
		createGame(user, numberOfQuestions, difficulty, categories).then((res) => {
			const {pin, game_id} = res;
			dispatch(setGameAction(pin, game_id));
			history.push('/lobby');
		})
	};


	return (
		<div className={'setting-container'}>
			{screen === 1 && <div className={'setting'}>
				<h1 className={'titleSetting'}>How many questions do you want?</h1>
				<button onClick={() => setNumberOfQuestions(10)}>10</button>
				<button onClick={() => setNumberOfQuestions(20)}>20</button>
				<button onClick={() => setNumberOfQuestions(30)}>30</button>
				<button onClick={() => setNumberOfQuestions(40)}>40</button>
				<button onClick={() => setNumberOfQuestions(50)}>50</button>
				<button onClick={() => setScreen(2)}
						disabled={numberOfQuestions === 0}>
					Next
				</button>
			</div>}
			{screen === 2 && <div className={'setting'}>
				<h1 className={'titleSetting'}>Choose the level:</h1>
				<button onClick={() => setDifficulty('easy')}>Easy</button>
				<button onClick={() => setDifficulty('medium')}>Medium</button>
				<button onClick={() => setDifficulty('hard')}>Difficult</button>
				<button onClick={() => setScreen(3)}
						disabled={difficulty === ''}>
					Next
				</button>

			</div>}
			{screen === 3 && <div className={'setting'}>
				<h1 className={'titleSetting'}>Choose categories:</h1>
				<button onClick={() => chooseCategory('all')}>All</button>
				<button onClick={() => chooseCategory('Entertainment: Books')}>Books</button>
				<button onClick={() => chooseCategory('Entertainment: Film')}>Films</button>
				<button onClick={() => chooseCategory('Entertainment: Music')}>Music</button>
				<button onClick={() => chooseCategory('Entertainment: Television')}>TV</button>
				<button onClick={() => chooseCategory('Entertainment: Video Games')}>Videogames</button>
				<button onClick={() => chooseCategory('Science & Nature')}>Science & Nature</button>
				<button onClick={() => chooseCategory('Geography')}>Geography</button>
				<button onClick={() => chooseCategory('Sports')}>Sports</button>
				<button onClick={() => chooseCategory('History')}>History</button>
				<button onClick={goToLobby}
				disabled={categories.length === 0}>
					Next
				</button>
			</div>}
		</div>
	)
};