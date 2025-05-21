import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import style from './SignUp.module.scss';
import { useRegisterMutation, useGetCurrentUserQuery } from '../Api/artikleApi';

function SignUp() {
  const { isError, isLoading } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (!isError && localStorage.getItem('token')) {
      navigate('/');
    }
  }, [isError, navigate, isLoading]);

  const onSubmit = async (dat) => {
    try {
      const userData = {
        username: dat.username,
        email: dat.email,
        password: dat.password,
      };
      const result = await registerUser(userData).unwrap();
      localStorage.setItem('token', result.user.token);
      navigate('/sign-in');
    } catch (err) {
      const apiErrors = err.data?.errors;
      console.log('Ошибка запроса:', err);
      if (apiErrors?.email) {
        setError('email', {
          type: 'server',
          message: apiErrors.email,
        });
      }
      if (apiErrors?.username) {
        setError('username', {
          type: 'server',
          message: apiErrors.username,
        });
      }
    }
  };

  const password = watch('password');

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
        <p className={style.title}>Create new account</p>
      </div>
      <form className={style.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Username</p>
          <input
            className={`${style.Username} ${errors.username ? style.errorBorder : ''}`}
            placeholder="Username"
            {...register('username', {
              required: 'Введите имя пользователя',
              validate: (value) =>
                (value.length >= 3 && value.length <= 20) || 'Недопустимое колличество символов',
            })}
          />
          {errors.username && <p>{errors.username?.message}</p>}
        </label>
        <label>
          <p>Email address</p>
          <input
            className={errors.email ? style.errorBorder : ''}
            placeholder="Email address"
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^\S{3,}@(gmail|yahoo|yandex|mail|outlook|protonmail)\.(com|ru|org|net)$/i,
                message: 'Неверный email',
              },
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </label>
        <label>
          <p>Password</p>
          <input
            className={errors.password ? style.errorBorder : ''}
            placeholder="Password"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label>
          <p>Repeat Password</p>
          <input
            className={errors.confirmPassword ? style.errorBorder : ''}
            placeholder="Repeat Password"
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (value) => value === password || 'Пароли не совпадают',
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </label>
        <label className={style.check}>
          <input
            type="checkbox"
            className={style.checkbox}
            {...register('agree', {
              required: 'Вы должны согласиться на обработку данных',
            })}
          />
          <p>I agree to the processing of my personal information</p>
        </label>
        <input type="submit" value="Create" className={style.submit} />
      </form>
      <div className={style.SignIn}>
        <p>Already have an account?</p>
        <Link to="/sign-in" className={style.Link}>
          Sign In.
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
