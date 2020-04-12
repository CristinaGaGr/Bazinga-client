import React, { useEffect, useState } from 'react';
import styles from '../game-settings.module.scss';


export const CategoryButton = ({value, label, imgSrc, chooseCategory, selectedCategories}) => {
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