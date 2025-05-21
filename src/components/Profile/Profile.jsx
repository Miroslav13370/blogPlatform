import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import style from './Profile.module.scss';
import { useChangeProfileMutation, useGetCurrentUserQuery } from '../Api/artikleApi';

function Profile() {
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
  const [changeProfile] = useChangeProfileMutation();

  useEffect(() => {
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, [isError, navigate, isLoading]);

  const onSubmit = async (dat) => {
    try {
      console.log(dat.username);
      const userData = {
        username: dat.username,
        email: dat.email,
        password: dat.password,
        image: dat.url,
      };
      const result = await changeProfile(userData).unwrap();
      navigate('/', { replace: true });
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
      if (apiErrors?.username) {
        setError('url', {
          type: 'server',
          message: apiErrors.username,
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
        <p className={style.title}>Edit Profile</p>
      </div>
      <form className={style.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Username</p>
          <input
            className={`${style.Username} ${errors.username ? style.errorBorder : ''}`}
            placeholder="Username"
            {...register('username', {
              required: 'Введите имя пользователя',
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
          <p>Avatar image (url)</p>
          <input
            className={`${errors.username ? style.errorBorder : ''}`}
            placeholder="Вставьте ссылку"
            {...register('url', {
              required: 'Ссылка обязательна',
              pattern: {
                value: /^(https?:\/\/)([\w.-]+\.[a-z]{2,})(\/[^\s]*)?$/i,
                message: 'Введите корректный URL',
              },
            })}
          />
          {errors.url && <p>{errors.url.message}</p>}
        </label>
        <input type="submit" value="Save" className={style.submit} />
      </form>
    </div>
  );
}

export default Profile;
