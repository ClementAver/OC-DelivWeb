import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/core/models/Olympic';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country: string | null = '';
  public olympics$: Observable<any> = of(null);

  chartData: any[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country');
    });

    this.olympics$ = this.olympicService.getOlympics().pipe(
      tap((value) => {
        console.log(value /* array */);
      }),
      map((value) => {
        return value?.map((country: any) => {
          console.log(country);
          let totalMedals = country.participations.reduce(
            (count: number, participation: { medalsCount: number }) => {
              return count + participation.medalsCount;
            },
            0
          );
          let totalAthletes = country.participations.reduce(
            (count: number, participation: { athleteCount: number }) => {
              return count + participation.athleteCount;
            },
            0
          );
          let entries = country.participations.length;
          return {
            ...country,
            totalMedals,
            totalAthletes,
            entries,
          };
        });
      }),
      tap((value) => console.log(value /* array */))
    );

    this.olympics$.subscribe(
      (data) => {
        if (data) {
          // Added check for data existence
          this.chartData = data.filter((country: { country: string }) => {
            // Correct filtering
            return country.country === this.country; // Comparison to filter by country
          })[0];
          console.log(this.chartData); // Log the filtered data
        }
      },
      (error) => {
        console.error(error); // Added error handling
      }
    );
    console.log(this.country);
    console.log(this.olympics$);
  }
}
