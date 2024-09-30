/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createTheme,
  ThemeProvider,
  Theme,
  darkScrollbar,
} from '@mui/material';
import { createContext, useMemo, useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MUILocaleData, supportedLocales } from './SupportedLocales';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { switchThemeMode } from '../store/navigation/navigationSlice';
import { createPalette } from '../theme/create-palette';
import { createTransitions } from '../theme/create-transition';
import { grey } from '@mui/material/colors';
import { useAppSelector } from '../hooks';

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {
    console.log('Toggle color mode called!');
  },
  setLocale: (locale: MUILocaleData) => {
    console.log('Set locale called with locale:', locale);
  },
  locale: supportedLocales[0],
});

export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useAppSelector((state) => state.nav.themeMode);
  const [locale, setLocale] = useState<MUILocaleData>(supportedLocales[0]);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        dispatch(switchThemeMode(mode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const palette = createPalette(mode);
  const transitions = createTransitions();

  useEffect(() => {
    document.dir = locale.direction;
  }, [locale.direction]);

  const theme: Theme = useMemo(
    () =>
      createTheme(
        {
          direction: locale.direction,
          palette,
          typography: {
            // fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            h1: {
              fontWeight: 600,
              fontSize: '2.5rem',
              lineHeight: 1.2,
              letterSpacing: '-0.01562em',
            },
            h2: {
              fontWeight: 600,
              fontSize: '2rem',
              lineHeight: 1.3,
              letterSpacing: '-0.00833em',
            },
            h3: {
              fontWeight: 600,
              fontSize: '1.75rem',
              lineHeight: 1.4,
              letterSpacing: '0em',
            },
            h4: {
              fontWeight: 600,
              fontSize: '1.5rem',
              lineHeight: 1.5,
              letterSpacing: '0.00735em',
            },
            h5: {
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: 1.5,
              letterSpacing: '0em',
            },
            h6: {
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.6,
              letterSpacing: '0.0075em',
            },
            body1: {
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.5,
              letterSpacing: '0.00938em',
            },
            body2: {
              fontWeight: 400,
              fontSize: '0.875rem',
              lineHeight: 1.43,
              letterSpacing: '0.01071em',
            },
          },
          shape: {
            borderRadius: 3,
          },

          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 960,
              lg: 1280,
              xl: 1920,
            },
          },

          components: {
            MuiCssBaseline: {
              styleOverrides: {
                html: {
                  ...darkScrollbar(
                    mode === 'light'
                      ? {
                          track: grey[200],
                          thumb: grey[400],
                          active: grey[400],
                        }
                      : undefined,
                  ),
                  scrollbarWidth: 'thin',
                },
              },
            },
          },
          transitions,

          mixins: {
            toolbar: {
              minHeight: 56,
              '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: 48,
              },
              '@media (min-width:600px)': {
                minHeight: 64,
              },
            },
          },
        },
        locale.muiCore as any,
        locale.muiDatePicker,
        locale.muiDataGrid,
      ),
    [mode, locale],
  );

  return (
    <MUIWrapperContext.Provider
      value={{
        toggleColorMode: muiWrapperUtils.toggleColorMode,
        locale,
        setLocale,
      }}
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={locale.dayJSLanguage}
          localeText={locale.muiDatePicker}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}
