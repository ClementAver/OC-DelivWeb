import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { tap, map } from 'rxjs/operators';
import { Country, pieData } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Country[]> = of([]);

  chartData: pieData[] = [];
  view: [number, number] = [700, 400];
  entries: number | null = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      // tap((value) => console.log(value /* array */)),
      map((value) => {
        return (
          value?.map((country: Country) => {
            return country;
          }) || []
        );
      })
      // tap((value) => console.log(value /* array */))
    );

    this.olympics$.subscribe((data) => {
      this.chartData = mapper(data);
    });

    this.olympics$.subscribe((data) => {
      this.entries = data[0]?.participations.length || 0;
    });
  }
}

function mapper(countries: Country[]) {
  return countries.map((country) => {
    return {
      name: country.country,
      value: country.participations.reduce(
        (count: number, participation: { medalsCount: number }) => {
          return count + participation.medalsCount;
        },
        0
      ),
    };
  });
}
