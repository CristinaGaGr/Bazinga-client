import React, { useRef } from 'react';
import './lobby.scss';

export const Lobby = ({pinCode, users, startGame, fromJoin}) => {
	const pinCodeRef = useRef(null);

	const copy = () => {
		pinCodeRef.current.select();
		navigator.clipboard.writeText(pinCodeRef.current.value);
	};

	return (
		<div>
			<div>
				<h4>Copy and share:</h4>
				<input ref={pinCodeRef} type={'text'} value={pinCode} disabled={true}/>
				<button onClick={copy}>Copy</button>
			</div>
			<h2>Your friends:</h2>
			<div>
				{users.map((e) =>
					<div key={e}>{e}</div>
				)}
			</div>
			{!fromJoin && <button onClick={startGame}>Start Game!</button>}
		</div>
	)
};