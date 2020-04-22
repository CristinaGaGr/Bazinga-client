export const setUserActionRequest = () => {
	return {
		type: 'USER_REQUEST'
	}
};

export const setUserActionResponse = (user) => {
	return {
		type: 'USER_RESPONSE',
		payload: user
	}
};

