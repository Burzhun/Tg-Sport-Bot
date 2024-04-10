const token1 = import.meta.env.VITE_TOKEN;
var headers = new Headers();
const searchParams = new URLSearchParams(window.location.search);
const token = searchParams.get('access_token') || token1;
headers.append('Authorization', token);
headers.append('Content-Type', 'application/json');

export const LoadExercises = async (exName) => {
  const url = `https://sil.myfast.space/api/exercises/find?query=${exName}`;
  const response = await fetch(url, { method: 'GET', headers });
  const t = await response.json();
  return t;
};

export const LoadExercise = async (exerciseId) => {
  const url = `https://sil.myfast.space/api/exercises/${exerciseId}`;
  const response = await fetch(url, { method: 'GET', headers });
  const t = await response.json();
  return t;
};

export const LoadLastExercises = async (exName) => {
  const url = 'https://sil.myfast.space/api/exercises/last';

  const response = await fetch(url, { method: 'GET', headers });
  const t = await response.json();
  return t;
};

export const CreateTemplate = async (trainTemplateId) => {
  const url = 'https://sil.myfast.space/api/trains/template/create';
  const templateData = {
    trainCore: {
      title: 'Тестовая тренировка',
      group: 'arms',
      target: 'loseWeight',
      sets: [
        {
          lapsCount: 1,
          lap: {
            exercises: [],
          },
          extendedLaps: null,
        },
      ],
    },
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(templateData),
  });
  const t = await response.json();
  if (t.train?.id)
    location.href = location.href.replace(trainTemplateId, t.train.id);
};

export const LoadTrainingTemplate = async (trainTemplateId) => {
  const url = 'https://sil.myfast.space/api/trains/template/' + trainTemplateId;

  const response = await fetch(url, { method: 'GET', headers });
  const t = await response.json();
  await LoadExerciseNames(t.trainTemplate);
  return t;
};

const LoadExerciseNames = async (trainTemplate) => {
  const cache = {};
  let i = 0;
  for (const s of trainTemplate.sets) {
    for (const e of s.lap.exercises) {
      if (cache[e.exerciseId]) e.name = cache[e.exerciseId];
      else {
        const res = await LoadExercise(e.exerciseId);
        e.name = res.exercise.title;
        cache[s.exerciseId] = res.exercise.title;
      }
    }
  }
};

export const saveTrainingTemplate = async (sets, trainTemplateId, template) => {
  const sets2 = sets.map((s) => {
    const t = {
      extendedLaps: [],
      lapsCount: s.lapsCount,
      lap: {
        exercises: s.exercises[0].map((e) => ({
          exerciseId: e.exerciseId,
          values: e.values,
        })),
      },
    };
    if (s.lapsCount > 1) {
      for (let i = 1; i < s.lapsCount; i++) {
        t.extendedLaps.push({
          values: s.exercises[i].map((e) => e.values),
        });
      }
    }

    return t;
  });
  const url =
    'https://sil.myfast.space/api/trains/template/update/' + trainTemplateId;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        trainCore: {
          title: template.title,
          target: template.target,
          group: template.group,
          sets: sets2,
        },
      }),
    });
    const t = await response.json();
    return t;
  } catch {}
};
