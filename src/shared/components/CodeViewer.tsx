import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { Box } from '@mui/material'

interface CodeViewerProps {
  value: string
}

const CodeViewer = ({ value }: CodeViewerProps) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', minWidth: 0 }}>

      <Box sx={{ border: '1px solid', borderColor: 'rgba(0,0,0,0.15)', borderRadius: 1, p: 1,
        '& .cm-editor': { fontSize: 13 },
        '& .cm-scroller': { fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace' },
      }}>

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

    </Box>
  )
}

export default CodeViewer
