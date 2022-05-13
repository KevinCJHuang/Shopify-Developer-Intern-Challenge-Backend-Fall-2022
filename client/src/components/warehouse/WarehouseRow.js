import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import WarehouseContext from '../../context/warehouse/warehouseContext';

const WarehouseRow = (props) => {
  const warehouseContext = useContext(WarehouseContext);
  const { name, city } = props.warehouse;
  return (
    <tr>
      <th>{name}</th>
      <td>{city}</td>
    </tr>
  );
};

export default WarehouseRow;
