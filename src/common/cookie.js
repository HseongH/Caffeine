export const getCookie = (key) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);

  if (parts.length >= 2) return parts.pop().split(';').shift();
};

export const setCookie = (key, value, expires = 5) => {
  const date = new Date();
  date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);

  document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
};

export const delCookie = (key) => {
  document.cookie = `${key}=; expires=${new Date('1999-01-01').toUTCString()};`;
};
