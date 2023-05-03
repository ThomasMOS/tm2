import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  taskForm!: FormGroup;
  // task!: Task;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const newTask: Task = this.taskForm.value;
    console.log(newTask)
    this.taskService.addTask(newTask)
      .subscribe((res) => {
        this.router.navigateByUrl('main/home');
      });
  }
}
