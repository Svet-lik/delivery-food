'use strict';
// подключаем слайдер
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const RED_COLOR = "#ff0000";

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
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

// забираем значение логина из браузера
let login = localStorage.getItem("cloDelivery");

// валидация
function validName (str) {
  const regName = /^[a-zA-Z0-9-_\.]{3,20}$/;
  return regName.test(str);
}

// открывает/закрывает окно корзины
function toggleModal() {
  modal.classList.toggle("is-open");
}
// включает/выключает окно авторизации
function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
  if (modalAuth.classList.contains("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
}
// очищаем форму
function clearForm() {
  loginInput.style.borderColor = "";
  logInForm.reset();
};

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

    if (validName(loginInput.value)) {
      //если логин сохранён (trim - удаляет пробелы)
      login = loginInput.value;
      localStorage.setItem("gloDelivery", login); //сохраняем в браузере

      toggleModalAuth();
      checkAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset(); //сбрасывает поля формы
    } else {
      loginInput.style.borderColor = RED_COLOR;
      loginInput.value = "";
    }
  }
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
  modalAuth.addEventListener("click", (event) => {
    if (event.target.classList.contains("is-open")) {
      toggleModalAuth();
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

// создаёт карточки
function creatCardRestaurant() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

// формирует карточку пиццы
function createCardGoods() {
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `
        <img
          src="img/pizza-plus/pizza-girls.jpg"
          alt="image"
          class="card-image"
        />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">Пицца Девичник</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">
              Соус томатный, постное тесто, нежирный сыр, кукуруза, лук,
              маслины, грибы, помидоры, болгарский перец.
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">450 ₽</strong>
          </div>
        </div>                          
  `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

// отвечает за смену контента страницыЖ рестораны или карточки пиццы
function openGoods(event) {
  const target = event.target;
  if (login) {
    const restaurant = target.closest(".card-restaurant");
    if (restaurant) {
      containerPromo.classList.add("hide");
      restaurants.classList.add("hide");
      menu.classList.remove("hide");
  
      cardsMenu.textContent = '';
  
      createCardGoods();
      createCardGoods();
      createCardGoods();
  }
  } else {
    toggleModalAuth();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
buttonAuth.addEventListener("click", clearForm);
cardsRestaurants.addEventListener("click", openGoods);
logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

// временные 
creatCardRestaurant();
creatCardRestaurant();
creatCardRestaurant();
checkAuth();

new Swiper('.swiper-container', { //настройка слайдера
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'cube',
  // effect: 'coverflow', остальное в этом блоке убираем
  grabCursor: true,
  cubeEffect:{      //убираем тень слайдера
    shadow: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  //пагинацию урать и добавить:
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
});