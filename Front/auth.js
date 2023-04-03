document.addEventListener('DOMContentLoaded', () => {
  // Получение элементов модальных окон и форм
  const registerModal = document.getElementById('register-modal');
  const loginModal = document.getElementById('login-modal');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const registerBtn = document.getElementById('register-btn');
  const loginBtn = document.getElementById('login-btn');

  // Функция открытия модального окна
  function openModal(modal) {
    modal.style.display = 'block';
  }

  // Функция закрытия модального окна
  function closeModal(modal) {
    modal.style.display = 'none';
  }

  // Открытие модальных окон при нажатии на кнопки регистрации и входа
  registerBtn.addEventListener('click', () => openModal(registerModal));
  loginBtn.addEventListener('click', () => openModal(loginModal));

  // Закрытие модальных окон при нажатии на крестик
  registerModal.querySelector('.close').addEventListener('click', () => closeModal(registerModal));
  loginModal.querySelector('.close').addEventListener('click', () => closeModal(loginModal));

  // Закрытие модальных окон при клике вне их содержимого
  window.addEventListener('click', (event) => {
    if (event.target == registerModal) {
      closeModal(registerModal);
    } else if (event.target == loginModal) {
      closeModal(loginModal);
    }
  });

  // Регистрация пользователя
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userType = e.target.userType.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('Пароли не совпадают. Пожалуйста, повторите ввод.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      alert('Пользователь с таким логином уже существует.');
      return;
    }

    users[username] = {
      userType,
      password,
    };
    localStorage.setItem('users', JSON.stringify(users));
    closeModal(registerModal);
    alert('Регистрация прошла успешно. Теперь вы можете войти.');
  });

  // Вход пользователя
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username] || users[username].password !== password) {
      alert('Неправильный логин или пароль.');
      return;
    }

    closeModal(loginModal);
    alert(`Добро пожаловать, ${username}!`);
  });
});
