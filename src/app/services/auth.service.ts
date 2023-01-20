import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  access_token: string;
  data: any;
  name: string;
  status: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API path
  basePath = environment.Apiurl;
  private concurentUserSubject!: BehaviorSubject<object>;
  public currentUser!: Observable<object>;

  constructor(private router: Router, private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Handle errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Verify user credentials on server to get token
  loginForm(data: any): Observable<any> {
    return this.http
      .post<any>(this.basePath + 'connexion/login.php', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: any) {
    localStorage.setItem('name', resp.name);
    localStorage.setItem('access_token', resp.access_token);
   // window.location.href = '/admin/dashboard';
   // this.router.navigate(['/admin/dashboard']);
  }

  // Checking if token is set
  isLoggedIn() {
    // alert(localStorage.getItem('access_token'))
    return localStorage.getItem('access_token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  // Get data from server for Dashboard
  getData(data: any): Observable<any> {
    return this.http
      .post<any>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  login(info: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'accept':  'text/plain',
        'Content-Type': 'application/json',
        // 'Authorization':  'Bearer {{access_token}}'
      }),
    };

    return this.http
      .post<any>(this.basePath + 'connexion/login.php', info)
      .pipe(
        map((user) => {
          if (user && user.results.jwt) {
            //alert(user.results.jwt);
            // this.router.navigate(['/dashboard']);
            localStorage.setItem('currentUser', JSON.stringify(user.results));
            localStorage.setItem('UserID', user.results.Id_Utilisateur);
            localStorage.setItem(
              'Util_PremiereCnx',
              JSON.stringify(user.results.Util_PremiereCnx)
            );
            localStorage.setItem('Util_Email', user.results.Util_Email);
            localStorage.setItem('prof_id', user.results.prof_id);
            localStorage.setItem('access_token', user.results.jwt);
            localStorage.setItem('user_heb_ville', user.results.user_heb_ville);
            localStorage.setItem('user_heb_designation', user.results.user_heb_designation);
            localStorage.setItem('user_heb_commissariat', user.results.user_heb_commissariat);
            localStorage.setItem('user_heb_id', user.results.user_heb_id);

            /*this.concurentUserSubject.next(user.results);  */
            // this.isLoggedIn();
          }
          return user;
        })
      );
  }

  public get currentUserValue(): object {
    return this.concurentUserSubject.value;
  }
}
