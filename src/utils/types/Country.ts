export interface Country {
  id: number;
  name: {
    common: string;
    official: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  latlng: number[];
  landlocked: boolean;
  area: number;
  population: number;
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
}
