import { TableCell, TableSortLabel } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type SortDirection = 'asc' | 'desc'

interface SortTableHeaderCellProps {
  field: string
  sortField: string
  sortDirection: SortDirection
  onSort: (field: string) => void
  align?: 'left' | 'center'
  hideBelow?: 'sm' | 'md' | 'lg' | 'xl'
}

const SortTableHeaderCell = ({ field, sortField, sortDirection, onSort, align, hideBelow }: SortTableHeaderCellProps) => {

  const display = hideBelow ? { xs: 'none', [hideBelow]: 'table-cell' } : undefined

  return (

    <TableCell align={align} sx={{ fontWeight: 600, display,
      '& .MuiTableSortLabel-icon': { opacity: 0.1, fontSize: '1.5rem', ml: 0, ...(align === 'center' && { position: 'absolute', left: '100%' }) },
      '& .Mui-active .MuiTableSortLabel-icon': { opacity: 1, color: 'primary.dark' }, ...(align === 'center' && { '& .MuiTableSortLabel-root': { position: 'relative' } }),
    }}>

      <TableSortLabel active={sortField === field} direction={sortField === field ? sortDirection : 'asc'} onClick={() => onSort(field)} IconComponent={KeyboardArrowDownIcon}>
        {field}
      </TableSortLabel>

    </TableCell>

  )
}

export default SortTableHeaderCell
