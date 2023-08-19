import { useState, forwardRef } from 'react';
import { Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByChild, equalTo, get, push } from 'firebase/database';

// import 'firebase/database';
import Countdown from '../../components/Countdown';
import firebaseConfig from '../../config/firebase.config';

const Alert = forwardRef(function Alert(props, currentRef) {
  return <MuiAlert elevation={6} ref={currentRef} variant="filled" {...props} />;
});

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ComingSoon() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const onSubmit = async ({ email }) => {
    try {
      // Check if the email already exists in the database
      // Check if the email already exists in the database
      const emailRef = ref(database, 'users');
      const emailQuery = query(emailRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);

      if (!snapshot.exists()) {
        // Save the email field to the Firebase database
        await push(ref(database, 'users'), {
          email,
        });
      }
      setSnackbarConfig({
        open: true,
        message: 'Thank you for registering. We will notify you when we launch!',
        severity: 'success',
      });
    } catch (err) {
      console.log(err);
      setSnackbarConfig({
        open: true,
        message: 'Something went wrong. Please try again later.',
        severity: 'error',
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Paper className="sm:w-1/2 min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-12 sm:rounded-2xl sm:shadow mx-auto mt-5 mb-20">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-32" src="assets/images/logo/ecoteller-logo.png" alt="logo" />

          <Typography className="mt-12 text-2xl font-extrabold tracking-tight leading-tight">
            We are launching Ecoteller.
          </Typography>
          <Typography variant="body1" className="mt-2">
            Use your plate and plant it ! Do you want to be notified when we are ready? Register
            below so we can notify you about the launch!
          </Typography>

          <div className="flex flex-col items-center py-4">
            <Countdown endDate="2023-10-01" />
          </div>

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
      <Snackbar
        open={snackbarConfig.open}
        autoHideDuration={3000}
        onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
      >
        <Alert severity={snackbarConfig.severity}>{snackbarConfig.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default ComingSoon;
