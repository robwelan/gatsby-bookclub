import styled from 'styled-components';

export const Button = styled.button`
  background: rebeccapurple;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 8px 16px;
  white-space: nowrap;

  ${props => props.block ? 'display: block; width: 100%;' : ''}

  &:hover {
    background: indigo;
  }
`;
