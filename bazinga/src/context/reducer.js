export const initialState = {
	user: undefined,
	firstLoad: false,
	gameId: '5e930af1dbafd7181fb368a6',
	pinCode: 9377,
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