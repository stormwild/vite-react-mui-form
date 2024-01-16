import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// interface FieldType {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   field: any
// }

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
  //   console.log('work', work)

  const { errors } = formState
  const handleSubmission = (data: IFormValue) =>
    console.log('handleSubmission:data', data)

  return (
    <Stack component='form' onSubmit={handleSubmit(handleSubmission)}>
      <Controller
        control={control}
        name='firstname'
        //   rules={{ required: true, minLength: 5 }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label='First Name'
            margin='dense'
            error={!!errors.firstname}
            helperText={errors.firstname && `${errors.firstname?.message}`}
          />
        )}
      />
      <Controller
        control={control}
        name='lastname'
        render={({ field }) => (
          <TextField {...field} fullWidth label='Last Name' margin='dense' />
        )}
      />
      <Controller
        control={control}
        name='address'
        render={({ field }) => (
          <TextField {...field} fullWidth label='Address' margin='dense' />
        )}
      />
      <Controller
        control={control}
        name='number'
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
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
          render={({ field }) => (
            <Select
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
          padding: '10px',
          backgroundColor: '#67BE23',
          color: 'white',
          marginTop: '5px',
        }}
      >
        Submit
      </Button>
    </Stack>
  )
}

export default CreateForm
