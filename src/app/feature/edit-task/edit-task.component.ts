import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task!: Task;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  initializeForm() {
    this.taskForm = this.formBuilder.group({
      name: [this.task?.name, Validators.required],
      date: [this.task?.date, Validators.required],
      description: [this.task?.description, Validators.required],
      status: [this.task?.status, Validators.required],
    });
  }

  setTaskDetails(details: any) {
    console.log(details);
    this.taskForm.patchValue({
      name: details.name,
      date: details.date,
      description: details.description,
      status: details.status,
    });
    
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId).subscribe((res) => {
      console.log(res);
      this.task = res;
      this.setTaskDetails(this.task);
    });

    this.initializeForm();
  }

  updateTask(): void {
    const updatedTask = this.taskForm.value as Task;
    updatedTask.id = this.task.id;
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.snackBar.open('Task updated', 'Close', {
        duration: 3000,
      });
      this.goBack();
    });
  }

  goBack(): void {
    this.router.navigate(['/main/home']);
  }
}
