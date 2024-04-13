import { styled } from "styled-components";

export const NoIconInput = styled.input`
  position: relative;
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--purple50);
  padding: 1rem;
`;

export const DeleteInputXbutton = styled.button`
  position: absolute;
  right: 2rem;
  width: 1.5rem;
  height: 1.5rem;
  background: url(/Trainer/icons/deleteIconGrayBg.png) no-repeat center;
  background-position: center;
  background-size: contain;
`;
