import './ActionBar.css';
import React from 'react';
import { useActions } from '../../hooks/useActions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className='action-bar'>
      <button
        className='button is-primary is-small'
        onClick={() => moveCell(id, 'up')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-up' />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => moveCell(id, 'down')}
      >
        <i className='fas fa-arrow-down' />
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => deleteCell(id)}
      >
        <i className='fas fa-times' />
      </button>
    </div>
  );
};

export default ActionBar;
