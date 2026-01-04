'use client';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#73573f',
    },
    secondary: {
      main: '#3a3a3a',
    },
  },
  typography: {
    fontFamily: ['SF Pro Display', 'sans-serif'].join(','),
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
