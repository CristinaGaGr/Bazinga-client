import React, { useRef, useState } from 'react';
import styles from './lobby.module.scss';
import { animated } from 'react-spring';


export const Lobby = ({style, className, pinCode, users, startGame, fromJoin}) => {
	const [showCopied, setShowCopied] = useState(false);
	const pinCodeRef = useRef(null);
	const copy = () => {
		setShowCopied(true);
		pinCodeRef.current.select();
		navigator.clipboard.writeText(pinCodeRef.current.value);
		setTimeout(() => {
			setShowCopied(false);
		}, 2000);
	};

	return (
		<animated.div style={{...style}} className={`${className} ${styles.container}`}>
			<div className={styles.copyShare}>
				<h4>Copy and Share!</h4>
				<div className={styles.pinCopy}>
					<input ref={pinCodeRef} type={'text'} value={pinCode} disabled={true}/>
					<button onClick={copy}>
						<img src={process.env.PUBLIC_URL + '/assets/images/copy-icon.png'}/>
					</button>
					{showCopied && <div className={styles.copiedMessage}>Copied!</div>}
				</div>
			</div>
			<div className={styles.friendsConnected}>
				<h2>Players Connected</h2>
				<div className={styles.users}>
					{users.map((e) =>
						<div key={e}>
							<div className={styles.greenDot}/>
							{e}
						</div>
					)}
				</div>
			</div>
			{!fromJoin && <button className={`btn ${styles.start}`} onClick={startGame}>Start Game!</button>}
		</animated.div>
	)
};