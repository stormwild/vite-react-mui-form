import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { SyntheticEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface FieldType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
}

interface IFormValue {
  firstname: string
  lastname: string
  address: string
  number: number
  work?: string
  company?: string
  role?: string
}

const defaultValues = {
  firstname: '',
  lastname: '',
  address: '',
  number: 0,
  work: 'unemployed',
  company: '',
  role: '',
}

const schema = yup.object().shape({
  firstname: yup.string().label('First Name').trim().required().min(3).max(64),
  lastname: yup.string().label('Last Name').trim().required().min(3).max(64),
  address: yup.string().label('Address').trim().required().min(3),
  number: yup.number().label('Number').required(),
  work: yup.string().label('Work').oneOf(['unemployed', 'employed']),
  company: yup.string().when('work', ([work], schema) => {
    if (work === 'employed') {
      return schema.required().min(3).max(64)
    }
    return schema.notRequired()
  }),
  role: yup.string().when('work', ([work], schema) => {
    if (work === 'employed') {
      return schema.required().min(3).max(64)
    }
    return schema.notRequired()
  }),
})

const CreateForm = () => {
  const { control, handleSubmit, watch, formState } = useForm<IFormValue>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  })

  const work = watch('work')
  console.log('work', work)

  const { errors } = formState
  const handleSubmission = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log('formState.isValid', formState.isValid)
  }

  return (
    <Container maxWidth='md'>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmission}
      >
        <Controller
          control={control}
          name='firstname'
          //   rules={{ required: true, minLength: 5 }}
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              error={!!errors.firstname}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='First Name'
              margin='dense'
              helperText={errors.firstname && `${errors.firstname?.message}`}
            />
          )}
        />
        {/* {errors.firstname && (
            <span style={{ color: 'red' }}>
              You need to enter at least 5 characters!
            </span>
          )} */}
        <Controller
          control={control}
          name='lastname'
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='Last Name'
              margin='dense'
            />
          )}
        />
        <Controller
          control={control}
          name='address'
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='Address'
              margin='dense'
            />
          )}
        />
        <Controller
          control={control}
          name='number'
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='Number'
              margin='dense'
              type='number'
            />
          )}
        />
        <FormControl sx={{ marginTop: 1, marginBottom: 0.7 }}>
          <InputLabel id='type-label'>Work</InputLabel>
          <Controller
            control={control}
            name='work'
            render={({ field }: FieldType) => (
              <Select
                sx={{ maxWidth: 600 }}
                margin='dense'
                {...field}
                type='select'
                labelId='type-label'
                label='Work'
              >
                <MenuItem value='employed'>Employed</MenuItem>
                <MenuItem value='unemployed'>Unemployed</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {work === 'employed' && (
          <>
            <Controller
              control={control}
              name='company'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  sx={{ maxWidth: 600 }}
                  label='Company'
                  margin='dense'
                  error={!!errors.company}
                  helperText={errors.company && `${errors.company.message}`}
                />
              )}
            />
            <Controller
              control={control}
              name='role'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  sx={{ maxWidth: 600 }}
                  label='Role'
                  margin='dense'
                  error={!!errors.role}
                  helperText={errors.role && `${errors.role.message}`}
                />
              )}
            />
          </>
        )}
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            maxWidth: '600px',
            padding: '10px',
            backgroundColor: '#67BE23',
            color: 'white',
            marginTop: '5px',
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default CreateForm
