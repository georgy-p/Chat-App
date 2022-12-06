import logo from './404.jpg';

const ErrorPage = () => (
  <div className="text-center">
    <img src={logo} alt="Картинка ошибки" className="img-fluid h-25" />
    <h1>Упс!</h1>
    <p>Кажется вы попали на несуществующую страницу</p>
    <p>
      <a href="/">Вернуться на главную страницу</a>
    </p>
  </div>
);

export default ErrorPage;
