import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import '@mantine/notifications/styles.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AppRoutes from './Routes/AppRoutes';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import Store from './Store';
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({});

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <PrimeReactProvider>
            <AppRoutes />
            <Notifications position="top-center" />
          </PrimeReactProvider>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
