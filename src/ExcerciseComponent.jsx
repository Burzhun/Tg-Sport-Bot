import React from 'react';
import {
  exRepsIcon,
  weightIcon,
  deleteIcon,
  leadTimeIcon,
  repIndexIcon,
} from './icons';
import { Button, Dropdown } from 'antd';
const names = [
  'Жим штангой',
  'Жим штангой узким хватом',
  'Жим штангой широким хватом',
  'Жим штангой в наклонной скамье',
  'Жим гантелями',
];
const weights = [...Array(20)].map((v, i) => i * 10 + 10);
const repsNumber = [...Array(20)].map((v, i) => i + 1);
const timeValues = [
  '0:15',
  '0:30',
  '0:45',
  '1:00',
  '1:30',
  '1:45',
  '2:00',
  '2:30',
  '3:00',
  '3:30',
  '4:00',
  '4:30',
  '5:00',
];

function ExcerciseComponent({
  ex,
  rep,
  index,
  updateExcercise,
  deleteExercise,
}) {
  const items = names.map((n) => ({
    key: n,
    label: <span onClick={() => updateExcercise('name', n)}>{n}</span>,
  }));
  const weightItems = weights.map((n) => ({
    key: n,
    label: <span onClick={() => updateExcercise('weight', n)}>{n}</span>,
  }));
  const repsItems = repsNumber.map((n) => ({
    key: n,
    label: <span onClick={() => updateExcercise('repsCount', n)}>{n}</span>,
  }));
  const timeItems = timeValues.map((n) => ({
    key: n,
    label: <span onClick={() => updateExcercise('leadTime', n)}>{n}</span>,
  }));

  return (
    <div className={'excercise ' + (index > 0 ? 'repeated' : '')}>
      <div className="excercise_left">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <span className="name name1">{ex.name}</span>
        </Dropdown>

        {ex.weight && (
          <React.Fragment>
            <span className="excersice_icon">{weightIcon}</span>
            <Dropdown
              menu={{
                items: weightItems,
              }}
              placement="bottomLeft"
              arrow
            >
              <span className="name name1">{ex.weight}</span>
            </Dropdown>
          </React.Fragment>
        )}

        {ex.repsCount && (
          <React.Fragment>
            <span className="excersice_icon">{exRepsIcon}</span>
            <Dropdown
              menu={{
                items: repsItems,
              }}
              placement="bottomLeft"
              arrow
            >
              <span className="name">{ex.repsCount}</span>
            </Dropdown>
          </React.Fragment>
        )}

        {ex.leadTime && (
          <React.Fragment>
            <span className="excersice_icon">{leadTimeIcon}</span>
            <Dropdown
              menu={{
                items: timeItems,
              }}
              placement="bottomLeft"
              arrow
            >
              <span className="name">{ex.leadTime}</span>
            </Dropdown>
          </React.Fragment>
        )}
      </div>
      <div className="excercise_right">
        <span
          className=""
          onClick={() => {
            deleteExercise();
          }}
        >
          {deleteIcon}
        </span>
      </div>
    </div>
  );
}

export default ExcerciseComponent;
