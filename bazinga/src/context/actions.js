
export const setUserAction = (user) => {
	return {
		type: 'USER_RESPONSE',
		payload: user
	}
};

export const setGameAction = (pinCode, gameId, owner = false) => {
	return {
		type: 'SET_GAME',
		payload: {pinCode, gameId, owner}
	}
};

export const fromJoinAction = () => {
	return {
		type: 'FROM_JOIN'
	}
};