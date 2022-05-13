import React, { useReducer } from 'react';
import axios from 'axios';
import WarehouseContext from './warehouseContext';
import WarehouseReducer from './warehouseReducer';

import { CREATE_WAREHOUSE, READ_WAREHOUSES } from '../types';

const WarehouseState = (props) => {
  const initialState = {
    warehouses: [],
  };

  const [state, dispatch] = useReducer(WarehouseReducer, initialState);

  const readWarehouses = async () => {
    try {
      const res = await axios.get('/warehouse');
      dispatch({
        type: READ_WAREHOUSES,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };
  const createWarehouse = async (warehouse) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/warehouse', warehouse, config);
      dispatch({
        type: CREATE_WAREHOUSE,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <WarehouseContext.Provider
      value={{
        warehouses: state.warehouses,
        createWarehouse: createWarehouse,
        readWarehouses: readWarehouses,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  );
};

export default WarehouseState;
