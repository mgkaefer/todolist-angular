import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { TaskService } from "../task.service";

interface Task {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  tasks: Task[] = []; // Add a tasks array to store the tasks
  newTask: string = "";
  editingTaskId: number | null = null;
  editingTaskName: string = "";
  filter: string = "All"; // Declare and initialize the filter property

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    // Inject MatDialog
    this.tasks$ = this.taskService.filteredTasks$;
  }

  ngOnInit(): void {
    this.taskService.setFilter(this.filter); // Set the default filter
    this.tasks$.subscribe((tasks) => (this.tasks = tasks)); // Subscribe to the tasks observable
  }

  addTask(): void {
    if (this.newTask.trim()) {
      this.taskService.addTask(this.newTask);
      this.newTask = "";
      this.taskService.setFilter(this.filter); // Refresh the tasks list
    } else {
      alert("Task can't be empty");
    }
  }

  toggleTask(taskId: number): void {
    this.taskService.toggleTask(taskId);
  }

  editTask(taskId: number, name: string): void {
    this.editingTaskId = taskId;
    this.editingTaskName = name;
  }

  saveTask(taskId: number): void {
    this.taskService.editTask(taskId, this.editingTaskName);
    this.editingTaskId = null;
    this.editingTaskName = "";
  }

  removeTask(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {taskId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.removeTask(taskId);
      }
    });
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.taskService.setFilter(filter); // Update the filter in the service
  }
}
