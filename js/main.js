const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");

// открывает\закрывает окно корзины
function toggleModal() {
  modal.classList.toggle("is-open");
}

// забираем значение логина из браузера
let login = localStorage.getItem("cloDelivery");

// включает/выключает окно авторизации
function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  if (modalAuth.classList.contains('is-open')) {
    disableScroll();
  } else {
    enableScroll();
  }
}
// очищаем форму
clearForm = () => {
  loginInput.style.borderColor = '';
  logInForm.reset();
}

// для авторизованных пользователей
function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery"); //очищаем localstorage
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    checkAuth();
    buttonOut.removeEventListener("click", logOut);
  }
  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  buttonOut.addEventListener("click", logOut);
}

// для неавторизованных пользователей
function notAutorized() {
  function logIn(event) {
    event.preventDefault();

    if (loginInput.value.trim()) { //если логин сохранён (trim - удаляет пароли)
      login = loginInput.value;
      localStorage.setItem("gloDelivery", login); //сохраняем в браузере

      toggleModalAuth();
      checkAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset(); //сбрасывает поля формы
    } else {
      loginInput.style.borderColor = '#ff0000';
      loginInput.value = '';
    }
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
  modalAuth.addEventListener('click', event => {
    if (event.target.classList.contains('is-open')) {
      toggleModalAuth()
    }
  });
}

// проверяет авторизацию
function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
buttonAuth.addEventListener('click', clearForm);

checkAuth();