import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: none;
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;

  &:focus, &:active {
    border: 1px solid rebeccapurple;
  }
`;
