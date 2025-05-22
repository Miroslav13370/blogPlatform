import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import style from './Profile.module.scss';
import { useChangeProfileMutation, useGetCurrentUserQuery } from '../Api/artikleApi';

function Profile() {
  const { isError, isLoading, data } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [changeProfile] = useChangeProfileMutation();

  useEffect(() => {
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }

    if (data) {
      reset({
        email: data.user.email,
        username: data.user.username,
        url: data.user.image,
      });
    }
  }, [isError, navigate, isLoading]);

  const onSubmit = async (dat) => {
    try {
      const userData = {
        username: dat.username,
        email: dat.email,
        password: dat.password,
        image: dat.url,
      };
      const userData2 = {
        username: dat.username,
        email: dat.email,
        image: dat.url,
      };
      const result = await changeProfile(dat.password ? userData : userData2).unwrap();
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
                value: /^\S{1,}@(gmail|yahoo|yandex|mail|outlook|protonmail)\.(com|ru|org|net)$/i,
                message: 'Неверный email',
              },
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </label>
        <label>
          <p>New password</p>
          <input
            type="password"
            className={errors.password ? style.errorBorder : ''}
            placeholder="New password"
            {...register('password', {
              validate: (value) => {
                if (!value) return true;
                if (value.length < 6) return 'Минимум 6 символов';
                if (value.length > 20) return 'Максимум 20 символов';
                return true;
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label>
          <p>Avatar image (url)</p>
          <input
            className={`${errors.url ? style.errorBorder : ''}`}
            placeholder="Вставьте ссылку"
            {...register('url', {
              validate: (value) => {
                if (!value) return true; // пусто — ок
                const pattern = /^(https?:\/\/)([\w.-]+\.[a-z]{2,})(\/[^\s]*)?$/i;
                return pattern.test(value) || 'Введите корректный URL';
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
