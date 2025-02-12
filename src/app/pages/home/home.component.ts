import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country, PieData } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // The data initially fetched (as an Observable).
  public olympics$: Observable<Country[]> = of([]);
  subscription: Subscription | null = null;

  // The number of JOs
  entries: number | null = null;
  // The number of countries
  countries: number | null = null;

  chartData: PieData[] = [];

  // Will be displayed if something goes wrong fetching data.
  error: string | null = null;
  // While data is fetched.
  loading: string | null = 'chargement...';

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.loadInitialData();

    this.subscription = this.olympics$.subscribe({
      next: (data) => {
        this.entries = data[0]?.participations.length || 0;
        this.countries = data.length;
        this.chartData = mapper(data);

        this.loading = null;

        // Logger
        if (this.chartData.length > 0) {
          console.log('/////- formated values : -/////');
          console.log(this.entries);
          console.log(this.countries);
          console.log(this.chartData);
        }
      },
      error: (e) => {
        this.loading = null;
        this.error = e.message;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Used to navigate to the dynamic page of a country.
  toCountry(country: string): void {
    this.router.navigate(['/country', country]);
  }

  // Triggers when a pie slice is clicked.
  onSelect(event: PieData): void {
    const countryName = event.name.toLowerCase();
    this.toCountry(countryName);
  }
}

// Pie chart formater
function mapper(countries: Country[]): PieData[] {
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
