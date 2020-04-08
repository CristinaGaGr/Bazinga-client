import React from 'react';
import './username.scss';
import { Link } from 'react-router-dom';

export const Username = () => {
	return (
		<form>
			<label>
				Username
				<input type={'text'} name={'username'} placeholder={'Write your username'}/>
			</label>
			<Link to={'/set'}>Go</Link>
		</form>
	)
};