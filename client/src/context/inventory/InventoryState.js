import React, { useReducer } from 'react';
import axios from 'axios';
import InventoryContext from './inventoryContext';
import InventoryReducer from './inventoryReducer';

import {
  SET_INVENTORY,
  CREATE_INVENTORY,
  READ_INVENTORY,
  UPDATE_INVENTORY,
  DELETE_INVENTORY,
} from '../types';

const InventoryState = (props) => {
  const initialState = {
    inventories: [],
    inventory: null,
  };

  const [state, dispatch] = useReducer(InventoryReducer, initialState);

  const setInventory = (inventory) => {
    dispatch({
      type: SET_INVENTORY,
      payload: inventory,
    });
  };

  const createInventory = async (inventory) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/inventory', inventory, config);
      dispatch({
        type: CREATE_INVENTORY,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  const readInventories = async () => {
    try {
      const res = await axios.get('/inventory');
      dispatch({
        type: READ_INVENTORY,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  const updateInventory = async (inventory) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/inventory/${inventory._id}`,
        inventory,
        config
      );
      dispatch({
        type: UPDATE_INVENTORY,
        payload: res.data,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  const deleteInventory = async (inventory) => {
    try {
      await axios.delete(`/inventory/${inventory._id}`);
      dispatch({
        type: DELETE_INVENTORY,
        payload: inventory,
      });
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        inventories: state.inventories,
        inventory: state.inventory,
        createInventory: createInventory,
        readInventories: readInventories,
        updateInventory: updateInventory,
        deleteInventory: deleteInventory,
        setInventory: setInventory,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryState;
