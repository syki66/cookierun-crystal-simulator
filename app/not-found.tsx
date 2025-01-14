import { Button } from '@/components/ui/button';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <h1 className="text-4xl md:text-7xl break-keep font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-10 mb-10">
        잘못된 경로로 접속했습니다
      </h1>
      <p className="flex justify-center">
        <Button className="w-96  h-16 my-10 text-white text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600">
          홈으로 돌아가기
        </Button>
      </p>
    </div>
  );
};

export default NotFound;
