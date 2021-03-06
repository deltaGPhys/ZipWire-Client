import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
 export const apiUrl = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class AddAccountService {

  @Inject(apiUrl) private apiUrl: string;
private createCheckingUrl: string = apiUrl+"/accounts/checkingCreated";
private createSavingsUrl: string = apiUrl+"/accounts/savingsCreated";

httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

constructor(private http: HttpClient) { }

addCheckingAccount(account:Account):Observable<Account>{
  return this.http.post<Account>(this.createCheckingUrl, account, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<Account>('addCheckingAccount')));
}

addSavingsAccount(account:Account):Observable<Account>{
  return this.http.post<Account>(this.createSavingsUrl, account, this.httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError<Account>('addSavingsAccount')));
}


/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
