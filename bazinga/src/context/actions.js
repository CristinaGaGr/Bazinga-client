
export const setUserAction = (user) => {
	return {
		type: 'USER_RESPONSE',
		payload: user
	}
};

export const setGameAction = (pinCode, gameId) => {
	return {
		type: 'SET_GAME',
		payload: {pinCode, gameId}
	}
};

export const fromJoinAction = () => {
	return {
		type: 'FROM_JOIN'
	}
};