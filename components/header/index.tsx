import Link from 'next/link';
import NavItem from './nav-item';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <nav className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          <li>
            <NavItem href="/simulator/ready" color="text-cyan-300">
              기댓값 시뮬레이터
            </NavItem>
          </li>
          <li>
            <NavItem href="/calculator" color="text-green-300">
              기댓값 계산기
            </NavItem>
          </li>
          <li>
            <NavItem href="/gacha" color="text-yellow-300">
              보물 뽑기 시뮬레이터
            </NavItem>
          </li>
          <li>
            <NavItem href="/automation" color="text-blue-300">
              자동화 프로그램
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
