import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableNum: string = "1";
  tableNumChanged = new Subject<string>();

  constructor(private http: HttpClient) {
    this.tableNumChanged.next(this.tableNum);
   }

  editTableNum(num: string){
    this.tableNum = num;
    this.tableNumChanged.next(this.tableNum);
  }

  validateTableNum() {
    return this.http
      .get<string[]>(
        'http://localhost:3000/tables/names'
      ).pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          return throwError(errorMessage);
        })
      );
  }

  getTableDetails() {
    return this.http
      .get(
        'http://localhost:3000/tables?tableName=' + this.tableNum
      ).pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          return throwError(errorMessage);
        })
      );
  }
}
