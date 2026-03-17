import Nav from "@/components/Nav/Nav";
import menu from "@/assets/mocks/menu.json";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <div className="logo">WTS</div>
        <span>Web Trading System</span>
      </h1>
      <Nav menu={menu}/>
    </header>
  );
};

export default Header;