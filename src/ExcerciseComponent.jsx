import React from 'react';
import {
  exRepsIcon,
  weightIcon,
  deleteIcon,
  leadTimeIcon,
  repIndexIcon,
} from './icons';
import { Button, Dropdown, Input } from 'antd';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const weights = [...Array(20)].map((v, i) => i * 10 + 10);
const repsNumber = [...Array(20)].map((v, i) => i + 1);
const timeToString = (t) => {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
};
const stringToTime = (s) => {
  const [s1, s2] = s.split(':');
  return parseInt(s1) * 60 + parseInt(s2);
};

function ExcerciseComponent({
  ex,
  rep,
  index,
  updateExcercise,
  deleteExercise,
  setEditedExercise,
}) {
  const weightItems = weights.map((n) => ({
    key: n,
    label: <span onClick={() => updateExcercise('weight', n)}>{n}</span>,
  }));
  const repsItems = repsNumber.map((n) => ({
    key: n,
    label: (
      <span
        style={{ display: 'inline-block', width: '30px', textAlign: 'center' }}
        onClick={() => updateExcercise('repsCount', n)}
      >
        {n}
      </span>
    ),
  }));

  return (
    <div className={'excercise ' + (index > 0 ? 'repeated' : '')}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="excercise_left">
          <span
            onClick={() => {
              setEditedExercise();
            }}
            className="name name1"
          >
            {ex.name}
          </span>

          {ex.values.weight !== 0 && (
            <React.Fragment>
              <span className="excersice_icon">{weightIcon}</span>
              <Dropdown
                menu={{
                  items: weightItems,
                }}
                placement="bottomLeft"
                arrow
              >
                <span className="name name1">{ex.values.weight}</span>
              </Dropdown>
            </React.Fragment>
          )}

          {ex.values.repsCount > 0 && (
            <React.Fragment>
              <span className="excersice_icon">{exRepsIcon}</span>
              <Dropdown
                menu={{
                  items: repsItems,
                }}
                placement="bottomLeft"
                arrow
              >
                <span className="name">{ex.values.repsCount}</span>
              </Dropdown>
            </React.Fragment>
          )}

          {ex.values.leadTime !== 0 && (
            <React.Fragment>
              <span className="excersice_icon">{leadTimeIcon}</span>

              <span className="name time">
                <input
                  value={timeToString(ex.values.leadTime)}
                  onFocus={(e) => e.target.showPicker()}
                  type="time"
                  onChange={(e) => {
                    console.log(e.target.value);
                    updateExcercise('leadTime', stringToTime(e.target.value));
                  }}
                  name="appt-time"
                />
              </span>
            </React.Fragment>
          )}
        </div>
        {index === 0 && (
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
        )}
      </LocalizationProvider>
    </div>
  );
}

export default ExcerciseComponent;
