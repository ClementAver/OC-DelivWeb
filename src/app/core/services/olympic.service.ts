import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import type { Country } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => {
        // Uncomment to simulate an error fetching datas.
        // throw new HttpErrorResponse({
        //   error: '/!\\',
        //   statusText: 'an error occurred fetching data.',
        // });
        this.olympics$.next(value);
      }),
      catchError((error: HttpErrorResponse) => {
        // https://v17.angular.io/guide/http-handle-request-errors
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
          );
        }
        // Return an observable with a user-facing error message.
        return throwError(
          () =>
            new Error(
              "Nous n'arrivons pas à récupérer les données pour l'instant, veuillez réessayer ultérieurement."
            )
        );
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
