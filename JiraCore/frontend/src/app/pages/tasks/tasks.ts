import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent implements OnInit {

  tasks: any;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks().subscribe(data => {
      this.tasks = data;

    });
  }
}
