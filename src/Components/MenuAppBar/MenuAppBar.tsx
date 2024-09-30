import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode'; // Ensure you import these icons
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Ensure you import these icons
import { useState } from 'react';

export default function MenuAppBar() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static" >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Where in the world?
            </Typography>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    aria-label="theme switch"
                  />
                }
                label={null}
              />
              {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
