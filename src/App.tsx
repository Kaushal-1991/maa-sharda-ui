import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import AppRoutes from './Routes/AppRoutes';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
