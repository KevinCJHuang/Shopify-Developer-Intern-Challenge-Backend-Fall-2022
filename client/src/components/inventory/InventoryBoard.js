import React, { useContext, useState } from 'react';
import InventoryRow from './InventoryRow';
import InventoryContext from '../../context/inventory/inventoryContext';
import WarehouseContext from '../../context/warehouse/warehouseContext';

const InventoryBoard = () => {
  const inventoryContext = useContext(InventoryContext);
  const { inventories, createInventory } = inventoryContext;
  const warehouseContext = useContext(WarehouseContext);
  const warehouses = warehouseContext.warehouses;

  const [inventoryState, setInventoryState] = useState({
    nameState: '',
    quantityState: '',
    warehouseState: warehouses.length ? warehouses[0].name : '',
  });
  const { nameState, quantityState, warehouseState } = inventoryState;

  const onSubmit = (e) => {
    e.preventDefault();
    createInventory({
      name: nameState,
      quantity: quantityState,
      warehouse: warehouses.filter((w) => w.name === warehouseState)[0]._id,
    });
  };

  const onChange = (e) => {
    setInventoryState({
      ...inventoryState,
      [e.target.name + 'State']: e.target.value,
    });
    console.log(e.target.name, e.target.value, inventoryState);
  };

  return (
    <div>
      <div className='card-header'>
        <h3>Inventories</h3>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Inventory Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Warehouse</th>
            <th scope='col'>Modification</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <InventoryRow key={inventory._id} inventory={inventory} />
          ))}
        </tbody>
      </table>
      <h5>Add New Inventory</h5>
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
            name='warehouse'
            onChange={onChange}
            value={warehouseState}
          >
            <option>Select a warehouse location</option>
            {warehouses.map((warehouse) => (
              <option value={warehouse.name} key={warehouse._id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          value='Add'
          className='btn btn-primary btn-block my-2'
        />
      </form>
    </div>
  );
};

export default InventoryBoard;
