import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InventoryItem from './components/inventory/InventoryItem';
import InventoryState from './context/inventory/InventoryState';
import WarehouseState from './context/warehouse/WarehouseState';

const App = () => {
  return (
    <InventoryState>
      <WarehouseState>
        <div className='container'>
          <div className='card m-3'>
            <Router>
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/edit' element={<InventoryItem />}></Route>
              </Routes>
            </Router>
          </div>
        </div>
      </WarehouseState>
    </InventoryState>
  );
};

export default App;
