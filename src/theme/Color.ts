export interface Color {
  lightest: string;
  light: string;
  main: string;
  dark: string;
  darkest: string;
  contrastText: string;
}

export interface OptionColor extends Color {
  alpha4: string;
  alpha8: string;
  alpha12: string;
  alpha30: string;
  alpha50: string;
}
