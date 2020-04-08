
export const setUserAction = (user) => {
	return {
		type: 'USER_RESPONSE',
		payload: user
	}
};

export const setLoadingAction = (isLoading) => {
	return {
		type: 'LOADING',
		payload: isLoading
	}
};

export const setChildToParentAction = (childToParent) => {
	return {
		type: 'MODIFY_PARENT',
		payload: childToParent
	}
};