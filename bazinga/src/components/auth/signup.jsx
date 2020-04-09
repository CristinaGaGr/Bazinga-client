import React from 'react';
import './auth.scss'
import { useForm } from 'react-hook-form';
import { signup } from '../../api/auth.api';
import { setUserAction } from '../../context/actions';
import { useStateValue } from '../../context/context';
import { useHistory } from 'react-router-dom';


export const SignUp = () => {
	const history = useHistory();
	const [{}, dispatch] = useStateValue();
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => {
		const {username, email, password, repeatPassword} = data;
		signup(username, email, password, repeatPassword)
			.then(() => {
				dispatch(setUserAction(username));
				history.push('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="Username" ref={register({required: true})} />
			<input type="email" placeholder="Email" name="Email" ref={register} />
			<input type="text" placeholder="Password" name="Password" ref={register({required: true, min: 6})} />
			<input type="text" placeholder="Repeat Password" name="Repeat Password" ref={register} />

			<button type={'submit'}>Sign Up</button>
		</form>
	)
};