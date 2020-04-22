export const initialState = {
	user: undefined,
	firstLoad: false,
};


export const coreReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_RESPONSE':
			return {
				...state,
				user: action.payload,
				firstLoad: true
			};
		default:
			return state;
	}
};

