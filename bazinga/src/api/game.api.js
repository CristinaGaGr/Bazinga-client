import { axiosInstance } from './api';

export const createGame = (username) => {
	return axiosInstance.post('/game', {username});
};

export const joinGame = (username, pin) => {
	return axiosInstance.post('/game/join', {username, pin});
};