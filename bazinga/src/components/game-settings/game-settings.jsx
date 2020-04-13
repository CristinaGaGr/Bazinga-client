import React, { useState } from 'react';
import styles from './game-settings.module.scss';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../api/game.api';
import { useGlobalContext } from '../../context/context';
import { setGameAction } from '../../context/actions';
import { categoriesArray, difficultyArray, numberOfQuestionsArray } from '../../constants/setting.constants';
import { CategoryButton } from './components/category-button';
import { animated } from 'react-spring';
import { useHorizontalTransition } from '../../constants/animations.constants';


const Screen1 = ({style, numberOfQuestions, setNumberOfQuestions, nextScreen, screen}) => {
	return (
		<animated.div style={{...style}}
					  className={styles.container}>
			<div className={styles.slides}>{screen}/3</div>
			<div className={styles.title}>Number of questions?</div>
			<div className={styles.buttonsContainer}>
				{numberOfQuestionsArray.map(e =>
					<button key={e}
							className={'btn'}
							onClick={() => setNumberOfQuestions(e)}>
						{e}
					</button>
				)}
			</div>
			<button className={`btn-next ${styles.next}`}
					onClick={nextScreen}
					disabled={numberOfQuestions === 0}>
				Next
			</button>
		</animated.div>
	)
};


const Screen2 = ({style, setDifficulty, nextScreen, difficulty, screen}) => {
	return (
		<animated.div style={{...style}}
					  className={styles.container}>
			<div className={styles.slides}>{screen}/3</div>
			<div className={styles.title}>Difficulty?</div>
			<div className={styles.buttonsContainer}>
				{difficultyArray.map(e =>
					<button key={e.value}
							className={'btn'}
							onClick={() => setDifficulty(e.value)}>
						{e.label}
					</button>
				)}
			</div>
			<button className={`btn-next ${styles.next}`}
					onClick={nextScreen}
					disabled={difficulty === ''}>
				Next
			</button>
		</animated.div>
	)
};

const Screen3 = ({style, categories, chooseCategory, goToLobby, screen}) => {
	return (
		<animated.div style={{...style}}
					  className={styles.container}>
			<div className={styles.slides}>{screen}/3</div>
			<div className={styles.title}>Categories?</div>
			<div className={styles.categoriesContainer}>
				{categoriesArray.map(e =>
					<CategoryButton key={e.value}
									{...e}
									selectedCategories={categories}
									chooseCategory={chooseCategory}/>
				)}
				<button className={`btn-next`} onClick={goToLobby}
						disabled={categories.length === 0}>
					Next
				</button>
			</div>
		</animated.div>
	)
};

export const GameSettings = () => {
	const history = useHistory();
	const [screen, setScreen] = useState(1);
	const [numberOfQuestions, setNumberOfQuestions] = useState(0);
	const [difficulty, setDifficulty] = useState('');
	const [categories, setCategories] = useState([]);

	const [{user}, dispatch] = useGlobalContext();

	const chooseCategory = (category) => {
		if (category === 'all') {
			setCategories(categoriesArray.filter(e => e.value !== 'all').map(e => e.value));
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
			history.push('/game');
		})
	};

	const nextScreen = () => {
		setTimeout(() => {
			setScreen(screen + 1);
		}, 200);
	};

	const transitions = useHorizontalTransition(screen);

	return (
		<div>
			{transitions.map(({item, props, key}) => {
				switch (item) {
					case 1:
						return <Screen1 style={props}
										screen={screen}
										key={key}
										setNumberOfQuestions={setNumberOfQuestions}
										numberOfQuestions={numberOfQuestions}
										nextScreen={nextScreen}
						/>;
					case 2:
						return <Screen2 style={props}
										screen={screen}
										key={key}
										setDifficulty={setDifficulty}
										nextScreen={nextScreen}
										difficulty={difficulty}
						/>;
					case 3:
						return <Screen3 style={props}
										screen={screen}
										key={key}
										categories={categories}
										chooseCategory={chooseCategory}
										goToLobby={goToLobby}/>;
					default:
						return <></>
				}
			})}
		</div>
	)
};