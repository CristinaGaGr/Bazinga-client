import React, { useEffect, useState } from 'react';
import './ranking.scss';
import { useTransition, animated } from 'react-spring'
import shuffle from 'lodash/shuffle'

const data =  [
	{
		name: 'Rare Wind',
		description: '#a8edea → #fed6e3',
		css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
		height: 150
	},
	{
		name: 'Saint Petersburg',
		description: '#f5f7fa → #c3cfe2',
		css: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
		height: 150
	},
	{
		name: 'Deep Blue',
		description: '#e0c3fc → #8ec5fc',
		css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
		height: 200
	},
	{
		name: 'Ripe Malinka',
		description: '#f093fb → #f5576c',
		css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		height: 140
	},
	{
		name: 'Near Moon',
		description: '#5ee7df → #b490ca',
		css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
		height: 200
	},
	{
		name: 'Wild Apple',
		description: '#d299c2 → #fef9d7',
		css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
		height: 150
	},
	{
		name: 'Ladoga Bottom',
		description: '#ebc0fd → #d9ded8',
		css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
		height: 160
	},
	{
		name: 'Sunny Morning',
		description: '#f6d365 → #fda085',
		css: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
		height: 140
	},
	{
		name: 'Lemon Gate',
		description: '#96fbc4 → #f9f586',
		css: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
		height: 200
	}
]



export const Ranking = () => {
	const [rows, set] = useState(data);

	useEffect(() => void setInterval(() => set(shuffle), 2000), []);
	let height = 0;
	const transitions = useTransition(
		rows.map(data => ({ ...data, y: (height += data.height) - data.height })),
		d => d.name,
		{
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height }) => ({ y, height, opacity: 1 }),
			update: ({ y, height }) => ({ y, height })
		}
	);

	return (
		<div class="list" style={{height}}>
			{transitions.map(({item, props: {y, ...rest}, key}, index) => (
				<animated.div
					key={key}
					class="card"
					style={{
						zIndex: data.length - index,
						transform: y.interpolate(y => `translate3d(0,${y}px,0)`), ...rest
					}}>
					<div class="cell">
						<div class="details" style={{backgroundImage: item.css}}/>
					</div>
				</animated.div>
			))}
		</div>

	)
};