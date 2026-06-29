import { useState, useRef, useEffect } from 'react'
import {
  Box, TextField, Button, Typography, Paper,
  CircularProgress, Divider, useMediaQuery, type Theme,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { useAiChat } from '../hooks/useAiChat'
import type { UseFormReturn } from 'react-hook-form'
import type { QuestionFormData } from '../schemas/questionSchema'

const RIGHT_PANEL_SIZE = '360px'
const BOTTOM_PANEL_SIZE = '220px'

interface AIChatProps {
  questionForm: UseFormReturn<QuestionFormData>
}

const AIChat = ({ questionForm }: AIChatProps) => {

  const { messages, loading, error, send } = useAiChat(questionForm)
  const [isOpen, setIsOpen] = useState(true)
  const [input, setInput] = useState('')

  const isBottomPanel = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const lastMessagePos = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = document.getElementById('page-content')
    if (!el) return
    el.style.transition = isBottomPanel ? (isOpen ? '' : 'padding-bottom 0.3s ease') : 'margin-right 0.3s ease'
    el.style.paddingBottom = isBottomPanel ? (isOpen ? BOTTOM_PANEL_SIZE : '0') : '0'
    el.style.marginRight = isBottomPanel ? '0' : (isOpen ? RIGHT_PANEL_SIZE : '0')
    if (isBottomPanel && isOpen) requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
    return () => { el.style.marginRight = '0'; el.style.paddingBottom = '0'; el.style.transition = '' }
  }, [isOpen, isBottomPanel])

  useEffect(() => {
    lastMessagePos.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <>
      <Box onClick={() => setIsOpen(prev => !prev)}
        sx={{
          position: 'fixed', zIndex: 1000, cursor: 'pointer', bgcolor: '#e3d8ecAA', color: 'primary.dark', display: 'flex',
          ...(isBottomPanel
            ? { bottom: isOpen ? BOTTOM_PANEL_SIZE : 0, left: '50%', transform: 'translateX(-50%)', transition: 'bottom 0.3s ease', borderRadius: '8px 8px 0 0', px: 3, py: 0.25 }
            : { right: isOpen ? RIGHT_PANEL_SIZE : 0, top: '50%', transform: 'translateY(-50%)', transition: 'right 0.3s ease', borderRadius: '8px 0 0 8px', px: 0.25, py: 3 }
          ),
        }}>
        {isBottomPanel
          ? (isOpen ? <KeyboardArrowDownIcon fontSize='medium' /> : <KeyboardArrowUpIcon fontSize='medium' />)
          : (isOpen ? <ChevronRightIcon fontSize='medium' /> : <ChevronLeftIcon fontSize='medium' />)
        }
      </Box>

      <Paper sx={{ position: 'fixed', zIndex: 1200, transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        ...(isBottomPanel
          ? { bottom: 0, left: 0, right: 0, height: BOTTOM_PANEL_SIZE, borderRadius: 0, transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }
          : { right: 0, top: 0, height: '100vh', width: RIGHT_PANEL_SIZE, borderRadius: 0, transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }
        ),
      }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 2, py: isBottomPanel ? 1: 2.4, flexShrink: 0, bgcolor: '#e3d8ecAA' }}>
          <AutoAwesomeIcon color='primary' fontSize='small' />
          <Typography variant='body1' fontWeight={600}>Asistente de IA</Typography>
          <AutoAwesomeIcon color='primary' fontSize='small' sx={{ transform: 'scaleX(-1)' }} />
        </Box>

        <Divider />

        <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: '#e3d8ec30', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>

          {messages.length === 0 && (
            <Typography variant='body2' color='text.secondary'>
              Describe qué tipo de pregunta quieres generar y el formulario se rellenará automáticamente.
            </Typography>
          )}

          {messages.map((message, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper sx={{ px: 1.5, py: 0.75, maxWidth: '85%', borderRadius: 2, bgcolor: message.role === 'user' ? 'primary.extralight' : 'grey.50', color: 'text.primary' }}>
                <Typography variant='body2'>{message.text}</Typography>
              </Paper>
            </Box>
          ))}

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Paper sx={{ px: 1.5, py: 1, bgcolor: 'grey.50', borderRadius: 2 }}>
                <CircularProgress size={14} />
              </Paper>
            </Box>
          )}

          <div ref={lastMessagePos} />

        </Box>

        {error && <ErrorAlert message={error} />}

        <Divider />

        <Box sx={{ px: 1.5, py: 1.5, flexShrink: 0, display: 'flex', bgcolor: '#e3d8ec30'}}>

          <TextField
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && input.trim()) { e.preventDefault(); setInput(''); send(input.trim()) } }}
            placeholder='Escribe tu mensaje...'
            fullWidth
            size='small'
            multiline
            maxRows={3}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '4px 0 0 4px', bgcolor: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.light', borderWidth: '1px' },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: '1px' },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: '1px' },
            }}
          />

          <Button disableElevation variant='contained' onClick={() => { setInput(''); send(input.trim()) }} disabled={!input.trim() || loading} sx={{ minWidth: 0, px: 1.5, alignSelf: 'stretch', borderRadius: '0 4px 4px 0', color: 'primary.dark' }} >
            <SendIcon fontSize='small' />
          </Button>

        </Box>

      </Paper>

    </>

  )
}

export default AIChat
