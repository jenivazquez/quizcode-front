import {
  Box, TextField, Grid, Paper, Typography,
  FormControl, FormHelperText, InputLabel, Select, MenuItem,
  IconButton, Tooltip, Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RadioOption from './RadioOption'
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form'
import { type QuestionFormData } from '../schemas/questionSchema'
import { QUESTION_TYPE_LABELS, OPTION_CODES } from '../constants/questionConstants'
import { QuestionType } from '../types/question'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import CodeEditor from '../../../shared/components/CodeEditor'

interface QuestionFormProps {
  form: UseFormReturn<QuestionFormData>
  onSubmit: (data: QuestionFormData) => Promise<void>
  loading: boolean
  error: string | null
  isUpdating: boolean
  onCancel: () => void
}

const QuestionForm = ({ form, onSubmit, loading, error, isUpdating, onCancel }: QuestionFormProps) => {

  const { register, handleSubmit, control, watch, setValue, formState: { errors, isDirty } } = form
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'options' })

  const type = watch('type')
  const options = watch('options')

  const handleTypeOnChange = (newType: QuestionType) => {
    setValue('type', newType, { shouldDirty: true })
    if (newType !== QuestionType.EDIT_CODE) {
      const minOptions = newType === QuestionType.MULTIPLE_CHOICE ? 3 : 2
      const optionsWithValue = options.filter(o => o.value.trim() !== '')
      const numNewOptions = Math.max(0, minOptions - optionsWithValue.length)
      const finalOptions = [...optionsWithValue, ...Array.from({ length: numNewOptions }, () => ({ value: '', isValid: false }))]
      if (finalOptions.length !== options.length) replace(finalOptions)
    }
  }

  const handleValidOnChange = (index: number) => {
    if (type === QuestionType.SINGLE_CHOICE) {
      fields.forEach((_, i) => setValue(`options.${i}.isValid`, i === index, { shouldDirty: true }))
    } else {
      setValue(`options.${index}.isValid`, !options[index]?.isValid, { shouldDirty: true })
    }
  }

  return (

    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'grey.100', px: 3, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600}>
          {isUpdating ? 'Modificar pregunta' : 'Crear pregunta'}
        </Typography>
        <Tooltip title="Cerrar">
          <IconButton onClick={onCancel} sx={{ position: 'absolute', right: 12 }}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ p: 3, pt: 4 }}>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>

            <ErrorAlert message={error} />

            <Grid size={8}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.type}>
                    <InputLabel>Tipo</InputLabel>
                    <Select {...field} label="Tipo" onChange={(event) => handleTypeOnChange(event.target.value)}>
                      {Object.values(QuestionType).map(type => (
                        <MenuItem key={type} value={type}> {QUESTION_TYPE_LABELS[type]} </MenuItem>
                      ))}
                    </Select>
                    {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={4}>
              <Controller
                name="score"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Puntuación"
                    type="number"
                    required
                    fullWidth
                    slotProps={{ htmlInput: { min: 1 } }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.score}
                    helperText={errors.score?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Enunciado"
                required
                fullWidth
                multiline
                minRows={3}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('statement')}
                error={!!errors.statement}
                helperText={errors.statement?.message}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name="baseCode"
                control={control}
                render={({ field }) => (
                  <CodeEditor
                    label={'Código base'}
                    required={type === QuestionType.EDIT_CODE}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!errors.baseCode}
                    helperText={errors.baseCode?.message}
                  />
                )}
              />
            </Grid>

            {type !== QuestionType.EDIT_CODE && (

              <Grid size={12}>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                  {fields.map((field, index) => (
                    <RadioOption
                      key={field.id}
                      letter={OPTION_CODES[index]}
                      isValid={options[index]?.isValid ?? false}
                      onChangeValid={() => handleValidOnChange(index)}
                      onRemove={() => remove(index)}
                      removeDisabled={fields.length <= (type === QuestionType.SINGLE_CHOICE ? 2 : 3)}
                      register={register(`options.${index}.value`)}
                      fieldError={errors.options?.[index]?.value}
                    />
                  ))}
                </Box>

                {errors.options?.root?.message && (
                  <Typography variant="caption" color="error" display="block" sx={{ mt: 0.7, ml:2 }}>{errors.options.root.message}</Typography>
                )}

                <Button onClick={() => append({ value: '', isValid: false })} disabled={fields.length >= OPTION_CODES.length} size="small" startIcon={<AddIcon />} sx={{ mt: 1.5 }} >
                  Añadir opción
                </Button>

              </Grid>
            )}

            <Grid size={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button type="submit" variant="contained" disabled={loading || (isUpdating && !isDirty)}>
                  {isUpdating ? 'Guardar cambios' : 'Crear pregunta'}
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}

export default QuestionForm
