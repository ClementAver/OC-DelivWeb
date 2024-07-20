// TODO: create here a typescript interface for an olympic country

interface Country {
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
