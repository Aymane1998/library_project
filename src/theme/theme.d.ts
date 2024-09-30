import '@mui/material/styles';
import { Easing } from 'src/theme/Transition';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightest?: string;
    darkest?: string;
  }

  interface PaletteColor {
    lightest: string;
    darkest: string;
  }

  interface PaletteOptions {
    primary?: SimplePaletteColorOptions;
    // Ajoutez d'autres couleurs ici si nécessaire
  }

  interface Palette {
    primary: SimplePaletteColorOptions;
    // Ajoutez d'autres couleurs ici si nécessaire
  }

  export interface Transitions {
    easingCurves: {
      easeInOut: Easing;
      easeOut: Easing;
      easeIn: Easing;
      sharp: Easing;
    };
  }
}
