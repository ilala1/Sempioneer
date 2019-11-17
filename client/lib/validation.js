const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

export const entryValidate = value => (value.trim().length > 0);
export const emailValidate = value => (entryValidate(value) && emailRegex.test(value));
export const passwordValidate = value => (entryValidate(value) && passwordRegex.test(value));
