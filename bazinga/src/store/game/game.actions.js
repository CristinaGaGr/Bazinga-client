export const createGameRequest = (user, numberOfQuestions, difficulty, categories) => {
	return {
		type: 'CREATE_GAME_REQUEST',
		payload: {
			user,
			numberOfQuestions,
			difficulty,
			categories
		}
	}
};


export const createGameResponse = (pin, game_id) => {
	return {
		type: 'CREATE_GAME_RESPONSE',
		payload: {
			pin,
			game_id
		}
	}
};


export const joinGameRequest = (username, pin) => {
	return {
		type: 'JOIN_GAME_REQUEST',
		payload: {
			username,
			pin
		}
	}
};


export const joinGameResponse = (pin, game_id) => {
	return {
		type: 'JOIN_GAME_RESPONSE',
		payload: {
			pin,
			game_id
		}
	}
};


export const setJoinError = (error) => {
	return {
		type: 'SET_JOIN_ERROR',
		payload: error
	}
};