import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Country, lineData } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  // The RxJS method, "of(...values)", creates an Observable instance that synchronously delivers each of the values provided as arguments.
  public olympics$: Observable<Country> = of();
  country: string | null = '';
  countryH2: string = '';
  entries: number | null = 0;
  totalMedals: number | null = 0;
  totalAthletes: number | null = 0;

  chartData: lineData[] = [];

  // Will be displayed if something goes wrong fetching data.
  error: string | null = null;
  // While data is fetched.
  loading: string | null = 'chargement...';

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieves the route parameter "country".
    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country');
    });

    // Filters and assigns the right country.
    this.olympics$ = this.olympicService.loadInitialData().pipe(
      map((value) => {
        return value?.find((country: Country) => {
          return country.country.toLowerCase() === this.country;
        });
      }),
      tap((value) => {
        if (value) console.log(value);
      })
    );

    this.olympics$.subscribe({
      next: (data) => {
        if (data) {
          let totalMedals = data.participations.reduce(
            (count: number, participation: { medalsCount: number }) => {
              return count + participation.medalsCount;
            },
            0
          );
          let totalAthletes = data.participations.reduce(
            (count: number, participation: { athleteCount: number }) => {
              return count + participation.athleteCount;
            },
            0
          );

          if (this.country)
            this.countryH2 =
              this.country.charAt(0).toUpperCase() + this.country.slice(1);
          this.entries = data.participations.length;
          this.totalMedals = totalMedals;
          this.totalAthletes = totalAthletes;

          // format the data for the lineChart.
          if (this.country) {
            this.chartData = [
              {
                name:
                  this.country.charAt(0).toUpperCase() + this.country.slice(1),
                series: data.participations.map(
                  (participation: { medalsCount: number; year: number }) => {
                    return {
                      name: participation.year,
                      value: participation.medalsCount,
                    };
                  }
                ),
              },
            ];
          }

          this.loading = null;

          // Logger
          console.log('/////- formated values : -/////');
          console.log(this.entries);
          console.log(this.totalMedals);
          console.log(this.totalAthletes);
          console.log(this.chartData);
        }
      },
      error: (e) => {
        this.loading = null;
        this.error = e.message;
      },
    });
  }
}
