export const isEmailValidation = (string) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return regExp.test(string);
};

export const isPwdValidation = (string) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

  return regExp.test(string);
};
