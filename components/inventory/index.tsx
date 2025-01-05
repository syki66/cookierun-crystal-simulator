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
      <div className="flex flex-wrap gap-4 justify-center">
        {items.crystalItems.map((item: inventoryProps) => (
          <SpecialCard
            key={item.name}
            name={item.name}
            count={item.count}
            expectedValue={item.expectedValue}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {items.nonCrystalItems.map((item: inventoryProps) => (
          <RegularCard key={item.name} name={item.name} count={item.count} />
        ))}
      </div>
    </>
  );
};

export default Inventory;
