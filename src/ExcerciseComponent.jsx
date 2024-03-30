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
  setEditedExercise,
}) {
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
                <MobileTimePicker
                  views={['minutes', 'seconds']}
                  defaultValue={dayjs('2022-04-17T15:' + ex.values.leadTime)}
                  onChange={(e) => {
                    console.log(e);
                    updateExcercise(
                      'leadTime',
                      `${e.$m < 10 ? '0' : ''}${e.$m}:${e.$s < 10 ? '0' : ''}${
                        e.$s
                      }`,
                    );
                  }}
                  slots={{
                    textField: (params) => (
                      <Input variant="filled" {...params} />
                    ),
                  }}
                />
              </span>
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
      </LocalizationProvider>
    </div>
  );
}

export default ExcerciseComponent;
