import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
export default function Contents() {
  return (
    <>
      <ContentsStyle as="main" className="container">
        <Outlet />
      </ContentsStyle>
    </>
  )
}

const ContentsStyle = styled.div`
  border: 1px solid blue;
  margin-top: 64px;
  padding: 20px;
  height: calc(100vh - 155px);
  box-sizing: border-box;
  overflow-y: scroll;
`