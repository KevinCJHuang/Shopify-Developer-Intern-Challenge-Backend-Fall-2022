import { CREATE_WAREHOUSE, READ_WAREHOUSES } from '../types';

const WarehouseReducr = (state, action) => {
  switch (action.type) {
    case CREATE_WAREHOUSE: {
      return {
        ...state,
        warehouses: [...state.warehouses, action.payload],
      };
    }
    case READ_WAREHOUSES: {
      return {
        ...state,
        warehouses: action.payload,
      };
    }
    default:
      return state;
  }
};

export default WarehouseReducr;
