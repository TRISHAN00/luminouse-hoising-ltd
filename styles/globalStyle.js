import { createGlobalStyle, css } from "styled-components";
import { Black, hover, text, title } from "./globalStyleVars";

function createCSS() {
  let styles = "";

  for (let i = 2; i < 20; i += 1) {
    styles += `
        .anim-active.fade-up:nth-child(${i}) {
          transition-delay: ${i * 0.12}s;
        }
     `;
  }

  for (let a = 2; a < 100; a += 1) {
    styles += `
        .anim-active.fade-right span:nth-child(${a}) {
          transition-delay: ${a * 0.03}s;
        }
     `;
  }

  return css`
    ${styles}
  `;
}

export default createGlobalStyle`

    ${createCSS()}
    #main-root {
        min-height: 100vh;
        overflow-x: hidden;
    }

    @font-face {
        font-family: 'Arial';
        src: url('/fonts/Arial.woff2') format('woff2'),
        url('/fonts/Arial.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'HvDTrial Palast Poster';
        src: url('/fonts/HvDTrial_PalastPoster-Light.woff2') format('woff2'),
        url('/fonts/HvDTrial_PalastPoster-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'HvDTrial Palast Poster';
        src: url('/fonts/HvDTrial_PalastPoster-Regular.woff2') format('woff2'),
        url('/fonts/HvDTrial_PalastPoster-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }


   html, body {
        font-family: 'Arial', Helvetica, freesans, sans-serif !important;
        font-style: normal;
        margin: 0;
        color: ${text};
        padding: 0;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        font-size: 16px;
        line-height: 24px;
        scroll-behavior: auto;
        @media (max-width: 767px) {
            font-size: 14px;
            line-height: 21px;
        }
    }


    a {
        transition: color .3s ease;
        text-decoration: none;

        &:hover {
            color: ${hover} !important;
            text-decoration: none;
            outline: none;
            box-shadow: none;
        }

        &:focus {
            text-decoration: none;
            outline: none;
            box-shadow: none;
            color: ${text};
        }
    }

    ::selection {
        background: ${hover};
        color: #FFF;
    }

    p, a, h1, h2, h4, h3, h5, h6 {
        font-weight: 400;
        margin: 0;
    }

    h1, h2 {
        font-family: ${title};
    }

    ul {
        margin: 0;
        padding: 0
    }

    li {
        list-style: none;
    }

    img {
        max-width: 100%;
        object-fit: contain;
    }


    .btn:focus, button:focus, button:active:focus, .btn.active.focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn:active:focus, .btn:focus {
        outline: none;
        box-shadow: none;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        border: 1px solid rgba(0, 0, 0, 0);
        -webkit-text-fill-color: #000;
        -webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
        transition: background-color 5000s ease-in-out 0s;
    }


    table {
        width: 100%;
    }

    form div {
        position: relative;
    }

    .form-control {
        box-shadow: none;
        outline: 0;
        border-radius: 0;

        &:focus {
            box-shadow: none;
        }
    }

    .p-0 {
        padding: 0 !important;
    }

    .pl-0 {
        padding-left: 0;
    }

    .pr-0 {
        padding-right: 0;
    }

    .pt-200 {
        padding-top: 200px;
        @media (max-width: 767px) {
            padding-top: 100px;
        }
    }

    .pb-200 {
        padding-bottom: 200px;
        @media (max-width: 767px) {
            padding-bottom: 100px;
        }
    }

    .pt-160 {
        padding-top: 160px;
        @media (max-width: 767px) {
            padding-top: 100px;
        }
    }

    .pb-160 {
        padding-bottom: 160px;
        @media (max-width: 767px) {
            padding-bottom: 100px;
        }
    }

    .pt-150 {
        padding-top: 150px;
        @media (max-width: 767px) {
            padding-top: 100px;
        }
    }

    .pb-150 {
        padding-bottom: 150px;
        @media (max-width: 767px) {
            padding-bottom: 100px;
        }
    }

    .pb-130 {
        padding-bottom: 130px;
        @media (max-width: 767px) {
            padding-bottom: 100px;
        }
    }

    .pt-100 {
        padding-top: 100px;
        @media (max-width: 767px) {
            padding-top: 60px;
        }
    }

    .pb-100 {
        padding-bottom: 100px;
        @media (max-width: 767px) {
            padding-bottom: 60px;
        }
    }

    .pt-80 {
        padding-top: 80px;
        @media (max-width: 767px) {
            padding-top: 40px;
        }
    }

    .pb-80 {
        padding-bottom: 80px;
        @media (max-width: 767px) {
            padding-bottom: 40px;
        }
    }

    .mt-20 {
        margin-top: 20px;
    }

    .mt-40 {
        margin-top: 40px;
    }

    .mt-60 {
        margin-top: 60px;
    }


    @media (min-width: 1500px) {
        .container {
            min-width: 85%;
            margin: auto;
        }
    }

    @media (max-width: 1199px) and (min-width: 768px) {
        .container, .container-lg, .container-md, .container-sm {
            max-width: 90%;
            margin: auto;
        }
    }


    @media (max-width: 767px) {
        .container, .container-sm {
            max-width: 100%;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }


    //react select
    .css-yk16xz-control, .css-1pahdxg-control {
        height: 50px;
        border-radius: 0 !important;
        padding-left: 5px;
        font-size: 16px;
        outline: none !important;
        border-color: #D9D9D9 !important;
        box-shadow: none !important;

        .css-1wa3eu0-placeholder {
            font-weight: 300;
            line-height: 21px;
            color: rgba(0, 0, 0, 0.5);
            outline: none;
        }

        .css-1okebmr-indicatorSeparator {
            display: none;
        }

        .css-tlfecz-indicatorContainer, .css-1gtu0rj-indicatorContainer {
            margin-right: 10px;
        }
    }

    .css-2613qy-menu {
        border-radius: 0 !important;
        margin-top: 0 !important;
    }


    .info-window {
        max-width: 200px;
    }

    .gm-style-iw {
        border-radius: 0 !important;
    }

    .swiper-pagination-bullet {
        outline: none;
    }

    .css-nmuc1a-menu {
        z-index: 5 !important;
    }


    .map-info__img {
        img {
            height: 100px;
            margin-bottom: 12px;
            object-fit: cover;
        }
    }

    .map-info__content {
        h4 {
            font-size: 20px;
        }

        p {
            margin-bottom: 5px;
        }
    }

    .overlay {
        position: fixed;
        height: 100vh;
        width: 100%;
        //background-color: rgba(0,0,0,0.5);
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        display: none;

        &.show {
            display: block;
        }
    }

    .form-control.has-error {
        border-color: #dc004e !important;
    }

    .has-error .find-retainer-filter__control {
        border-color: #dc004e !important;
    }

    //preloader
    .content-loader {
        position: absolute;
        height: 70%;
        width: 70%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .loading-before-submit {
        position: fixed;
        height: 100vh;
        width: 100%;
        bottom: 0;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.65);
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 40px;
        }
    }


    .swiper-slide {
        height: auto;
    }

    .slick-slide {
        div {
            outline: none !important
        }
    }

    button, button:active, button:focus, button:focus-visible {
        outline: none !important;
        box-shadow: none !important;
    }


    .hover {
        position: relative;
        overflow: hidden;

        span {
            z-index: 2;
        }

        &:after {
            content: '';
            position: absolute;
            height: 0;
            width: 0;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background-color: ${hover};
            transition: all .5s ease;
            border-radius: 19px;
        }

        &:hover {
            &:after {
                height: 100%;
                width: 100%;
            }
        }
    }


    .modal-backdrop {
        background-color: rgb(34 31 31 / 90%);
        min-width: 100%;
        //z-index: 9999;

        &.show {
            opacity: 1;
        }
    }


    .valid {
        color: ${hover};
        position: absolute;
        font-size: 12px;
        top: 44px;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }


    //menu fixed
    .scroll-down .menu-desktop {
        transform: translate3d(0, -100%, 0);
    }

    .scroll-up .menu-desktop {
        background-color: #fff;

        .menu-desktop__hamburger__lines {
            &__inner .line {
                background-color: #191818;
            }

            p {
                color: #191818;
            }
        }

        .menu-desktop__hamburger .controller svg {
            path {
                fill: #191818;
            }

            line {
                stroke: #191818;
            }
        }

        .dc-btn a {
            color: #191818;

            &:hover {
                color: #191818 !important;
            }

            &:after, &:before {
                box-shadow: 0 0 0 1px #191818;
            }
        }
    }

    .form-control:disabled {
        background-color: transparent;
    }

    @media (max-width: 600px) {
        .prevent-overflow {
            overflow: hidden;
            height: 100vh;
        }
    }

    .Toastify__toast-container {
        z-index: 99999999;
    }

    .mobile-menu {
        #fb-root, .fb_reset {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
    }

    .slick-slide {
        -webkit-transform: translate3d(0, 0, 0);
    }


    //------------------------animation
    .split-parent {
        overflow: hidden;
    }

    .split-child {
        overflow: hidden;
    }

    .reveal {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        img {
            transform-origin: left;
        }

        .global-image {
            background: transparent;
        }
    }

    #smooth-content {
        will-change: transform;
    }

    .page-transition {
        display: none;
    }

    form {
        .form-control {
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            background-color: transparent !important;
            padding: 0 0 20px 0;
            margin-bottom: 40px;
            outline: none;
            color: #ffffff;
            box-shadow: none;

            &::placeholder {
                color: #999999;
            }

            &:focus {
                border-color: #FFF;
            }
        }

        textarea {
            min-height: 80px;
            max-height: 80px;
        }
    }

    .modify-footer .footer {
        @media (min-width: 600px) {
            padding-top: 200px;
        }
    }

    //global form
    .global-popup form .form-control {
        border-bottom: 1px solid rgba(10, 14, 18, 0.3);
        color: ${Black};
        padding: 0 0 15px 0;
        margin-bottom: 30px;

        &::placeholder {
            color: #999999 !important;
            text-transform: capitalize;
        }

        &:focus {
            border-bottom: 1px solid ${Black};
        }
    }

    .services {
        background-color: ${Black};

        .working, .insights {
            padding-top: 0;
        }

        .amenities {
            @media (max-width: 992px) {
                padding-top: 0;
            }
        }
    }

    .career-detail {
        background-color: ${Black};
        padding-top: 140px;
        padding-bottom: 150px;
        overflow: hidden;
    }

    .team-bio {
        background-color: ${Black};
        padding-top: 140px;
    }
`;
