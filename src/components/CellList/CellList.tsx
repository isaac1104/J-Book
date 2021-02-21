import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCell from '../AddCell';
import CellListItem from '../CellListItem';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {cells.map(cell => (
        <React.Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CellList;
