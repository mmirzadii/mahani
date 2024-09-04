import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormInput {
  names: string[];
}

// Define the validation schema using Yup
const validationSchema = Yup.object({
  names: Yup.array()
    .of(
      Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    )
    .required('At least one name is required')
    .min(1, 'At least one name is required'),
});

const NameListForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      names: [String(' ')], // Initialize with an empty string for the first name field
    },
    resolver: yupResolver(validationSchema), // Integrate Yup validation
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: 'names',
  });

  const onSubmit = (data: IFormInput) => {
    console.log('Submitted Names:', data.names);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="center" mb={2}>
          <Controller
            name={`names.${index}`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Name #${index + 1}`}
                variant="outlined"
                error={!!errors.names?.[index]}
                helperText={errors.names?.[index]?.message}
                fullWidth
              />
            )}
          />
          <IconButton
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        type="button"
        onClick={() => append('')}
        variant="contained"
        color="primary"
      >
        Add Name
      </Button>
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default NameListForm;
