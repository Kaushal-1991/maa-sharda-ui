import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';
import AppRoutes from './Routes/AppRoutes';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
