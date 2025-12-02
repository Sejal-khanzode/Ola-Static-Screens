import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme/theme';
import './App.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes';
import SnackbarAlert from './components/core/reusable/snackbar-alert/snackbar-alert';
import Loader from './components/core/reusable/loader/loader';
import RefreshToken from './routes/refresh-token/refresh-token';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter(routes);
  // const currentThemeMode = useAppSelector(state => state.userPreferences.theme);

  // const appliedTheme = currentThemeMode === 'dark' ? darkTheme : lightTheme;

  return (
    // <ThemeProvider theme={appliedTheme}>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <QueryClientProvider client={queryClient}>
          <Loader />
          <SnackbarAlert />
          <RouterProvider router={router} />
          <RefreshToken />
        </QueryClientProvider>
        </PersistGate> 
      </Provider>
    </ThemeProvider>
  );
}

export default App;
