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
	const { register, handleSubmit } = useForm();
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
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="username" ref={register({required: true})} />
			<input type="email" placeholder="Email" name="email" ref={register} />
			<input type="text" placeholder="Password" name="password" ref={register({required: true, min: 6})} />
			<input type="text" placeholder="Repeat Password" name="repeatPassword" ref={register} />

			<button className={'btn'} type={'submit'}>Sign Up</button>
		</form>
	)
};