import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <nav className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link
              href="/simulator/ready"
              className="text-white font-bold text-lg hover:text-yellow-300 transition-colors duration-300"
            >
              미래 기댓값 시뮬레이터
            </Link>
          </li>
          <li>
            <Link
              href="/calculator"
              className="text-white font-bold text-lg hover:text-green-300 transition-colors duration-300"
            >
              기댓값 계산기
            </Link>
          </li>
          <li>
            <Link
              href="/gacha"
              className="text-white font-bold text-lg hover:text-blue-300 transition-colors duration-300"
            >
              보물 뽑기 시뮬레이터
            </Link>
          </li>
          <li>
            <Link
              href="/auto"
              className="text-white font-bold text-lg hover:text-purple-300 transition-colors duration-300"
            >
              자동화 프로그램 다운로드
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
