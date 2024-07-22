import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country, pieData } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // The data initially fetched (as an Observable).
  public olympics$: Observable<Country[]> = of([]);

  // The number of JOs
  entries: number | null = null;
  // The number of countries
  countries: number | null = null;

  chartData: pieData[] = [];

  // will be displayed if something goes wrong fetching data.
  error: string | null = null;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.loadInitialData()

    this.olympics$.subscribe({
      next: (data) => {
        this.entries = data[0]?.participations.length || 0;
        this.countries = data.length;
        this.chartData = mapper(data);

        // Logger
        if (this.chartData.length > 0) {
          console.log('/////- formated values : -/////');
          console.log(this.entries);
          console.log(this.countries);
          console.log(this.chartData);
        }
      },
      error: (e) => this.error = e.message,
    });
  }

  // Used to navigate to the dynamic page of a country.
  toCountry(country: string): void {
    this.router.navigate(['/country', country]);
  }

  // Triggers when a pie slice is clicked.
  onSelect(event: pieData): void {
    const countryName = event.name.toLowerCase();
    this.toCountry(countryName);
  }
}

// Pie chart formater
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
