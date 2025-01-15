import NavItem from './nav-item';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <nav className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          <li>
            <NavItem href="/simulator/ready" color="hover:text-blue-300">
              기댓값 시뮬레이션
            </NavItem>
          </li>
          <li>
            <NavItem href="/calculator" color="hover:text-yellow-300">
              기댓값 계산기
            </NavItem>
          </li>
          <li>
            <NavItem href="/gacha" color="hover:text-green-300">
              보물 뽑기 시뮬레이션
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
