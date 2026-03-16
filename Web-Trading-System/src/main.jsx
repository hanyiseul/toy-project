import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/style/index.scss'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  /**
   * BrowserRouter (검색의 시대니까 seo에 유리한 브라우저라우터 선택)
   *  - History API를 사용해 URL 업데이트
   *  - 동적인 페이지를 만들때 많이 사용
   *  - SEO에 최적화
   * 
   *  <-> HashRouter는 url의 해시 부분을 사용하여 url이 변경 되어도 서버에 요청하지 않고 클라이언트에서 라우팅 처리 
   *      : 서버에 # 뒤의 url은 서버에 보내지 않기 때문에 seo에 불리
   * 
   * History API
   *  - 브라우저에서 페이지 탐색 기록을 조작할 수 있도록 제공하는 JavaScript API
   *  - 페이지를 새로고침하지 않고 브라우저의 주소를 변경, 뒤로 가기 & 앞으로 가기 기능
   */
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)