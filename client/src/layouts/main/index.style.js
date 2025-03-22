import styled from '@emotion/styled';

export const MainLayoutWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111111;

  row-gap: 70px;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.width}px;
  column-gap: 40px;
`;

export const ContentWrapper = styled.div`
  width: ${props => props.width}px;
`;