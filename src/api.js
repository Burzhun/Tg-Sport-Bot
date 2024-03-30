const token = import.meta.env.VITE_TOKEN;
var headers = new Headers();
headers.append('Authorization', 'Bearer ' + token);

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
      if (cache[s.exerciseId]) e.name = cache[s.exerciseId];
      else {
        console.log(e.exerciseId);
        const res = await LoadExercise(e.exerciseId);
        e.name = res.exercise.title;
        cache[s.exerciseId] = res.exercise.title;
      }
    }
  }
};

export const saveTrainingTemplate = async (sets, trainTemplateId, template) => {
  const sets2 = sets.map((s) => ({
    extendedLaps: [],
    lapsCount: s.lapsCount,
    lap: {
      exercises: s.exercises[0].map((e) => ({
        exerciseId: e.exerciseId,
        values: e.values,
      })),
    },
  }));
  console.log(sets2);

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
