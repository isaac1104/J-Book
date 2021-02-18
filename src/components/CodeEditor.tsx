import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (getValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      language='javascript'
      theme='vs-dark'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      height='500px'
    />
  );
};

export default CodeEditor;
