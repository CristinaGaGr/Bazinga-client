export const initialState = {
	gameId: null,
	pinCode: null,
	owner: false,
	error: ''
};

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_GAME_RESPONSE':
			return {
				...state,
				gameId: action.payload.gameId,
				pinCode: action.payload.pinCode,
				owner: action.payload.owner
			};
		case 'SET_JOIN_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};