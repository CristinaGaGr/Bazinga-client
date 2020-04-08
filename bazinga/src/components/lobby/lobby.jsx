import React, { useRef } from 'react';
import './lobby.scss';
import { Link } from 'react-router-dom';



export const Lobby = () => {

	const pinCode = useRef(null);

	const copy = () => {
		pinCode.current.select();
		navigator.clipboard.writeText(pinCode.current.value);
	};

	return (
		<div>
				<div>
					<h4>Coy and share:</h4>
					<input ref={pinCode} type={'text'} value={'1 2 3 4'} disabled={true}/>
					<button onClick={copy}>Copy</button>
				</div>
			<h2>Your friends:</h2>
			<ul>
				<li>Player1</li>
				<li>Player2</li>
				<li>Player3</li>
				<li>Player4</li>
				<li>Player5</li>
			</ul>
			<Link to={'/game'}>Start Game!</Link>
		</div>
	)
};