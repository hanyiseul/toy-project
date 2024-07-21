import styled from 'styled-components';
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'

export default function Header() {
  // const options = [
	// 	{ label: '원서동', value: '원서동' },
	// 	{ label: '괴안동', value: '괴안동' }
	// ]

  return (
    <HeaderStyle as="header" className="header container">
      <Dropdown/>
      <div className="buttons">
        <Button icon='search' text='검색'/>
        {/* <Button icon='notice' text='알림'/> */}
      </div>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.div`
  border: 1px solid red;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`