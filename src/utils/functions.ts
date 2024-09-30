import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from 'src/utils/types/decodedToken';
import 'dayjs/locale/fr';
import { Theme, Transitions } from '@mui/material/styles';

export const decodeToken = (token: string): DecodedToken => {
  const decoded = jwt_decode(token) as DecodedToken;

  return decoded;
};

export const convertFramerEasing = (
  easing: keyof Transitions['easingCurves'],
  theme: Theme,
): number[] => theme.transitions.easingCurves[easing].framer;

function createDateFromFormat(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);

  return new Date(year, month - 1, day);
}

export function dateComparator(a: string, b: string) {
  // Convertir les dates au format "jj/mm/aaaa" en objets Date
  const dateA = createDateFromFormat(a);
  const dateB = createDateFromFormat(b);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }

  return 0;
}

export function convertDateToDayjs(dateStr: string): string {
  // Analyse de la date en utilisant le format "yyyy-mm-dd"
  const parsedDate = dayjs(dateStr, { locale: 'fr' });

  // Formatage de la date en "jj/mm/aaaa"
  const formattedDate = parsedDate.format('DD/MM/YYYY');

  return formattedDate;
}

export const convertBoolean = (value: boolean) => (value ? 'Oui' : 'Non');
