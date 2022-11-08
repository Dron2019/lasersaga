// On DOM ready,
$(() => {
  // Cache selectors
  const $accordion = $('.js-accordion');
  const $allPanels = $(' .accordion-panel').hide();
  const $allItems = $('.accordion-item');

  // Event listeners
  $accordion.on('click', '.accordion-toggle', function () {
    // Toggle the current accordion panel and close others
    $allPanels.slideUp();
    $allItems.removeClass('is-open');
    if (
      $(this)
        .next()
        .is(':visible')
    ) {
      $('.accordion-panel').slideUp();
    } else {
      $(this)
        .next()
        .slideDown()
        .closest('.accordion-item')
        .addClass('is-open');
    }
    return false;
  });
  openAccordeonOnAnchorLink();
});

function initSlider(container) {
  const pagination = container.querySelector('.swiper-pagination');
  const btnNext = container.querySelector('.swiper-button-next');
  const btnPrev = container.querySelector('.swiper-button-prev');
  const swipEl = container.querySelector('.js-init-services');
  if (!pagination || !btnNext || !btnPrev || !swipEl) {
    return;
  }
  const swiper = new Swiper(swipEl, {
    pagination: {
      el: pagination,
      type: 'fraction',
    },
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.js-services');
  sliders.forEach(initSlider);
});

const swiper2 = new Swiper('.myworks-swiper', {
  slidesPerView: 2.5,
  spaceBetween: 15,
  slidesPerView: 'auto',
  touchStartPreventDefault: false,
  breakpoints: {
    575: {
      spaceBetween: 20,
    },
    992: {
      spaceBetween: 50,
    },
    1440: {
      spaceBetween: 60,
    },
  },
});

/** СТрелка переключатель в зависимости от положения на єкране */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.works-swiper');
  if (!container || !sliderCursor) return;
  sliderCursor(swiper2, container);
});
/** СТрелка переключатель в зависимости от положения на єкране END */

function openAccordeonOnAnchorLink() {
  const hashId = window.location.hash.replace('#', '');
  const elToOpen = document.getElementById(hashId);
  if (elToOpen === null) return;
  setTimeout(() => {
    elToOpen.click();
  }, 1000);
}

function serviceAccordeonsSliderInPopupHandler() {
  function detectClickOnaccordeonSlider(evt) {
    if (evt.target.closest('.accordion-panel') === null) return;
    if (evt.target.closest('.swiper-slide') === null) return;

    const popup = document.querySelector('[data-works-popup]');
    const swiperContainer = document.querySelector('[data-works-popup-swiper]');
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

    const imagesOfClickedSlider = Array.from(evt.target.closest('.swiper-wrapper').querySelectorAll('img')).map(el => el.getAttribute('src'));
    const newSliderLayout = imagesOfClickedSlider.map(el => `
      <div class="swiper-slide popup-img">
          <img src="${el}" alt="">
      </div>
      `).join('');

    const indexOfClickedImage = +evt.target.closest('.swiper-slide').getAttribute('aria-label').split('/')[0] - 1;

    swiperWrapper.innerHTML = newSliderLayout;
    servicePopupSwiper.update();
    servicePopupSwiper.slideTo(indexOfClickedImage);
    open(popup);
  }

  function open(elem) {
    gsap.to(elem, { autoAlpha: 1, ease: 'Power4.out', duration: 0.25 });
  }
  function close(elem) {
    gsap.to(elem, { autoAlpha: 0, ease: 'Power4.out', duration: 0.25 });
  }

  document.body.addEventListener('click', detectClickOnaccordeonSlider);

  document.querySelector('.popup-works-close').addEventListener('click', () => {
    const popup = document.querySelector('[data-works-popup]');
    close(popup);
  });

  const servicePopupSwiper = new Swiper('[data-works-popup-swiper]', {
    navigation: {
      nextEl: document.querySelector('[data-works-popup] .popup-button-next'),
      prevEl: document.querySelector('[data-works-popup] .popup-button-prev'),
    },
  });
}

serviceAccordeonsSliderInPopupHandler();