import styled from 'styled-components';

type TextProps = {
  lineThrough: boolean
}

export const Text = styled.div<TextProps>`
  cursor: default;
  text-decoration: ${props => props.lineThrough ? 'line-through' : 'none'};
  user-select: none;
  cursor: pointer;
`;
