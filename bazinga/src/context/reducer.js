export const initialState = {
	user: undefined,
	firstLoad: false,
	gameId: null,
	pinCode: null
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'USER_RESPONSE':
			return {
				...state,
				user: action.payload,
				firstLoad: true
			};
		case 'SET_GAME':
			return {
				...state,
				gameId: action.payload.gameId,
				pinCode: action.payload.pinCode
			};
		default:
			return state;
	}
};