import { Link, useNavigate } from 'react-router-dom';

import React, { useContext, useState } from 'react';
import InventoryContext from '../../context/inventory/inventoryContext';
import WarehouseContext from '../../context/warehouse/warehouseContext';

// import GithubContext from '../../context/github/githubContext';

const InventoryItem = (props) => {
  const inventoryContext = useContext(InventoryContext);
  const { inventory, updateInventory } = inventoryContext;

  const warehouseContext = useContext(WarehouseContext);
  const warehouseName = warehouseContext.warehouses.filter(
    (w) => w._id === inventory.warehouse
  )[0].name;

  const [inventoryState, setInventoryState] = useState({
    nameState: inventory.name,
    warehouseState: warehouseName,
    quantityState: inventory.quantity,
  });
  const { warehouseState, nameState, quantityState } = inventoryState;
  const onSubmit = (e) => {
    e.preventDefault();
    const warehouseId = warehouseContext.warehouses.filter(
      (w) => w.name === warehouseState
    )[0]._id;
    updateInventory({
      ...inventory,
      warehouse: warehouseId,
      name: nameState,
      quantity: quantityState,
    });
    navigate('/');
  };
  const navigate = useNavigate();

  const onChange = (e) => {
    setInventoryState({
      ...inventoryState,
      [e.target.name + 'State']: e.target.value,
    });
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <div className='div m-3'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='Name'>Name</label>
          <div className='input-group'>
            <input
              className='form-control'
              type='string'
              name='name'
              value={nameState}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Quantity'>Quantity</label>
          <div className='input-group'>
            <input
              className='form-control'
              type='string'
              name='quantity'
              value={quantityState}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Warehouse'>Warehouse</label>
          <select
            className='form-select'
            aria-label='Default select example'
            defaultValue={warehouseState}
            name='warehouse'
            onChange={onChange}
          >
            {warehouseContext.warehouses.map((warehouse) => (
              <option key={warehouse._id}>{warehouse.name}</option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          value='Save'
          className='btn btn-primary btn-block m-2'
        />
        <input
          type='submit'
          value='Cancel'
          className='btn btn-danger btn-block m-2'
          onClick={cancel}
        />
      </form>
    </div>
  );
};

export default InventoryItem;
