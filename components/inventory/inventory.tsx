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
      <div className="flex flex-wrap gap-4">
        {items.crystalItems.map((item: inventoryProps) => (
          <SpecialCard
            name={item.name}
            count={item.count}
            expectedValue={item.expectedValue}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {items.nonCrystalItems.map((item: inventoryProps) => (
          <RegularCard
            name={item.name}
            count={item.count}
            expectedValue={item.expectedValue}
          />
        ))}
      </div>
    </>
  );
};

export default Inventory;
