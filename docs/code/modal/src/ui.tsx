import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.13);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Panel = styled.div`
  border-radius: 3px;
  padding: 8px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  min-width: 200px;
`;
export const Body = styled.div`
  padding: 10px 0 10px;
`;
export const Footer = styled.div`
  text-align: right;
`;
