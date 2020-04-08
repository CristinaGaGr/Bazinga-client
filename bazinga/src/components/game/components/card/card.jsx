import React, { useState } from 'react';
import './card.scss';
import { useSpring, animated as a } from 'react-spring'
import { Question } from '../question/question';

export const Card = () => {
	const [flipped, set] = useState(false);
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(100vh) rotateY(${flipped ? 180 : 0}deg)`,
		config: { mass: 5, tension: 500, friction: 80 }
	});
	return (
		<div onClick={() => set(state => !state)}>
			<a.div class="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
				ICON CATEGORY
			</a.div>
			<a.div class="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}><Question/></a.div>
		</div>
	)
};