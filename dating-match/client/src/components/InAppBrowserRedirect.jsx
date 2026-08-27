"use client";

import { useEffect } from "react";

// KakaoTalk's in-app WebView often fails to render modern web apps properly
// (blocked third-party cookies/storage, odd asset loading). The documented
// workaround is to bounce the user out to their real system browser.
export default function InAppBrowserRedirect() {
  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (!/KAKAOTALK/i.test(ua)) return;
    const currentUrl = window.location.href;
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(currentUrl)}`;
  }, []);

  return null;
}
