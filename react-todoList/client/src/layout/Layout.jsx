import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const Layout = ({ children }) => { // children: 콘텐츠 들어갈 부분
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center">
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
  );
};

export default Layout;