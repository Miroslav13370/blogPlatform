import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import style from './ChangeArtikle.module.scss';
import {
  useGetCurrentUserQuery,
  useGetArticleBySlagQuery,
  useChangeArticleMutation,
} from '../Api/artikleApi';

function ChangeArtikle() {
  const { slug } = useParams();
  const [changeArticle] = useChangeArticleMutation();
  const { data } = useGetArticleBySlagQuery({ slug }, { skip: !slug });
  const {
    isError,
    isLoading,
    data: userDatas,
  } = useGetCurrentUserQuery(undefined, {
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
    reset,
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

  useEffect(() => {
    if (isError || !localStorage.getItem('token')) {
      navigate('/sign-in');
    }
    if (data && userDatas && data?.article?.author?.username !== userDatas?.user?.username) {
      navigate(`/articles/${slug}`);
    }

    let tegs = data?.article?.tagList;
    if (tegs?.length === 0 && data) {
      tegs = [''];
    }
    if (data) {
      reset({
        title: data.article.title,
        description: data.article.description,
        text: data.article.body,
        tags: tegs.map((tag) => ({ value: tag })),
      });
    }
  }, [isError, navigate, isLoading, data, reset, userDatas]);

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
      await changeArticle({ userData, slug }).unwrap();
      navigate(`/articles/${slug}`);
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
        <p className={style.title}>Edit article</p>
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

export default ChangeArtikle;
