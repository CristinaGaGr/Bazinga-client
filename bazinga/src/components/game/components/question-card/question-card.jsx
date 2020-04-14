import React, { useEffect, useRef, useState } from 'react';
import styles from './question-card.module.scss';
import { useSpring, animated as a } from 'react-spring'
import { categoriesArray } from '../../../../constants/setting.constants';
import { socket } from '../../../../api/api';



const CardA = ({img, category}) => {
	return (
		<div className={styles.a}>
			<img src={img} alt={'category-icon'}/>
			<div>{category}</div>
		</div>
	)
};


const CardB = ({img, question, flipped}) => {
	const [selectedOption, setSelectedOption] = useState('');
	const [initialTime, setInitialTime] = useState(null);
	const [timeEnd, setTimeEnd] = useState(false);

	const [correctAnswer, setCorrectAnswer] = useState('');

	const sendAnswer = (answer) => {
		setTimeEnd(true);
		const finalTime = new Date();
		const resultTime = finalTime - initialTime;
		setSelectedOption(answer);
		socket.emit('/answer', question.id, answer, resultTime);
	};

	const getOptionLabel = (index) => {
		switch (index) {
			case 0:
				return 'A';
			case 1:
				return 'B';
			case 2:
				return 'C';
			default:
				return 'D'
		}
	};

	useEffect(() => {
		socket.on('/correct-answer', (res) => {
			setCorrectAnswer(res);
		})
	}, []);

	const counterEnd = () => {
		if (!selectedOption.length) {
			sendAnswer('');
		}
	};

	return (
		<div className={styles.b}>
			<div className={styles.loading}>
				<div className={styles.counter}
					 onAnimationStart={() => setInitialTime(new Date())}
					 onAnimationEnd={counterEnd}/>
			</div>
			<div className={styles.questionCard}>
				<img src={img} alt={'category-icon'} className={styles.categoryImg}/>
				<div className={styles.question}
					 dangerouslySetInnerHTML={{__html: question.question}}/>
				<div className={styles.options}>
					{question.options.map((e, i) =>
						{
							const isSelected = e === selectedOption;
							const isCorrect = e === correctAnswer;
							return <button key={e}
								className={
									`${styles.option} 
									${isCorrect && isSelected && styles.correctOption}
									${correctAnswer.length && isSelected && !isCorrect && styles.wrongOption}
									`
								}
								onClick={() => sendAnswer(e)}
								disabled={timeEnd || !flipped}>
							<div className={styles.label}>
								{getOptionLabel(i)}
							</div>
							<span dangerouslySetInnerHTML={{__html: e}}/>
							<div className={
								`${styles.check}
								 ${correctAnswer.length && (isSelected || isCorrect) ? styles.showCorrect : ''}
								 ${correctAnswer.length && isCorrect ? styles.correct : styles.wrong}`
							}>
								{isCorrect &&
								<img src={process.env.PUBLIC_URL + '/assets/images/check.png'} alt={'correct'}/>}
								{correctAnswer.length && !isCorrect &&
								<img src={process.env.PUBLIC_URL + '/assets/images/cross.png'} alt={'correct'}/>}
							</div>

							{(selectedOption.length && selectedOption !== e && !isCorrect) ?
							<div className={styles.disabled}/> : <></>}
						</button>}
					)}
				</div>
			</div>
		</div>
	)
};

export const QuestionCard = ({style, question}) => {
	const [img, setImg] = useState('');
	const [category, setCategory] = useState('');
	const [flipped, set] = useState(false);
	const {transform, opacity} = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(100vh) rotateY(${flipped ? 180 : 0}deg)`,
		config: {mass: 5, tension: 500, friction: 80}
	});

	useEffect(() => {
		setTimeout(() => {
			set(state => !state);
		}, 2000)
	}, []);


	useEffect(() => {
		const found = categoriesArray.find((e) => e.value === question.category);
		setImg(found.imgSrcM);
		setCategory(found.label);
	}, [question]);

	return (
		<a.div style={{...style}}>
			<a.div className={styles.card}
				   style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
				<CardA img={img} category={category}/>
			</a.div>
			<a.div className={styles.card}
				   style={{opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`)}}>
				<CardB img={img} question={question} flipped={flipped}/>
			</a.div>
		</a.div>
	)
};