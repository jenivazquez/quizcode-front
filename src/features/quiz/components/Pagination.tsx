import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import LastPageIcon from '@mui/icons-material/LastPage'

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const btnSx = (disabled: boolean) => ({
  color: disabled ? 'grey.300' : 'text.primary',
})

const Pagination = ({ page, totalPages, onPageChange }: Props) => {

  const isFirstPage = page === 0
  const isLastPage  = page >= totalPages - 1

  const buttonsBefore = [
    { title: 'Primera página', icon: <FirstPageIcon/>, disabled: isFirstPage, action: () => onPageChange(0) },
    { title: 'Página anterior', icon: <NavigateBeforeIcon/>, disabled: isFirstPage, action: () => onPageChange(page - 1) },
  ]

  const buttonsAfter = [
    { title: 'Página siguiente', icon: <NavigateNextIcon/>, disabled: isLastPage, action: () => onPageChange(page + 1) },
    { title: 'Última página', icon: <LastPageIcon/>, disabled: isLastPage, action: () => onPageChange(totalPages - 1) },
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
      {buttonsBefore.map(({ title, icon, disabled, action }) => (
        <Tooltip key={title} title={title}>
          <span>
            <IconButton size="small" onClick={action} disabled={disabled} sx={btnSx(disabled)}>
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}

      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
        Página <strong>{page + 1}</strong> de {totalPages}
      </Typography>

      {buttonsAfter.map(({ title, icon, disabled, action }) => (
        <Tooltip key={title} title={title}>
          <span>
            <IconButton size="small" onClick={action} disabled={disabled} sx={btnSx(disabled)}>
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Box>
  )
}

export default Pagination
