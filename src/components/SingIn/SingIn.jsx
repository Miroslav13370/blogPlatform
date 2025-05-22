import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import style from './SingIn.module.scss';
import { useLoginMutation, useGetCurrentUserQuery } from '../Api/artikleApi';

function SingIn() {
  const { isError, data: currentData = [], isLoading } = useGetCurrentUserQuery();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [loginUser] = useLoginMutation();
  useEffect(() => {
    if (!isError && localStorage.getItem('token')) {
      navigate('/');
    }
  }, [isError, navigate, isLoading]);

  const onSubmit = async (dat) => {
    try {
      const userData = {
        email: dat.email,
        password: dat.password,
      };
      const result = await loginUser(userData).unwrap();
      localStorage.setItem('token', result.user.token);
      navigate('/');
    } catch (err) {
      const apiErrors = err.data?.errors['email or password'];
      console.log(apiErrors);
      console.log('Ошибка запроса:', err);
      if (apiErrors) {
        setError('email', {
          type: 'server',
          message: apiErrors,
        });
        setError('password', {
          type: 'server',
          message: apiErrors,
        });
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && !errors[name]) {
        clearErrors(name);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, errors, clearErrors]);

  return (
    <div className={style.loginBox}>
      <div className={style.titleBox}>
        <p className={style.title}>Sign In</p>
      </div>
      <form className={style.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Email address</p>
          <input
            type="email"
            className={errors.email ? style.errorBorder : ''}
            placeholder="Email address"
            {...register('email', {
              required: 'Введите email',
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            className={errors.password ? style.errorBorder : ''}
            placeholder="Password"
            {...register('password', {
              required: 'Пароль обязателен',
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <input type="submit" value="Login" className={style.submit} />
      </form>
      <div className={style.SignIn}>
        <p>Don’t have an account?</p>{' '}
        <Link to="/sign-up" className={style.Link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
}

export default SingIn;
