import React, { useEffect, useState } from 'react';
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


const CardB = ({img, question}) => {

	const [selectedOption, setSelectedOption] = useState('');

	const sendAnswer = (answer) => {
		setSelectedOption(answer);
		socket.emit('/answer', question.id, answer, 4000)
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
		socket.on('/correct-answer', () => {

		})
	});

	const counterEnd = () => {
		if (!selectedOption.length) {
			sendAnswer('');
		}
	};

	return (
		<div className={styles.b}>
			<div className={styles.loading}>
				<div className={styles.counter} onAnimationEnd={counterEnd}/>
			</div>
			<div className={styles.questionCard}>
				<img src={img} alt={'category-icon'}/>
				<div className={styles.question}
					 dangerouslySetInnerHTML={{__html: question.question}}/>
				<div className={styles.options}>
					{question.options.map((e, i) =>
						<button key={e}
								className={styles.option}
								onClick={() => sendAnswer(e)}
								disabled={(selectedOption.length && selectedOption !== e)}>
							<div className={styles.label}>{getOptionLabel(i)}</div>
							<span dangerouslySetInnerHTML={{__html: e}}/>
							{(selectedOption.length && selectedOption !== e) ?
								<div className={styles.disabled}/> : <></>}
						</button>
					)}
				</div>
			</div>
		</div>
	)
};

export const QuestionCard = ({style, className, question}) => {
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
		<a.div style={{...style}} className={className}>
			<a.div className={styles.card}
				   style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
				<CardA img={img} category={category}/>
			</a.div>
			<a.div className={styles.card}
				   style={{opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`)}}>
				<CardB img={img} question={question}/>
			</a.div>
		</a.div>
	)
};