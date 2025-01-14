import { ReactNode } from 'react';

interface GachaResultBoxProps {
  children: ReactNode;
}

export default function GachaResultBox({ children }: GachaResultBoxProps) {
  return (
    <div className="relative rounded-xl overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 animate-gradient"></div>
      <div className="relative bg-slate-50 bg-opacity-60 rounded-lg p-6 h-full flex flex-col justify-center">
        <h2 className="text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          뽑힌 보물
        </h2>
        <div className="gap-4 sm:gap-8 flex flex-wrap justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
