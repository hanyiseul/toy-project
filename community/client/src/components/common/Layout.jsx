import Header from '../Header/Header.jsx';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <div className="container">
        {children}
      </div>
    </>
  )
}

export default Layout