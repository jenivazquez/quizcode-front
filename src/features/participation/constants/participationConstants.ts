import type { ElementType } from 'react'
import type { ReviewStatus } from '../types/participation'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import WarningIcon from '@mui/icons-material/ReportGmailerrorred'

export const NAME_PATTERN = /^[A-Za-zÀ-ÿ '-]+$/
export const LETTER_PATTERN = /[a-zA-Z]/
export const NUMBER_PATTERN = /[0-9]/

export const COLOR_BOX_RANKING = ['#f5e4a0', '#d0d4d8', '#e8cbb5']
export const COLOR_TEXT_RANKING = ['#9a7800', '#4a4e52', '#8a5020']

export const REVIEW_STATUS: Record<ReviewStatus, { label: string, color: string, icon: ElementType }> = {
  PENDING:        { label: 'Pendiente de corrección',      color: 'text.secondary', icon: CancelOutlinedIcon },
  IA_REVIEWED:    { label: 'Corregido por IA',             color: 'primary.main',   icon: WarningIcon },
  OWNER_REVIEWED: { label: 'Corregido por el organizador', color: 'success.dark',   icon: TaskAltIcon },
}

export const INTERVAL_RANKING_MS = 5000
