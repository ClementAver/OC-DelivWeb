import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { tap, map } from 'rxjs/operators';

type LegendPosition = 'right' | 'below';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  chartData: any[] = [];
  view: [number, number] = [700, 400];


  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
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
          return {
            name: country.country,
            value: totalMedals,
          };
        });
      }),
      tap((value) => console.log(value /* array */))
    );

    this.olympics$.subscribe((data) => (this.chartData = data));
  }

  onSelect(event: Event): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(event)));
  }

  onActivate(event: Event): void {
    console.log('Activate', JSON.parse(JSON.stringify(event)));
  }

  onDeactivate(event: Event): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(event)));
  }
}
