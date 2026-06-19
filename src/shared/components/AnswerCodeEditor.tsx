import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { Box } from '@mui/material'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
}

const AnswerCodeEditor = ({ value, onChange }: CodeEditorProps) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', minWidth: 0 }}>

      <Box sx={{ border: '1px solid', borderColor: 'rgba(0,0,0,0.15)', borderRadius: 1, p: 1,
        '&:hover': { borderColor: 'rgba(0,0,0,0.30)' },
        '&:focus-within': { borderWidth: 2, borderColor: 'primary.main'},
        '& .cm-editor': { fontSize: 13 },
        '& .cm-editor.cm-focused': { outline: 'none' },
        '& .cm-scroller': { fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace', minHeight: 80 },
      }}>

        <CodeMirror
          value={value}
          extensions={[java()]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            indentOnInput: true,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
          }}
        />
      </Box>

    </Box>
  )
}

export default AnswerCodeEditor
