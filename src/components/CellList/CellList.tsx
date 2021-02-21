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
      {cells.map(cell => (
        <React.Fragment key={cell.id}>
          <AddCell nextCellId={cell.id} />
          <CellListItem cell={cell} />
        </React.Fragment>
      ))}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
