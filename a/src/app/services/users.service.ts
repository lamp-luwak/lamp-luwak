import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Object[]> {
    const url = `${environment.serverUrl}/users`;
    return this.http.get<Object[]>(url);
  }

  getUser(id): Observable<Object> {
    const url = `${environment.serverUrl}/user/${id}`;
    return this.http.get(url);
  }

  updateUserAdditionalInfo(id, diff): Observable<Object> {
    const url = `${environment.serverUrl}/user/${id}/additional-info`;
    return this.http.post(url, diff);
  }

}
