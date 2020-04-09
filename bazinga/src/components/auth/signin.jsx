import React from 'react';
import './auth.scss'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


export const SignIn = () => {
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => console.log(data);
	console.log(errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="Username" ref={register({required: true})} />
			<input type="text" placeholder="Password" name="Password" ref={register({required: true, min: 6})} />

			<Link to={'/'}>Sign In</Link>
		</form>
	);
};