import React from 'react';
import styles from './auth.module.scss'
import { useForm } from 'react-hook-form';
import { signup } from '../../api/auth.api';
import { setUserAction } from '../../context/actions';
import { useGlobalContext } from '../../context/context';
import { useHistory } from 'react-router-dom';


export const SignUp = () => {
	const history = useHistory();
	const [{}, dispatch] = useGlobalContext();
	const {register, handleSubmit, errors} = useForm();
	const onSubmit = data => {
		const {username, email, password, repeatPassword} = data;
		console.log(data);
		signup(username, email, password, repeatPassword)
			.then((res) => {
				dispatch(setUserAction(res));
				history.push('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<form noValidate={true} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.inputContainer}>
				<input type="text" placeholder="Username" name="username" ref={register({required: true})}/>
				{errors.username && <span
					className={styles.errorMessage}>{errors.username.message ? errors.username.message : 'this field is required'}</span>}
			</div>
			<div className={styles.inputContainer}>
				<input type="email" placeholder="Email" name="email" ref={register({
					required: true,
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'invalid email address'
					}
				})}/>
				{errors.email && <span
					className={styles.errorMessage}>{errors.email.message ? errors.email.message : 'this field is required'}</span>}
			</div>
			<div className={styles.inputContainer}>
				<input type="password" placeholder="Password" name="password"
					   ref={register({required: true, minLength: {
					   			value: 6,
							   message: 'min 6 characters'
						   }})}/>
				{errors.password && <span
					className={styles.errorMessage}>{errors.password.message ? errors.password.message : 'this field is required'}</span>}
			</div>
			<div className={styles.inputContainer}>
				<input type="password" placeholder="Repeat Password" name="repeatPassword"
					   ref={register({required: true})}/>
				{errors.repeatPassword && <span
					className={styles.errorMessage}>{errors.repeatPassword.message ? errors.repeatPassword.message : 'this field is required'}</span>}
			</div>
			<button className={'btn'} type={'submit'}>Sign Up</button>
		</form>
	)
};