export interface RouteParams {
  path: string;
  isPrivate?: boolean;
  redirectPath?: string;
  page: string;
}

export const ROUTES_PORTFOLIO: Record<string, RouteParams> = {
  portfolioHome: { path: '/', page: 'PortfolioPage' },
  textfield: { path: '/textfield', page: 'TextfieldPage' },
  button: { path: '/button', page: 'ButtonPage' },
  date: { path: '/date', page: 'DatePage' },
  modal: { path: '/modal', page: 'ModalPage' },
  ui: { path: '/ui', page: 'UIPage' },
  chart: { path: '/chart', page: 'ChartPage' },
  table: { path: '/table', page: 'TablePage' },
  transition: { path: '/transition', page: 'TransitionPage' },
  snackalert: { path: '/snackalert', page: 'SnackAlertPage' },
  error: { path: '*', page: 'ErrorPage' },
};

export const ROUTES_AUTH: Record<string, RouteParams> = {
  login: { path: '/login', page: 'LoginPage' },
  reset: { path: '/reset/:token', page: 'ResetPasswordPage' },
  confirm: { path: '/confirm/:id', page: 'ConfirmAccountPage' },
};

export const ROUTES: Record<string, RouteParams> = {
  home: { path: '/', isPrivate: true, page: 'LandingPage' },
  error: { path: '*', page: 'ErrorPage' },
};
