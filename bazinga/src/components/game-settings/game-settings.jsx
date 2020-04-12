import React, { useEffect, useState } from 'react';
import styles from './game-settings.module.scss';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../api/game.api';
import { useStateValue } from '../../context/context';
import { setGameAction } from '../../context/actions';
import { categoriesArray, difficultyArray, numberOfQuestionsArray } from '../../constants/setting.constants';


const CategoryButton = ({value, label, imgSrc, chooseCategory, selectedCategories}) => {
	const [isSelected, setIsSelected] = useState(selectedCategories.includes(value));

	useEffect(() => {
		setIsSelected(selectedCategories.includes(value));
	});

	return (
		<>
			<button className={`${styles.category} ${!imgSrc && styles.all}`}
					onClick={() => chooseCategory(value)}
					data-selected={isSelected}>
				{imgSrc && <img src={imgSrc} alt={'category'}/>}
				<span>{label}</span>
				{isSelected && <img className={styles.check}
									src={process.env.PUBLIC_URL + '/assets/images/check.png'}
									alt={'check-img'}/>}
			</button>
		</>
	)
};


export const GameSettings = () => {
	const history = useHistory();
	const [screen, setScreen] = useState(1);
	const [numberOfQuestions, setNumberOfQuestions] = useState(0);
	const [difficulty, setDifficulty] = useState('');
	const [categories, setCategories] = useState([]);

	const [{user}, dispatch] = useStateValue();

	const chooseCategory = (category) => {
		if (category === 'all') {
			setCategories(categoriesArray.map(e => e.value));
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

	const nextScreen = () => {
		setTimeout(() => {
			setScreen(screen + 1);
		}, 200);
	};


	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.slides}>{screen}/3</div>
			{screen === 1 && <>
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
			</>}
			{screen === 2 && <>
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
			</>}
			{screen === 3 && <>
				<div className={styles.title}>Categories?</div>
				<div className={styles.categoriesContainer}>
					<CategoryButton label={'All'}
									value={'all'}
									selectedCategories={categories}
									chooseCategory={chooseCategory}/>
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
			</>}
		</div>
	)
};