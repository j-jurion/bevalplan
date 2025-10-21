import './App.css'
import Overview from './pages/Overview.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#208a3c'
    },
    secondary: {
      main: '#145926'
    }
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Overview />
    </ThemeProvider>
  )
}

export default App
