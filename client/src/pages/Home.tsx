import React, { Fragment, useContext, useState } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { SourceContext } from '../context/source/sourceContext';
import { Loader } from './components/loader';
import { Sources } from './components/Sources';

export const Home = () => {
  const { loading, sources, fetchSources } = useContext(SourceContext);
  const alert = useContext(AlertContext);
  const [value, setValue] = useState('');
  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    fetchSources(value).catch(() => {
      alert.show('Похоже такого сайта нет', 'danger');
    });
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Введите ссылку'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='input-group-append'>
            <button type='submit' className='btn btn-outline-secondary'>
              Поиск
            </button>
          </div>
        </div>
      </form>
      {loading ? <Loader /> : <Sources sources={sources} />}
    </Fragment>
  );
};
