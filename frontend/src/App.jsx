import React,{ useMemo } from 'react';
import {BrowserRouter,Route,Routes,Navigate, Router} from 'react-router-dom'
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import Login from '@/scenes/Login';
import Layout from './Layout';
import TaskList from '@/scenes/TaskList';
function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route index element={<Login/>}/>
      <Route path="/" element={<Layout/>}>
      <Route path="/home" element={<TaskList/>}/> 
      </Route>
    </Routes>
      
  </ThemeProvider>
  </BrowserRouter>
  )
}

export default App
