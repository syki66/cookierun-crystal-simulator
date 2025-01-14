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
  return (
    <>
      <div className="mt-20">
        {(items.crystalItems.length > 0 ||
          items.nonCrystalItems.length > 0) && (
          <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            쿠키런 보물 인벤토리
          </h1>
        )}
        {items.crystalItems.length > 0 && (
          <>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-300 pb-2 inline-block">
                크리스탈 보물
              </h2>
            </div>
            <div className="gap-4 sm:gap-8 flex flex-wrap justify-center">
              {items.crystalItems.map((item: inventoryProps) => (
                <SpecialCard
                  key={item.name}
                  name={item.name}
                  count={item.count}
                  expectedValue={item.expectedValue}
                />
              ))}
            </div>
          </>
        )}
        {items.nonCrystalItems.length > 0 && (
          <>
            <div className="text-center sm:text-left mt-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-300 pb-2 inline-block">
                일반 보물
              </h2>
            </div>
            <div className="gap-4 flex flex-wrap justify-center">
              {items.nonCrystalItems.map((item: inventoryProps) => (
                <RegularCard
                  key={item.name}
                  name={item.name}
                  count={item.count}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Inventory;
