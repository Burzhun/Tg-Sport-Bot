const token = import.meta.env.VITE_TOKEN;
var headers = new Headers();
headers.append('Authorization', 'Bearer ' + token);

export const LoadExercises = async (exName) => {
  const url = `https://sil.myfast.space/api/exercises/find?query=${exName}`;
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
