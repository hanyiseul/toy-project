import Header from './layouts/Header';
import Contents from './layouts/Contents';
import Nav from './layouts/Nav';

export default function NotFoundPage () {
  return (
    <>
      <Header />
      <Contents className="container">
      <main className="content">
          <div className="content__blocks">
            <div className="error">
              <h1>페이지를 찾을 수 없습니다.</h1>
            </div>
          </div>
        </main>  
      </Contents>
      <Nav/>
    </>
  )
}
