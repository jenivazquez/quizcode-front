import type { RoomStatus } from '../types/room'

export const STATUS_LABEL: Record<RoomStatus, string> = {
  CREATED: 'Borrador',
  OPENED:  'Abierta',
  PAUSED:  'Pausada',
  CLOSED:  'Cerrada',
}

export const sxStatusChip: Record<RoomStatus, object> = {
  CREATED: { color: '#757575',    borderColor: '#757575',    minWidth: 90, fontSize: '0.875rem' },
  OPENED:  { color: 'success.dark', borderColor: 'success.dark', minWidth: 90, fontSize: '0.875rem' },
  PAUSED:  { color: 'primary.dark', borderColor: 'primary.dark', minWidth: 90, fontSize: '0.875rem' },
  CLOSED:  { color: 'error.main',   borderColor: 'error.main',   minWidth: 90, fontSize: '0.875rem' },
}
