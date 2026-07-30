import Image from 'next/image';
import Link from 'next/link';
import NavItem from './nav-item';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 p-3 shadow-lg">
      <div className="container mx-auto flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
        <Link
          href="/simulator/ready"
          className="flex items-center gap-2 text-white"
        >
          <Image
            src="/branding/crystal-mark.webp"
            alt=""
            width={48}
            height={48}
            priority
            className="size-12"
          />
          <div>
            <div className="text-lg font-black leading-none sm:text-xl">
              쿠키런 크리스탈 시뮬레이터
            </div>
            <div className="mt-1 text-xs text-white/80">Pokugi Studio</div>
          </div>
        </Link>
        <nav>
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <li>
              <NavItem href="/simulator/ready" color="hover:text-blue-200">
                기댓값 시뮬레이션
              </NavItem>
            </li>
            <li>
              <NavItem href="/calculator" color="hover:text-yellow-200">
                기댓값 계산기
              </NavItem>
            </li>
            <li>
              <NavItem href="/gacha" color="hover:text-green-200">
                보물 뽑기 시뮬레이션
              </NavItem>
            </li>
            <li>
              <NavItem href="https://deposit.pokugi.com/" color="">
                다른 제품 구경가기
              </NavItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
