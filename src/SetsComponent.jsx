import React from 'react';
import {
  setShowRepsIcon,
  showSetIcon,
  deleteIcon,
  repIcon,
  exRepsIcon,
  hideSetIcon,
  repIndexIcon,
  weightIcon,
  leadTimeIcon,
  setHideRepsIcon,
} from './icons';
import ExcerciseComponent from './ExcerciseComponent';
import { Dropdown } from 'antd';
const repsNumber = [...Array(20)].map((v, i) => i + 1);

function SetsComponent({
  sets,
  toggleClose,
  toggleShowReps,
  updateExcercise,
  setSelectedSet,
  deleteExercise,
  deleteSet,
  setRepsCount,
  setEditedExercise,
}) {
  const repsItems = (i) =>
    repsNumber.map((n) => ({
      key: n,
      label: (
        <span key={n} onClick={() => setRepsCount(i, n)}>
          {n}
        </span>
      ),
    }));

  return sets.map((s, i) => (
    <div className="setContainer">
      <div className="set_top">
        <div className="top_left">
          <span
            className="button_icon"
            onClick={() => {
              toggleShowReps(!s.showReps, i);
            }}
          >
            {s.showReps ? setHideRepsIcon : setShowRepsIcon}
          </span>
          <span>Сет на</span>
          <Dropdown
            menu={{
              items: repsItems(i),
            }}
            placement="bottomLeft"
            arrow
          >
            <span className="rep_button">
              {s.lapsCount} {repIcon}
            </span>
          </Dropdown>
        </div>
        <div className="top_right">
          <span
            className=""
            onClick={() => {
              toggleClose(!s.closed, i);
            }}
          >
            {s.closed ? showSetIcon : hideSetIcon}
          </span>
          <span
            className=""
            onClick={() => {
              deleteSet(i);
            }}
          >
            {deleteIcon}
          </span>
        </div>
      </div>
      {!s.closed && <div className="excercise_border"></div>}
      {!s.closed &&
        s.showReps &&
        [...Array(s.exercises.length)].map((elementInArray, repIndex) => (
          <div className="repeatedContainer">
            <div className="rep_index">
              {repIndex + 1}
              {repIndexIcon}
            </div>
            <div className="repeatedExcercise">
              {s.exercises[repIndex].map((ex, exIndex) => (
                <ExcerciseComponent
                  updateExcercise={(name, value) =>
                    updateExcercise(name, value, exIndex, repIndex, i)
                  }
                  rep={true}
                  index={repIndex}
                  ex={ex}
                  deleteExercise={(exindex) => deleteExercise(i, exIndex)}
                  setEditedExercise={() => {
                    setEditedExercise(exIndex);
                    setSelectedSet(i);
                  }}
                />
              ))}
            </div>
          </div>
        ))}

      {!s.closed &&
        !s.showReps &&
        s.exercises.length &&
        s.exercises[0].map((ex, exIndex) => (
          <ExcerciseComponent
            updateExcercise={(name, value) =>
              updateExcercise(name, value, exIndex, 0, i)
            }
            ex={ex}
            index={0}
            deleteExercise={(exindex) => deleteExercise(i, exIndex)}
            setEditedExercise={() => {
              setEditedExercise(exIndex);
              setSelectedSet(i);
            }}
          />
        ))}
      <div style={{ textAlign: 'left', marginLeft: '10px' }}>
        <span
          onClick={() => {
            setSelectedSet(i);
          }}
          className="add_exercise_button"
        >
          + Добавить упражнение в сет
        </span>
      </div>
    </div>
  ));
}

export default SetsComponent;
