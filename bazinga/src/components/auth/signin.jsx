import React from 'react';
import './auth.scss'
import { useForm } from 'react-hook-form';
import { signin } from '../../api/auth.api';
import { useStateValue } from '../../context/context';
import { setUserAction } from '../../context/actions';
import { useHistory } from 'react-router-dom';


export const SignIn = () => {
	const history = useHistory();
	const [{}, dispatch] = useStateValue();
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => {
		const {username, password} = data;
		signin(username, password)
			.then(() => {
				dispatch(setUserAction(username));
				history.push('/');
			})
			.catch((error) => console.log(error) )
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="Username" ref={register({required: true})} />
			<input type="text" placeholder="Password" name="Password" ref={register({required: true, min: 6})} />

			<button type={'submit'}>Sign In</button>
		</form>
	);
};