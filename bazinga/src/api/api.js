import axios from 'axios';
import socketIOClient from "socket.io-client";

const baseUrl = 'http://localhost:4000';

export const axiosInstance = axios.create({
	baseURL: baseUrl
});

axiosInstance.interceptors.response.use(response => {
	return response.data;
}, error => {
	return Promise.reject(error);
});

export const socket = socketIOClient('http://localhost:4000');



