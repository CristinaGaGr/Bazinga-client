import React from 'react';
import './auth.scss'
import { useForm } from 'react-hook-form';
import { signup } from '../../api/auth.api';
import { setUserAction } from '../../context/actions';
import { useGlobalContext } from '../../context/context';
import { useHistory } from 'react-router-dom';


export const SignUp = () => {
	const history = useHistory();
	const [{}, dispatch] = useGlobalContext();
	const { register, handleSubmit } = useForm();
	const onSubmit = data => {
		const {username, email, password, repeatPassword} = data;
		console.log(data);
		signup(username, email, password, repeatPassword)
			.then(() => {
				dispatch(setUserAction(username));
				history.push('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="username" ref={register({required: true})} />
			<input type="email" placeholder="Email" name="email" ref={register} />
			<input type="text" placeholder="Password" name="password" ref={register({required: true, min: 6})} />
			<input type="text" placeholder="Repeat Password" name="repeatPassword" ref={register} />

			<button type={'submit'}>Sign Up</button>
		</form>
	)
};