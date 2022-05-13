import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryContext from '../../context/inventory/inventoryContext';
import WarehouseContext from '../../context/warehouse/warehouseContext';

const InventoryRow = (props) => {
  const inventoryContext = useContext(InventoryContext);
  const warehouseContext = useContext(WarehouseContext);

  const { warehouse, name, quantity } = props.inventory;
  const { setInventory, deleteInventory } = inventoryContext;
  const warehouseName = warehouseContext.warehouses.length
    ? warehouseContext.warehouses.filter((w) => w._id === warehouse)[0].name
    : '';

  const navigate = useNavigate();
  const deleteOnClick = (e) => {
    e.preventDefault();
    deleteInventory(props.inventory);
  };
  const editOnClick = (e) => {
    setInventory(props.inventory);
    navigate('./edit');
  };
  return (
    <tr>
      <th>{name}</th>
      <td>{quantity}</td>
      <td>{warehouseName}</td>
      <td>
        <div className='row'>
          <div className='col'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={editOnClick}
            >
              Edit
            </button>
          </div>
          <div className='col'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={deleteOnClick}
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
