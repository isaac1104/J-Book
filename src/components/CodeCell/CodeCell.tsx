import React, { useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview';
import bundle from '../../bundler';
import Resizable from '../Resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div>
        <CodeEditor
          initialValue='const a = 1;'
          onChange={value => setInput(value)}
        />
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
