import {
  SET_INVENTORY,
  CREATE_INVENTORY,
  READ_INVENTORY,
  UPDATE_INVENTORY,
  DELETE_INVENTORY,
} from '../types';

const InventoryReducer = (state, action) => {
  switch (action.type) {
    case SET_INVENTORY: {
      return {
        ...state,
        inventory: action.payload,
      };
    }
    case CREATE_INVENTORY: {
      return {
        ...state,
        inventories: [...state.inventories, action.payload],
      };
    }
    case READ_INVENTORY: {
      return { ...state, inventories: action.payload };
    }
    case UPDATE_INVENTORY: {
      const { name, warehouse, quantity, _id } = action.payload;
      state.inventories.forEach((i) => {
        if (i._id === _id) {
          i.name = name;
          i.warehouse = warehouse;
          i.quantity = quantity;
        }
      });
      return {
        ...state,
        inventory: action.payload,
      };
    }
    case DELETE_INVENTORY:
      return {
        ...state,
        inventories: state.inventories.filter(
          (i) => i._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default InventoryReducer;
