import React, { useEffect, useState } from 'react';
import styles from './question-card.module.scss';
import { useSpring, animated as a } from 'react-spring'
import { Question } from '../question/question';
import { categoriesArray } from '../../../../constants/setting.constants';


const CardA = ({img, category}) => {
	return (
		<div>
			<img src={img} alt={'category-icon'}/>
			<div>{category}</div>
		</div>
	)
};


const CardB = ({img, question}) => {
	return (
		<div>
			<img src={img} alt={'category-icon'}/>
			<div dangerouslySetInnerHTML={{__html: question.question}}/>
			<div>{question.options.map((e) =>
					<button key={e}>
						<span dangerouslySetInnerHTML={{__html: e}}/>
					</button>
				)}
			</div>
		</div>
	)
};

export const QuestionCard = ({question}) => {
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
		}, 3000)
	}, []);


	useEffect(() => {
		const found = categoriesArray.find((e) => e.value === question.category);
		setImg(found.imgSrc);
		setCategory(found.label);
	}, [question]);

	return (
		<div>
			<a.div className={styles.card} style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
				<CardA img={img} category={category}/>
			</a.div>
			<a.div className={styles.card}
				   style={{opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`)}}>
				<CardB img={img} question={question}/>
			</a.div>
		</div>
	)
};