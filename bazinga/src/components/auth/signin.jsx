import React from 'react';
import styles from './auth.module.scss'
import { useForm } from 'react-hook-form';
import { signin } from '../../api/auth.api';
import { useGlobalContext } from '../../context/context';
import { setUserAction } from '../../context/actions';
import { useHistory } from 'react-router-dom';


export const SignIn = () => {
	const history = useHistory();
	const [{}, dispatch] = useGlobalContext();
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => {
		const {username, password} = data;
		signin(username, password)
			.then((res) => {
				dispatch(setUserAction(res));
				history.push('/');
			})
			.catch((error) => console.log(error) )
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Username" name="Username" ref={register({required: true})} />
			<input type="password" placeholder="Password" name="Password" ref={register({required: true, min: 6})} />

			<button className={'btn'} type={'submit'}>Sign In</button>
		</form>
	);
};