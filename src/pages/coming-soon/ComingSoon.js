import { Paper, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ComingSoon() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = () => reset(defaultValues);

  return (
    <div className="container mx-auto">
      <Paper className="sm:w-1/3 min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-12 sm:rounded-2xl sm:shadow mx-auto mt-5 mb-20">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-32" src="assets/images/logo/ecoteller-logo.png" alt="logo" />

          <Typography className="mt-12 text-2xl font-extrabold tracking-tight leading-tight">
            Almost there!
          </Typography>
          <Typography variant="body1" className="mt-2">
            Do you want to be notified when we are ready? Register below so we can notify you about
            the launch!
          </Typography>

          <div className="flex flex-col items-center py-4">ca</div>

          <form
            name="comingSoonForm"
            noValidate
            className="flex flex-col justify-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Notify me when you launch
            </Button>

            <Typography className="mt-12 text-xs font-light" color="text.secondary">
              This isn't a newsletter subscription. We will send one email to you when we launch and
              then you will be removed from the list.
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ComingSoon;
