import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent {
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId).subscribe((res) => {
      this.task = res;
    });
  }
}
