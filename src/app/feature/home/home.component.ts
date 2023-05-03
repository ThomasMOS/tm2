import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user!: any;
  tasks: Task[] = [];
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'task',
    'name',
    'date',
    'description',
    'status',
    'actions',
  ];

  dates: string[] = Array.from(new Set(this.tasks.map((task) => task.date)));

  constructor(private taskService: TaskService,  private authService : AuthService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log(tasks)
      this.tasks = tasks;
      this.dataSource.data = this.tasks;
    });
  }

  add(){
    console.log('button clicked');
    this.router.navigate(['main/add/'])
  }

  profile(){
    console.log('profile clicked');
    this.router.navigate(['main/profile'])
  }
  edit(id: string) {
    console.log(id);
    this.router.navigate(['main/edit/', id]);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.dataSource.data = this.tasks;
    });
  }

  applyFilter(filterValue: string, columnName: string) {
    if (columnName === 'date') {
      this.dataSource.filterPredicate = (data: Task, filter: string) =>
        data.date === filter;
    } else if (columnName === 'status') {
      this.dataSource.filterPredicate = (data: Task, filter: string) =>
        data.status === filter;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('');

  }
}
