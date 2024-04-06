import { useCallback, useEffect, useState } from 'react';
import './App.css';
import SetsComponent from './SetsComponent';
import ExerciseSearchComponent from './ExerciseSearchComponent';
import { Dropdown } from 'antd';
import { LoadTrainingTemplate, saveTrainingTemplate } from './api';

const searchParams = new URLSearchParams(window.location.search);
const trainId = searchParams.get('trainId');

const data = [
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
];

function App() {
  const [goal, setGoal] = useState();
  const [group, setGroup] = useState();
  const [template, setTemplate] = useState();
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState();
  const [editedExercise, setEditedExercise] = useState();

  useEffect(() => {
    (async () => {
      const res = await LoadTrainingTemplate(trainId);
      const sets = res.trainTemplate.sets.map((s) => {
        const exercises = [s.lap.exercises];
        if (s.lapsCount > 1) {
          const lap = [];
          for (let i = 1; i < s.lapsCount; i++) {
            console.log(s.extendedLaps[i - 1], i);
            exercises.push(
              s.extendedLaps[i - 1].values.map((v, j) => ({
                values: { ...v },
                name: s.lap.exercises[j].name,
              })),
            );
          }
        }

        return {
          closed: false,
          showReps: false,
          lapsCount: s.lapsCount,
          exercises: JSON.parse(JSON.stringify(exercises)),
        };
      });

      setSets(sets);
      setTemplate(res.trainTemplate);
    })();
  }, []);

  const goalItems = ['Похудение', 'Набор веса'].map((n, i) => ({
    key: n,
    label: (
      <span
        onClick={() => {
          setGoal(n);
        }}
      >
        {n}
      </span>
    ),
  }));

  const groupItems = ['Ноги', 'Руки'].map((n, i) => ({
    key: n,
    label: (
      <span
        onClick={() => {
          setGroup(n);
        }}
      >
        {n}
      </span>
    ),
  }));

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
    const newSets = sets.slice(0);
    if (!newSets[setIndex].showReps || field === 'name') {
      newSets[setIndex].exercises.forEach((s, i) => {
        newSets[setIndex].exercises[i][exIndex]['values'][field] = value;
      });
    } else {
      newSets[setIndex].exercises[repIndex] = JSON.parse(
        JSON.stringify(newSets[setIndex].exercises[repIndex]),
      );
      const t = newSets[setIndex].exercises[repIndex][exIndex]['values'];

      t[field] = value;

      newSets[setIndex].exercises[repIndex][exIndex]['values'] = t;
    }
    setSets(newSets);
    saveTrainingTemplate(newSets, trainId, template);
  };

  const deleteExercise = useCallback(
    (setIndex, exIndex) => {
      const newSets = sets.slice(0);
      newSets[setIndex].exercises.forEach((t, i) => {
        newSets[setIndex].exercises[i].splice(exIndex, 1);
      });
      setSets(newSets);
      saveTrainingTemplate(newSets, trainId, template);
    },
    [template],
  );

  const addExercise = useCallback(
    (e) => {
      const newSets = sets.slice(0);
      const newExercise = {
        name: e.title,
        exerciseId: e.id,
        values: {
          repsCount: 0,
          weight: 0,
          leadTime: 0,
        },
      };
      if (e.parameters.includes('weight')) newExercise.values.weight = 10;
      if (e.parameters.includes('repsCount')) newExercise.values.repsCount = 1;
      if (e.parameters.includes('leadTime')) newExercise.values.leadTime = 150;
      const i = selectedSet;
      console.log(i, newSets, e, newExercise);
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
      saveTrainingTemplate(newSets, trainId, template);
    },
    [sets, template, selectedSet],
  );

  const addSet = useCallback(() => {
    const newSets = sets.slice(0);
    newSets.push({
      closed: false,
      showReps: false,
      lapsCount: 1,
      exercises: [[]],
    });
    setSets(newSets);
    saveTrainingTemplate(newSets, trainId, template);
  }, [sets]);

  const deleteSet = useCallback(
    (i) => {
      const newSets = sets.slice(0);
      newSets.splice(i, 1);
      setSets(newSets);
      saveTrainingTemplate(newSets, trainId, template);
    },
    [sets],
  );

  const setRepsCount = useCallback(
    (i, c) => {
      const newSets = sets.slice(0);
      const l = newSets[i].lapsCount;
      newSets[i].lapsCount = c;
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
      saveTrainingTemplate(newSets, trainId, template);
    },
    [sets, template],
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
