// TODO: create here a typescript interface for an olympic country

export interface Country {
  country: string;
  id: number;
  participations: {
    athleteCount: number;
    city: string;
    id: number;
    medalsCount: number;
    year: number;
  }[];
}

export interface CountryWithMedals extends Country {
  totalMedals: number;
}

export type pieData = {
  name: string;
  value: number;
};

export type lineData = {
    name: string;
    series: {
      name: number;
      value: number;
    }[];
  }
