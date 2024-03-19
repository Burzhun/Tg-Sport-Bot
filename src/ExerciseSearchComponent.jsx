import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { clearInputIcon } from './icons';
import { LoadExercises, LoadLastExercises } from './api';

function ExerciseSearchComponent({ addExercise, setSelectedSet }) {
  const [last, setLast] = useState([]);
  const [found, setFound] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const t = await LoadLastExercises();
      console.log(t);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (search) {
        const res = await LoadExercises(search);
        if (res.exercises) {
          setFound(res.exercises);
        }
      }
    })();
  }, [search]);

  return (
    <div className="exercise-search">
      <div className="search">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        <span
          onClick={() => {
            setSearch('');
          }}
        >
          {clearInputIcon}
        </span>
        <Button
          onClick={() => {
            setSelectedSet(undefined);
          }}
        >
          закрыть
        </Button>
      </div>
      {!search && (
        <div className="search_result">
          <div className="search_result_title">
            Ранее использованные упражнения:
          </div>
          {last.map((e) => (
            <div
              className="search_result_name"
              onClick={() => {
                addExercise(e);
              }}
            >
              {e.title}
            </div>
          ))}
        </div>
      )}
      {search && (
        <div className="search_result">
          <div className="search_result_title">Найденные упражнения:</div>
          {found.map((e, i) => (
            <div
              className="search_result_name"
              onClick={() => {
                addExercise(e);
              }}
            >
              {i + 1}. {e.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseSearchComponent;
