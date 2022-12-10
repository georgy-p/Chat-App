const signup = {
  header: 'Регистрация',
  form: {
    username: 'Имя пользователя',
    password: 'Пароль',
    passwordConfirm: 'Подтвердите пароль',
  },
  errors: {
    required: 'Обязательное поле',
    usernameLength: 'От 3 до 20 символов',
    passwordLength: 'Не менее 6 символов',
    passwordNotMatch: 'Пароли должны совпадать',
    existedUser: 'Такой пользователь уже существует',
  },
};

export default signup;
