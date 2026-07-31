import { inventoryProps } from '@/types/inventory';
import SpecialCard from './special-card';
import RegularCard from './regular-card';

interface InventoryProps {
  items: {
    crystalItems: inventoryProps[];
    nonCrystalItems: inventoryProps[];
  };
}

const Inventory: React.FC<InventoryProps> = ({ items }) => {
  const hasItems =
    items.crystalItems.length > 0 || items.nonCrystalItems.length > 0;

  return (
    <div className="mt-16 sm:mt-20">
      {hasItems && (
        <div className="mb-9 text-center sm:mb-12">
          <h1
            id="treasure-inventory-title"
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#704027] bg-[#fff1ca] px-5 py-3 text-2xl font-black tracking-tight text-[#633820] shadow-[0_6px_0_#704027,0_10px_24px_rgba(93,52,29,0.18)] sm:px-8 sm:text-4xl"
          >
            <span
              aria-hidden="true"
              className="size-3 rounded-full bg-[#e79a5b] shadow-[16px_-5px_0_#c77945,9px_8px_0_#f2bd72]"
            />
            쿠키런 보물 인벤토리
          </h1>
        </div>
      )}

      {items.crystalItems.length > 0 && (
        <section
          aria-labelledby="crystal-treasure-title"
          className="relative rounded-[2rem] border-[3px] border-[#704027] bg-[#fff3d6] p-4 shadow-[0_8px_0_#a16b35,0_14px_30px_rgba(102,57,32,0.15)] sm:p-7"
        >
          <div
            aria-hidden="true"
            className="absolute right-5 top-4 size-3 rounded-full bg-[#e8bd75]/50 shadow-[22px_8px_0_#e8bd75,42px_-2px_0_#d89d58]"
          />
          <div className="mb-6 text-center sm:text-left">
            <h2
              id="crystal-treasure-title"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#2b81a7] bg-[#dff7ff] px-4 py-2 text-xl font-black text-[#245b77] shadow-[0_4px_0_#2b81a7] sm:text-2xl"
            >
              <span
                aria-hidden="true"
                className="inline-block size-3 rotate-45 rounded-sm border border-white bg-[#43c8f3] shadow-[0_0_0_2px_#2b81a7]"
              />
              크리스탈 보물
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {items.crystalItems.map((item: inventoryProps) => (
              <SpecialCard
                key={item.name}
                name={item.name}
                count={item.count}
                expectedValue={item.expectedValue}
              />
            ))}
          </div>
        </section>
      )}

      {items.nonCrystalItems.length > 0 && (
        <section
          aria-labelledby="regular-treasure-title"
          className="relative mt-10 rounded-[2rem] border-[3px] border-[#704027] bg-[#fff3d6] p-4 shadow-[0_8px_0_#a16b35,0_14px_30px_rgba(102,57,32,0.15)] sm:p-7"
        >
          <div
            aria-hidden="true"
            className="absolute right-6 top-5 size-2.5 rounded-full bg-[#e8bd75]/60 shadow-[18px_-5px_0_#d89d58,34px_5px_0_#e8bd75]"
          />
          <div className="mb-6 text-center sm:text-left">
            <h2
              id="regular-treasure-title"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#b67632] bg-[#ffe5a3] px-4 py-2 text-xl font-black text-[#6b3b20] shadow-[0_4px_0_#b67632] sm:text-2xl"
            >
              <span
                aria-hidden="true"
                className="inline-block size-3 rounded-full bg-[#d9894e] shadow-[5px_-2px_0_#8d4d2d]"
              />
              일반 보물
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {items.nonCrystalItems.map((item: inventoryProps) => (
              <RegularCard
                key={item.name}
                name={item.name}
                count={item.count}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Inventory;
