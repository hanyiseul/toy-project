import { Link } from "react-router-dom";


const Nav = ({menu}) => {
  return (
    <ul className="menu_list">
      {menu.map(item => {
        return (
          <li key={item.id}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        )
      })}
    </ul>
  );
};

export default Nav;