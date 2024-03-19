import { useCallback, useState } from 'react';
import './App.css';
import SetsComponent from './SetsComponent';
import ExerciseSearchComponent from './ExerciseSearchComponent';
import { Dropdown } from 'antd';

function App() {
  const [goal, setGoal] = useState();
  const [group, setGroup] = useState();
  const [sets, setSets] = useState([
    {
      closed: false,
      showReps: false,
      reps: 2,
      exercises: [
        [
          {
            name: 'Жим штангой',
            weight: '80',
            repsCount: 3,
          },
          {
            name: 'Планка',
            leadTime: '02:30',
          },
        ],
        [
          {
            name: 'Жим штангой',
            weight: '80',
            repsCount: 3,
          },
          {
            name: 'Планка',
            leadTime: '02:30',
          },
        ],
      ],
    },
  ]);
  const [selectedSet, setSelectedSet] = useState();
  const [editedExercise, setEditedExercise] = useState();

  const goalItems = [
    {
      key: '1',
      label: (
        <span
          onClick={() => {
            setGoal('Похудение');
          }}
        >
          Похудение
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            setGoal('Набор веса');
          }}
        >
          Набор веса
        </span>
      ),
    },
  ];
  const groupItems = [
    {
      key: '1',
      label: (
        <span
          onClick={() => {
            setGroup('Ноги');
          }}
        >
          Ноги
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span
          onClick={() => {
            setGroup('Руки');
          }}
        >
          Руки
        </span>
      ),
    },
  ];
  const toggleClose = (close, index) => {
    const newSets = sets.slice(0);
    newSets[index].closed = close;
    setSets(newSets);
  };

  const toggleShowReps = (showReps, index) => {
    const newSets = sets.slice(0);
    newSets[index].showReps = showReps;
    setSets(newSets);
  };

  const updateExcercise = (field, value, exIndex, repIndex, setIndex) => {
    console.log(field, value, exIndex, repIndex, setIndex);
    const newSets = sets.slice(0);
    if (!newSets[setIndex].showReps || field === 'name') {
      newSets[setIndex].exercises.forEach((s, i) => {
        newSets[setIndex].exercises[i][exIndex][field] = value;
      });
    } else {
      newSets[setIndex].exercises[repIndex][exIndex][field] = value;
    }
    setSets(newSets);
  };

  const deleteExercise = useCallback((setIndex, exIndex) => {
    const newSets = sets.slice(0);
    newSets[setIndex].exercises.forEach((t, i) => {
      newSets[setIndex].exercises[i].splice(exIndex, 1);
    });
    setSets(newSets);
  }, []);

  const addExercise = useCallback(
    (e) => {
      const newSets = sets.slice(0);
      const newExercise = {
        name: e.title,
      };
      if (e.parameters.includes('weight')) newExercise.weight = '40кг';
      if (e.parameters.includes('repsCount')) newExercise.repsCount = 1;
      if (e.parameters.includes('leadTime')) newExercise.leadTime = '02:30';
      const i = selectedSet;
      console.log(i, newSets, e.parameters, newExercise);
      if (editedExercise !== undefined) {
        newSets[i].exercises.forEach((t, j) => {
          newSets[i].exercises[j][editedExercise] = newExercise;
        });
      } else {
        newSets[i].exercises.forEach((t, j) => {
          newSets[i].exercises[j].push(newExercise);
        });
      }
      setSets(newSets);
      setSelectedSet(undefined);
      setEditedExercise(undefined);
    },
    [sets, selectedSet],
  );

  const addSet = useCallback(() => {
    const newSets = sets.slice(0);
    newSets.push({
      closed: false,
      showReps: false,
      reps: 1,
      exercises: [[]],
    });
    setSets(newSets);
  }, [sets]);

  const deleteSet = useCallback(
    (i) => {
      const newSets = sets.slice(0);
      newSets.splice(i, 1);
      setSets(newSets);
    },
    [sets],
  );

  const setRepsCount = useCallback(
    (i, c) => {
      const newSets = sets.slice(0);
      const l = newSets[i].reps;
      newSets[i].reps = c;
      console.log(i, c, l, sets);
      if (l > c) {
        newSets[i].exercises = newSets[i].exercises.slice(0, c);
      } else {
        let t = l;
        while (t < c) {
          newSets[i].exercises.push(newSets[i].exercises[0].slice(0));
          t++;
        }
      }
      setSets(newSets);
    },
    [sets],
  );

  return (
    <>
      <div className="container">
        <div className="title">новая тренировка</div>
        <div>
          <input
            className="title_input"
            placeholder="Введите название тренировки"
          />
        </div>
        <div className="top_selectors">
          <div className="goal">
            <span> цель: </span>
            <Dropdown
              menu={{
                items: goalItems,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>{goal || 'Выбрать'}</a>
            </Dropdown>
          </div>
          <div className="group">
            <span> Группа: </span>
            <Dropdown
              menu={{
                items: groupItems,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>{group || 'Выбрать'}</a>
            </Dropdown>
          </div>
        </div>
        <SetsComponent
          sets={sets}
          toggleClose={toggleClose}
          toggleShowReps={toggleShowReps}
          updateExcercise={updateExcercise}
          setSelectedSet={setSelectedSet}
          deleteExercise={deleteExercise}
          deleteSet={deleteSet}
          setRepsCount={setRepsCount}
          setEditedExercise={setEditedExercise}
        />
        <div>
          <a
            role="button"
            href="#"
            onClick={() => {
              addSet();
            }}
            className="add_set_button"
          >
            + Добавить новый сет
          </a>
        </div>
      </div>
      {selectedSet !== undefined && (
        <ExerciseSearchComponent
          setSelectedSet={setSelectedSet}
          addExercise={addExercise}
        />
      )}
    </>
  );
}

export default App;
