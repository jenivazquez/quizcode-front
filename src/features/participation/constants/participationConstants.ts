import type { ElementType } from 'react'
import type { ReviewStatus } from '../types/participation'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export const NAME_PATTERN = /^[A-Za-zÀ-ÿ '-]+$/
export const LETTER_PATTERN = /[a-zA-Z]/
export const NUMBER_PATTERN = /[0-9]/

export const PART_COLORS = {
  ranking: [
    { box: '#f5e4a0', text: '#9a7800' },
    { box: '#d0d4d8', text: '#4a4e52' },
    { box: '#e8cbb5', text: '#8a5020' },
  ],
  default: { box: '#f5f5f5', text: '#616161' },
  started: { box: '#ede7f6', text: '#6a1b9a' },
}

export const getPartColors = (index: number, isPartStarted: boolean) =>
  isPartStarted ? PART_COLORS.started : PART_COLORS.ranking[index] ?? PART_COLORS.default

export const REVIEW_STATUS: Record<ReviewStatus | 'ROOM_REVIEWED', { label: string, color: string, icon: ElementType }> = {
  PENDING:        { label: 'Corrección pendiente',       color: 'text.secondary', icon: CancelOutlinedIcon },
  IA_REVIEWED:    { label: 'Corregido por IA',              color: 'primary.main',   icon: ErrorOutlineIcon },
  IA_FAILED:      { label: 'Corrección fallida',        color: 'error.main',     icon: ErrorOutlineIcon },
  OWNER_REVIEWED: { label: 'Corregido por organizador',  color: 'success.dark',   icon: TaskAltIcon },
  ROOM_REVIEWED:  { label: 'Puntuación definitiva',         color: 'success.dark',   icon: TaskAltIcon },
}

export const INTERVAL_RANKING_MS = 5000
