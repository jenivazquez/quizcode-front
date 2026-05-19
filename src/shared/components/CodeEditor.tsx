import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { Box, FormHelperText, Typography } from '@mui/material'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  label?: string
  required?: boolean
  error?: boolean
  helperText?: string
}

const CodeEditor = ({ value, onChange, label, required, error, helperText }: CodeEditorProps) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', minWidth: 0 }}>

      <Box sx={{ border: '1px solid', borderColor: error ? 'error.main' : 'rgba(0,0,0,0.23)', borderRadius: 1, p: 1,
        '&:hover': { borderColor: error ? 'error.main' : 'rgba(0,0,0,0.87)' },
        '&:focus-within': { borderWidth: 2, borderColor: error ? 'error.main' : 'primary.main'},
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

      {label && (
        <Typography component="label" sx={{ position: 'absolute', top: -6, left: 10, fontSize: 12, lineHeight: 1, px: 0.5, bgcolor: 'white', color: error ? 'error.main' : 'text.secondary', pointerEvents: 'none' }}>
          {label}{required ? ' *' : ''}
        </Typography>
      )}

      {helperText && <FormHelperText error={error} sx={{ mx: '14px' }}>{helperText}</FormHelperText>}
    </Box>
  )
}

export default CodeEditor
