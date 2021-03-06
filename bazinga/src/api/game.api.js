import { axiosInstance } from './api';

export const createGame = (username, numberOfQuestions, difficulty, categories) => {
	return axiosInstance.post('/game', {username, numberOfQuestions, difficulty, categories});
};

export const joinGame = (username, pin) => {
	return axiosInstance.post('/game/join', {username, pin});
};


export const checkGame = (username, pin) => {
	return axiosInstance.get('/game/check', {params: {username, pin}});
};
