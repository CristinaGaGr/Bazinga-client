import React, { useEffect, useState } from 'react';
import styles from './ranking.module.scss';
import { useTransition, animated } from 'react-spring'

// const data = [
// 	{
// 		user: 'Rare Wind',
// 		score: 10,
// 		_id: 1,
// 		height: 70
// 	},
// 	{
// 		user: 'Saint Petersburg',
// 		score: 2000,
// 		_id: 1,
// 		height: 70
// 	},
// 	{
// 		user: 'Deep Blue',
// 		score: 500,
// 		_id: 1,
// 		height: 70
// 	}
// ];


export const Ranking = ({style, ranking}) => {
	const [rows, set] = useState([]);

	useEffect(() => {
		set(ranking);
	}, [ranking]);

	let height = 0;
	const transitions = useTransition(
		rows.map(data => ({...data, y: (height += data.height) - data.height})),
		d => d.user,
		{
			from: {height: 0, opacity: 0},
			leave: {height: 0, opacity: 0},
			enter: ({y, height}) => ({y, height, opacity: 1}),
			update: ({y, height}) => ({y, height})
		}
	);

	return (
		<div style={{...style}} className={styles.container}>
			<div className={styles.title}>Scoreboard</div>
			<div className={styles.score}>
				{transitions.map(({item, props: {y, ...rest}, key}, index) => (
					<animated.div
						key={key}
						className={styles.card}
						style={{
							zIndex: ranking.length - index,
							transform: y.interpolate(y => `translate3d(0,${y}px,0)`), ...rest
						}}>
						<button className={'btn-category'}>
							{index + 1}. {item.user}
							<div>{item.score}</div>
						</button>
					</animated.div>
				))}
			</div>
		</div>

	)
};