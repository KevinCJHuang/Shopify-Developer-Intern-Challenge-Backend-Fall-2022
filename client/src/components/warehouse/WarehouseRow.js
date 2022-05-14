import React from 'react';

const WarehouseRow = (props) => {
  const { name, city } = props.warehouse;
  return (
    <tr>
      <th>{name}</th>
      <td>{city}</td>
    </tr>
  );
};

export default WarehouseRow;
