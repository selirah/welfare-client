import styled from 'styled-components'

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10000000000;
  top: 0;
  right: 0;

  @media only screen and (min-width: 768px) and (max-width: 1220px) {
    width: calc(100% - 80px);
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }

  .spinnerContentLoader {
    width: 30px;
    height: 30px;
    animation: svgSpinner 1.4s linear infinite;
  }

  .spinnerContentLoaderCircle {
    animation: svgSpinnerCircle 1.4s ease-in-out infinite;
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
    stroke: #0090fe;
    stroke-linecap: round;
  }

  @keyframes svgSpinner {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes svgSpinnerCircle {
    0% {
      stroke-dasharray: 1px, 200px;
      stroke-dashoffset: 0px;
    }
    50% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px, 200px;
      stroke-dashoffset: -120px;
    }
  }
`

const ToastWrapper = styled.div`
  $purple: #7367f0 !default; //$primary
  $green: #28c76f !default; //$success
  $blue: #00cfe8 !default; //$info
  $orange: #ff9f43 !default; //$warning
  $red: #ea5455 !default; //$danger
  $nagaiblue: #0090fe !default; //$primary
  $white: #fff !default;
  $toast-border-radius: 0.286rem !default;
  $toast-box-shadow: 0 2px 20px 0 rgba($black, 0.08) !default;
  $body-color: #6e6b7b !default;
  $headings-color: #5e5873 !default;
  $font-family-sans-serif: 'Play', sans-serif !default;
  $primary: $nagaiblue !default;
  $secondary: $nagaipurple !default;
  $info: $blue !default;
  $warning: $orange !default;
  $danger: $red !default;
  $light: $gray-50 !default;
  $dark: #4b4b4b !default;
  $border-radius: 0.357rem !default;

  .Toastify__toast {
    background-color: $white;
    border-radius: $toast-border-radius;
    box-shadow: $toast-box-shadow;

    padding: 1rem;
    .Toastify__toast-body,
    .Toastify__close-button {
      color: $body-color;
    }

    .toastify-header {
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-wrapper {
        display: flex;
        align-items: center;

        .avatar svg {
          height: 0.85rem;
          width: 0.85rem;
        }
      }
      .toast-title {
        color: $headings-color;
        font-weight: 600;
        margin-left: 0.75rem;
        margin-bottom: 0;
      }
    }

    .toastify-body {
      color: $body-color;
      padding-left: 2.3rem;
      font-size: 0.85rem;
      font-family: $font-family-sans-serif;
    }

    .Toastify__close-button {
      opacity: 1;
      margin-top: 1px;
      margin-left: 0.5rem;
      svg {
        height: 0.85rem;
        width: 0.85rem;
        fill: $headings-color;
      }
      &:hover svg {
        fill: $headings-color;
      }
      &:focus {
        outline: 0;
      }
    }

    &.Toastify__toast--default {
      .toast-title {
        color: $primary;
      }
    }

    &.Toastify__toast--error {
      .toast-title {
        color: $danger;
      }
      .Toastify__progress-bar {
        background-color: $danger;
      }
    }

    @each $color_name, $color in $colors {
      @each $color_type, $color_value in $color {
        @if $color_type== 'base' {
          &.Toastify__toast--#{$color_name} {
            .toast-title {
              color: $color_value;
            }
            .Toastify__progress-bar {
              background-color: $color_value;
            }
          }
        }
      }
    }
  }

  // Progress Bar
  .Toastify__progress-bar {
    bottom: 0;
    border-top-right-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    &.Toastify__progress-bar--default {
      background: $primary;
    }
  }

  // Media Queries
  @media (max-width: 480px) {
    .Toastify__toast-container {
      .Toastify__toast + .Toastify__toast {
        margin-top: 1rem;
      }
    }
  }
`

export { SpinnerWrapper, ToastWrapper }
