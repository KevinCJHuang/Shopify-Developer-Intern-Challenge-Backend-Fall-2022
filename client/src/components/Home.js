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
          <div className='row mb-3'>
            <div className='col-lg-7'>
              <InventoryBoard />
            </div>
            <div className='col-lg-5'>
              <WarehouseBoard />
            </div>
          </div>
          <p>
            P.S. The reason why this web app is not deployed on replit is
            because I encountered a series network problems on replit, such as
            <ul>
              <li>
                an "Invalid Host header" error when loading the React frontend
              </li>
              <li>
                a "net::ERR_CONNECTION_REFUSED" when React attempts to send an
                API request to the MongoDB backend through a proxy.
              </li>
            </ul>
            I researched online but couldn't find a nice and clean way to solve
            these problems. Therefore, I decided to use heroku (this), which is
            an equally stable and easy-to-use platform for deploying code. I
            hope this serves the purpose of code demo as well! :)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
