'use client';

import React, { useEffect } from 'react';

type KakaoAdfitProps = {
  adUnit: string;
  adSize: ['300', '250'] | ['728', '90'] | ['320', '100'];
};

export default function KakaoAdfit({ adUnit, adSize }: KakaoAdfitProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
    document.body.appendChild(script);
  }, [adUnit]);

  return (
    <div className="text-center">
      <ins
        className="kakao_ad_area flex"
        style={{ display: 'none' }}
        data-ad-unit={adUnit}
        data-ad-width={adSize[0]}
        data-ad-height={adSize[1]}
      ></ins>
    </div>
  );
}
