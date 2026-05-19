import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { Box } from '@mui/material'

interface CodeViewerProps {
  value: string
}

const CodeViewer = ({ value }: CodeViewerProps) => {
  return (
    <Box  sx={{'& .cm-editor': { fontSize: 13 }, '& .cm-scroller': { fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace' } }}>
      <CodeMirror
        value={value}
        extensions={[java()]}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          autocompletion: false,
          bracketMatching: false,
          closeBrackets: false,
          indentOnInput: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
      />
    </Box>
  )
}

export default CodeViewer
