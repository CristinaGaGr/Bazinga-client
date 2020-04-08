export const initialState = {
	user: undefined,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'USER_RESPONSE':
			return {
				...state,
				user: action.payload
			};
		default:
			return state;
	}
};