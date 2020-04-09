import React from 'react';
import './auth.scss'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


export const SignUp = () => {
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => console.log(data);
	console.log(errors);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="Username" ref={register({required: true})} />
			<input type="email" placeholder="Email" name="Email" ref={register} />
			<input type="text" placeholder="Password" name="Password" ref={register({required: true, min: 6})} />
			<input type="text" placeholder="Repeat Password" name="Repeat Password" ref={register} />

			<Link to={'/'}>Sign Up</Link>
		</form>
	)
};