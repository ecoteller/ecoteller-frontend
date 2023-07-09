import { useReducer, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import router from './router/Router';
import theme from './config/theme';
import { initializeApp } from "firebase/app";

import EcotellerContext from './store/ecoteller.context';
import reducer from './store/reducer';
import initialState from './store/initialState';
import firebaseConfig from './config/firebase.config';

// Styles
import './App.scss';

function App() {
  const app = initializeApp(firebaseConfig);
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <EcotellerContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </EcotellerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
