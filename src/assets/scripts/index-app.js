import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import InitCustomSlider from './gulp-modules/sliderThree';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
global.axios = axios;

/* eslint-disable-next-line */
window.initCustomSlider = InitCustomSlider;
window.locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [];

const formsTel = ['[data-popup-form]'];

formsTel.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          const backdrop = document.querySelector('.form-gratitude');
          gsap.to(backdrop, { autoAlpha: 1 });
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
              typeInput: 'text',
            }),
            rule: yup.string().required(i18next.t('required')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          email: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-email]'),
              typeInput: 'email',
            }),
            rule: yup.string().required(i18next.t('required')).matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, i18next.t('invalidEmail')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              // .nullable()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener(
    //   'click',
    //   () => {
    //     $form.querySelector('[name="phone"]').focus();
    //   },
    //   false,
    // );
  }
});

const footerForm = ['[data-footer-form]', '[data-popup-form]'];
// const footerForm = ['[data-form-footer]'];
footerForm.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          const backdrop = document.querySelector('.form-gratitude');
          gsap.to(backdrop, { autoAlpha: 1 });
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .test(
                'phone',
                'wow',
                (evt) => {
                  const digitsCount = evt.replace(/[^0-9]/g, '');
                  return digitsCount.length >= 12;
                },
                'Must be only digits',
              )
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener(
    //   'click',
    //   () => {
    //     $form.querySelector('[name="phone"]').focus();
    //   },
    //   false,
    // );
  }
});

// /**footer form fake placeholder */
// const footerPlaceholder = document.querySelector('.footer-placeholder');
// const footerPlaceholderInput = footerPlaceholder.previousElementSibling;
// console.log(footerPlaceholderInput);

// footerPlaceholderInput.addEventListener('input', () => {
//   console.log('LENGTH', footerPlaceholderInput.value.length);
//   const lengthMinusMask = footerPlaceholderInput.value.length - 5;
//   footerPlaceholder.style.clipPath = `polygon(${lengthMinusMask *
//     10}% 0, 100% 0, 100% 100%, ${lengthMinusMask * 10}% 100%)`;
// });
// /**footer form fake placeholder END */

// const formsWithRedirect = ['[data-popup-form]'];
const formsWithRedirect = [];

formsWithRedirect.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          window.location.href = 'message';
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))

              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener(
    //   'click',
    //   () => {
    //     $form.querySelector('[name="phone"]').focus();
    //   },
    //   false,
    // );
  }
});

forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('.backdrop').classList.add('is-hidden-form');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
          checkbox1: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-checkbox]'),
              typeInput: 'checkbox',
            }),
            rule: yup
              .bool()
              .nullable()
              .oneOf([true], i18next.t('fillCheboxMessage')),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    // $form.querySelector('.js-mask-absolute').addEventListener(
    //   'click',
    //   () => {
    //     $form.querySelector('[name="phone"]').focus();
    //   },
    //   false,
    // );
  }
  document.querySelectorAll('[name="checkbox1"]').forEach((el) => {
    el.value = false;
    el.addEventListener('change', () => {
      el.value = !!el.checked;
      $form.querySelector('[name="phone"]').dispatchEvent(new Event('input'));
    });
  });
});

function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  console.log('disableScroll', containersScroll);
  containersScroll.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      window.locoScroll.stop();
    });

    block.addEventListener('mouseleave', () => {
      window.locoScroll.start();
    });
  });
}

window.addEventListener('load', () => {
  window.locoScroll.update();
});

window.addEventListener('DOMContentLoaded', () => {
  window.locoScroll.update();
  disableScroll();

  // initPopup();
});

const blockForUpdatingLocoScroll = document.querySelectorAll('footer');
blockForUpdatingLocoScroll.forEach((image) => {
  const callback = function (entries, observer) {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        locoScroll.update();
        observer.unobserve(image);
      }
    });
  };
  // eslint-disable-next-line no-undef
  const observer = new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0.1,
  });
  const target = image;
  observer.observe(target);
});
