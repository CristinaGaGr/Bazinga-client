export const initialState = {
	user: undefined,
	firstLoad: false,
	gameId: null,
	pinCode: null,
	fromJoin: false
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
		case 'FROM_JOIN':
			return {
				...state,
				fromJoin: true
			};
		default:
			return state;
	}
};