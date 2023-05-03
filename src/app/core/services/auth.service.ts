import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, config, map, catchError, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, {name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser)
    if (currentUser) {
      console.log(currentUser)
      return JSON.parse(currentUser);
    } else {
      console.log('no user')
      return null;
    }
  }

  updateUser(name: string, email: string) {
    let user = this.getCurrentUser()
    console.log(user?.id)
    let id = user?.id
    const body = { name, email };
    return this.http.put(`${this.apiUrl}/users/${id}`, body);
  }


}
