import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Nav() {
  // const nav = [
  //   {
  //     id: "ProductList",
  //     title: "홈",
  //     imageUrl: ""
  //   },
  //   {
  //     id: "Setting",
  //     title: "My",
  //     imageUrl: ""
  //   }
  // ];
  const [nav, setNav] = useState([]);

  useEffect(() => {
    const navData = async () => {
      try {
        const response = await fetch("/data/nav.json");
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 문제가 발생했습니다.');
        }
        setNav(await response.json());
      } catch(error) {
        console.log('error');
      }
    }
    navData();
  });

  return (
    <NavStyle as="nav">
      <ul className="nav">
        {nav.map((navItem, index) => (
          <li key={index}>
            <NavLink className="search__link" to={`/pages/${navItem.id}`}>
              <img src={navItem.imageUrl} alt={`${navItem.title}`} />
              <span className="search__title"><strong>{navItem.title}</strong></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </NavStyle>
  );
}

const NavStyle = styled.div`
  border: 1px solid green;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  .nav {
    display: flex;
    justify-content: space-around;
    li {
      width: 100%;
    }
    .search__link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
  }
`