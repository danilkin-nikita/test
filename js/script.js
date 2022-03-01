let bannerSlider = $(".banner-slider__wrapper");
bannerSlider.owlCarousel({
  loop: true,
  dots: true,
  items: 1,
  autoplay: true,
  dotsContainer: ".banner__slider-dots",
});
$(".banner-slider__button--next").click(function () {
  bannerSlider.trigger("next.owl.carousel");
});
$(".banner-slider__button--prev").click(function () {
  bannerSlider.trigger("prev.owl.carousel");
});

let servicesSlider = $(".services-slider__wrapper");
servicesSlider.owlCarousel({
  loop: true,
  margin: 20,
  items: 1,
  dots: true,
  dotsContainer: ".services__slider-dots",
  responsive: {
    621: {
      items: 2,
    },
    1051: {
      items: 3,
    },
    1171: {
      items: 4,
      margin: 28,
    },
    1440: {
      items: 4,
      margin: 30,
    },
  },
});
$(".services-slider__button--next").click(function () {
  servicesSlider.trigger("next.owl.carousel");
});
$(".services-slider__button--prev").click(function () {
  servicesSlider.trigger("prev.owl.carousel");
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = new Mmenu("#menu", {
    slidingSubmenus: false,
    extensions: ["position-top", "fullscreen", "theme-white"],
    navbar: {
      title: ` <div class="menu">
        <div class="navbar">
          <div class="navbar-menu">
            <a href="index.html" class="logo">
              <img class="logo__icon" src="img/logo.svg" alt="logo" />
            </a>
          </div>
          <!-- /.navbar-menu -->
          <div class="info">
            <a href="tel:+78009413428" class="phone">
              <img class="phone-icon icon" src="img/phone.svg" alt="phone" />
              <span class="phone-text">+7 (800) 941-34-28</span>
            </a>
            <div class="info__wrapper">
              <a
                id="close-button"
                class="navbar__hamburger hamburger hamburger--open"
              >
                <span class="hamburger__line"></span>
              </a>
            </div>
          </div>
          <!-- /.navbar-info -->
        </div>
        <!-- /.navbar -->
      </div>`,
    },
  });

  const api = menu.API;

  document.querySelector("#close-button").addEventListener("click", () => {
    api.close();
  });
});

const sendForm = () => {
  const statusMessage = document.querySelector(".form__message");

  const error = (elem, cssClass) => {
    elem.classList.add(cssClass);
    setTimeout(() => {
      elem.classList.remove(cssClass);
    }, 6000);
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    let target = event.target;

    const inputName = target.querySelector('input[name="name"]'),
      inputPhone = target.querySelector('input[name="phone"]'),
      dataProcessing = target.querySelector(".form__checkbox"),
      dataProcessingLink = target.querySelector(".form__checkbox-link");

    const validName = /^[а-яА-Яa-zA-Z]{2,}$/,
      validPhone = /^[+\-\)\(0-9 ]+$/;

    let valid = true;

    if (target.matches("form")) {
      if (inputName) {
        if (!inputName.value.match(validName)) {
          error(inputName, "error-input");
          valid = false;
        }
      }
      if (!inputPhone.value.match(validPhone)) {
        error(inputPhone, "error-input");
        valid = false;
      }
      if (dataProcessing && dataProcessing.checked === false) {
        error(dataProcessingLink, "error");
        valid = false;
      }
      if (valid === false) {
        return;
      }

      statusMessage.innerHTML = `<img class="form__preloader" src="./img/loading.svg">`;
    }
    const formData = new FormData(target);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        statusMessage.textContent =
          "Сообщение отправлено! Мы скоро с вами свяжемся.";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = "Что-то пошло не так...";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      });

    target.reset();
  });

  const postData = (formData) => {
    return fetch("./send.php", {
      method: "POST",
      body: formData,
      action: "./send.php",
    });
  };
};

sendForm();
