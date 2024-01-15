# Snippets

```tsx
        <Controller
          control={control}
          name='company'
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='Company'
              margin='dense'
            />
          )}
        />
        <Controller
          control={control}
          name='role'
          render={({ field }: FieldType) => (
            <TextField
              {...field}
              fullWidth
              sx={{ maxWidth: 600 }}
              label='Role'
              margin='dense'
            />
          )}
        />

```
