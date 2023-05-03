import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl  = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTasks(): Observable<Task[]> {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser.id)
    const userId = currentUser.id;
    return this.http.get<Task[]>(`${this.baseUrl}?userId=${userId}`);
  }

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.baseUrl);
  // }

  getTaskById(id: any): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    console.log(task)
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser.id)
    const userId = currentUser.id;

    const newTask = { ...task, userId };
console.log(newTask)
    return this.http.post<Task>(this.baseUrl, newTask);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(id: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
