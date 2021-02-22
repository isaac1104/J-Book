import './CodeCell.css';
import React, { useEffect } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview';
import Resizable from '../Resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  const { updateCell, createBundle } = useActions();

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);
    return () => clearTimeout(timer);
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className='code-cell-container'>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className='progress-cover'>
            <progress className='progress is-small is-primary' max='100%'>
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
