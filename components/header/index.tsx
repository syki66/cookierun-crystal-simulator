import Image from 'next/image';
import Link from 'next/link';
import NavItem from './nav-item';

const Header = () => {
  return (
    <header className="relative z-40 border-b-[5px] border-amber-300 bg-gradient-to-b from-[#a85d2b] to-[#743716] px-3 py-3 shadow-[0_6px_0_#4a2512,0_12px_28px_rgb(74_37_18_/_24%)]">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-12">
        <Link
          href="/simulator/ready"
          className="group flex items-center gap-2.5 text-white"
        >
          <span className="rounded-2xl border-2 border-amber-200 bg-amber-50/95 p-1 shadow-[0_4px_0_#d97706] transition-transform group-hover:-rotate-3 group-hover:scale-105">
            <Image
              src="/branding/crystal-mark.webp"
              alt=""
              width={48}
              height={48}
              priority
              className="size-11 sm:size-12"
            />
          </span>
          <div>
            <div className="text-sm font-black leading-none [text-shadow:0_2px_0_#4a2512] sm:text-base">
              쿠키런 크리스탈 시뮬레이터
            </div>
            <div className="mt-1 text-[11px] font-bold tracking-wide text-amber-200">
              Pokugi Studio
            </div>
          </div>
        </Link>
        <nav aria-label="주요 메뉴" className="w-full lg:w-auto">
          <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
            <li>
              <NavItem href="/simulator/ready" color="">
                기댓값 시뮬레이션
              </NavItem>
            </li>
            <li>
              <NavItem href="/calculator" color="">
                기댓값 계산기
              </NavItem>
            </li>
            <li>
              <NavItem href="/gacha" color="">
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
