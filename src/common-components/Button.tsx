import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 0.42rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  line-height: 1.5;

  font-weight: 500;
  font-family: "Poppins", Helvetica, sans-serif;
  transition: all 0.2s;
  color: #777;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3;

  &.red {
    color: #fff;
    background-color: #f64e60;
  }

  &.teal {
    background-color: #1bc5bd;
    color: #fff;
  }

  &.purple {
    background-color: #8950fc;
    color: #fff;
  }

  &.orange {
    background-color: orange;
    color: #fff;
  }

  &.blue {
    color: #fff;
    background-color: #3699ff;
  }

  &.citron {
    color: #fff;
    background-color: #96a53a;
  }

  &.sand {
    color: #fff;
    background-color: #d09656;
  }

  &.primary {
    color: #fff;
    background-color: #3699ff;
  }

  &.danger {
    color: #fff;
    background-color: #f64e60;
  }

  &.warning {
    background-color: orange;
    color: #fff;
  }

  &.success {
    background-color: #1bc5bd;
    color: #fff;
  }

  &.info {
    background-color: #8950fc;
    color: #fff;
  }

  &.light {
    color: #80808f;
    background-color: #f3f6f9;
  }

  &.dark {
    color: #fff;
    background-color: #212121;
  }

  &.btn-lg {
    padding: 0.825rem 1.42rem;
    font-size: 1.08rem;
    line-height: 1.5;
  }

  &.btn-sm {
    /* font-size: 90%; */
    padding: 0.55rem 0.75rem;
    font-size: 12px;
    line-height: 1.35;
  }

  &.btn-circle {
    border-radius: 2rem;
  }

  &.btn-shadow {
    box-shadow: 0 9px 16px 0 rgba(27, 197, 189, 0.25) !important;
  }

  &:hover {
    filter: brightness(85%);
  }

  svg {
    margin: 0 3px !important;
  }

  &.right {
    margin-left: auto;
  }

  &.center {
    margin: 0 auto;
  }
`;

const Buttons = styled.div`
  display: flex;

  &.wrap {
    flex-wrap: wrap;
  }
  /* justify-content: space-around; */

  button {
    margin: 5px;
  }
`;
export { Button, Buttons };
