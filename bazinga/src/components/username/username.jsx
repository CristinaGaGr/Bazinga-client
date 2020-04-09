import React from 'react';
import './username.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useStateValue } from '../../context/context';

export const Username = () => {
	const history = useHistory();
	const [{user}, dispatch] = useStateValue();
	const {from} = useParams();

	const goToGame = () => {
		if (from === 'create') {
			history.push('/set');
		} else {
			history.push('/lobby');
		}
	};

	return (
		<form>

			{(!user) &&
			<>
				<label>Username</label>
				<input type={'text'} name={'username'} placeholder={'Write your username'}/>
			</>
			}

			{(from === 'join') &&
			<input type={'number'} name={'pincode'} placeholder={'Enter Pin Code'}/>
			}


			<button onClick={goToGame}>Go</button>
		</form>
	)
};