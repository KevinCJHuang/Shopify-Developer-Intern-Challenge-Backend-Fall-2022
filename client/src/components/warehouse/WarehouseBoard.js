import React, { useContext, useState, useEffect } from 'react';
import WarehouseRow from './WarehouseRow';
import WarehouseContext from '../../context/warehouse/warehouseContext';

const WarehouseBoard = () => {
  const warehouseContext = useContext(WarehouseContext);
  const { warehouses, createWarehouse } = warehouseContext;

  useEffect(() => {
    warehouseContext.readWarehouses();
    console.log(warehouseContext.warehouses);
    // eslint-disable-next-line
  }, []);

  const [warehouseState, setWarehouseState] = useState({
    nameState: '',
    cityState: '',
  });
  const { nameState, cityState } = warehouseState;

  const onSubmit = (e) => {
    e.preventDefault();
    createWarehouse({
      name: nameState,
      city: cityState,
    });
  };

  const onChange = (e) =>
    setWarehouseState({
      ...warehouseState,
      [e.target.name + 'State']: e.target.value,
    });

  return (
    <div className='container'>
      <div className='card-header'>
        <h3>Warehouses</h3>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Warehouse Name</th>
            <th scope='col'>Location</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <WarehouseRow key={warehouse._id} warehouse={warehouse} />
          ))}
        </tbody>
      </table>
      <h5>Add New Warehouse</h5>
      <form onSubmit={onSubmit} className='form-inline'>
        <div className='form-group'>
          <label htmlFor='amount'>Warehouse Name</label>
          <input
            className='form-control'
            type='string'
            name='name'
            value={nameState}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Location</label>
          <input
            className='form-control'
            type='string'
            name='city'
            value={cityState}
            onChange={onChange}
            required
          />
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

export default WarehouseBoard;
