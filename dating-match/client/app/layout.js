import "./globals.css";
import InAppBrowserRedirect from "../src/components/InAppBrowserRedirect";

export const metadata = {
  title: "미결추 | 진짜 한국인과 데이트하기",
  description: "외국인에게 한국인과 만나는 데이트 기회를 연결합니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <InAppBrowserRedirect />
        {children}
      </body>
    </html>
  );
}
