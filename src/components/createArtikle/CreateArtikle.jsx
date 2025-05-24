import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import style from './CreateArtikle.module.scss';
import { useCreateArticleMutation, useGetCurrentUserQuery } from '../Api/artikleApi';

function CreateArtikle() {
  const { isError, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [{ value: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const [сreateArticle] = useCreateArticleMutation();

  useEffect(() => {
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, [isError, navigate, isLoading]);

  const onSubmit = async (dat) => {
    try {
      const dataTags = dat.tags.map((elem) => {
        return elem.value;
      });
      const userData = {
        title: dat.title,
        description: dat.description,
        body: dat.text,
        tagList: dataTags,
      };
      const res = await сreateArticle(userData).unwrap();
      navigate(`/articles/${res.article.slug}`);
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
        <p className={style.title}>Create new article</p>
      </div>
      <form className={style.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Title</p>
          <input
            className={`${style.Username} ${errors.username ? style.errorBorder : ''}`}
            placeholder="Title"
            {...register('title', {
              required: 'Введите текст статьи',
            })}
          />
          {errors.title && <p>{errors.title?.message}</p>}
        </label>
        <label>
          <p>Short description</p>
          <input
            className={errors.email ? style.errorBorder : ''}
            placeholder="Title"
            {...register('description', {
              required: 'Введите описание',
            })}
          />
          {errors.description && <p>{errors.description?.message}</p>}
        </label>
        <label>
          <p>Text</p>
          <textarea
            className={errors.password ? style.errorBorder : ''}
            placeholder="Text"
            {...register('text', {
              required: 'Введите текст',
            })}
          />
          {errors.text && <p>{errors.text?.message}</p>}
        </label>
        <div className={style.tagg}>
          <p className={style.taggs}>Tags</p>
        </div>

        {fields.map((field, index) => (
          <label key={field.id} className={style.tagBox}>
            <input
              className={style.inpTag}
              placeholder="Tag"
              {...register(`tags.${index}.value`)}
            />
            <button
              type="button"
              onClick={() => {
                remove(index);
                if (fields.length === 1) {
                  append({ value: '' });
                }
              }}
              className={style.inpTagButton}
            >
              Delete
            </button>
            {index === fields.length - 1 && (
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className={style.inpTagButtonAdd}
              >
                Add tag
              </button>
            )}
          </label>
        ))}
        <input type="submit" value="Send" className={style.submit} />
      </form>
    </div>
  );
}

export default CreateArtikle;
