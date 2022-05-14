import React, { useEffect, useContext } from 'react';
import InventoryBoard from './inventory/InventoryBoard';
import WarehouseBoard from './warehouse/WarehouseBoard';

import InventoryContext from '../context/inventory/inventoryContext';

const Home = () => {
  const inventoryContext = useContext(InventoryContext);
  useEffect(() => {
    inventoryContext.readInventories();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='card border-0'>
          <div className='card-body '>
            <h2 className='card-title'>Inventory Tracker</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-7'>
            <InventoryBoard />
          </div>
          <div className='col-lg-5'>
            <WarehouseBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
