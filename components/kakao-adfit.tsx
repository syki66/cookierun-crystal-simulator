'use client';

import React, { useEffect } from 'react';

type KakaoAdfitProps = {
  adUnit: string;
};

export default function KakaoAdfit({ adUnit }: KakaoAdfitProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
    document.body.appendChild(script);
  }, [adUnit]);

  return (
    <ins
      className="kakao_ad_area"
      style={{ display: 'none' }}
      data-ad-unit={adUnit}
      data-ad-width="728"
      data-ad-height="90"
    ></ins>
  );
}
