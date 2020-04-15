import React, { useState } from 'react';
import styles from './auth.module.scss'
import { useForm } from 'react-hook-form';
import { signin } from '../../api/auth.api';
import { useGlobalContext } from '../../context/context';
import { setUserAction } from '../../context/actions';
import { useHistory } from 'react-router-dom';


export const SignIn = () => {
	const history = useHistory();
	const [{}, dispatch] = useGlobalContext();
	const {register, handleSubmit, errors} = useForm();
	const [error, setError] = useState('');

	const onSubmit = data => {
		const {username, password} = data;
		signin(username, password)
			.then((res) => {
				dispatch(setUserAction(res));
				history.push('/');
			})
			.catch((e) => setError(e.response.data.error));
	};

	return (
		<div className={'container'}>
			<button className={styles.back} onClick={() => history.push('/')}><img
				src={process.env.PUBLIC_URL + '/assets/images/back-arrow.png'} alt={'back-arrow'}/></button>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
				<div className={styles.inputContainer}>
					<input type="text" placeholder="Username" name="username" ref={register({required: true})}/>
					{errors.Username && <span
						className={styles.errorMessage}>{errors.Username.message ? errors.Username.message : 'this field is required'}</span>}
				</div>
				<div className={styles.inputContainer}>
					<input type="password" placeholder="Password" name="password"
						   ref={register({required: true, min: 6})}/>
					{errors.Password && <span
						className={styles.errorMessage}>{errors.Password.message ? errors.Password.message : 'this field is required'}</span>}
				</div>
				{error.length ? <div className={styles.error}>{error}</div> : <></>}
				<button className={'btn'} type={'submit'}>Sign In</button>
			</form>
		</div>
	);
};