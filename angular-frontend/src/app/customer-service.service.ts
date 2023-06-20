import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private url = 'https://localhost:7169/Customer';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }


    getCustomers(): Observable<Customer[]>{
      return this.http.get<Customer[]>(this.url)
        .pipe(tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
    }
 
  addCustomer(customer: Customer){
    return this.http.post<Customer>(this.url + '/', customer, this.httpOptions)
    .pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }


  deleteCustomer(id: Number): Observable<Customer>{
    return this.http.delete<Customer>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted customer id=${id}`)),
        catchError(this.handleError<Customer>('deleteCustomer'))
      );
  }

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
