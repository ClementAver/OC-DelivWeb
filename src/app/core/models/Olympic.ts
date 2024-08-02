import { Participation } from './Participation';

export interface Country {
  country: string;
  id: number;
  participations: Participation[];
}

export type PieData = {
  name: string;
  value: number;
};

export type LineData = {
  name: string;
  series: {
    name: number;
    value: number;
  }[];
};
