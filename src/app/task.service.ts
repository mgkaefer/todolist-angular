import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

interface Task {
  id: number;
  name: string;
  done: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    this.loadTasks()
  );
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    "All"
  );

  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  get filteredTasks$(): Observable<Task[]> {
    return this.filterSubject.pipe(
      map((filter) => {
        if (filter === "Completed") {
          return this.tasksSubject.value.filter((task) => task.done);
        } else if (filter === "Incomplete") {
          return this.tasksSubject.value.filter((task) => !task.done);
        }
        return this.tasksSubject.value;
      })
    );
  }

  private loadTasks(): Task[] {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTask(name: string): void {
    const newTask: Task = {id: Date.now(), name, done: false};
    const updatedTasks = [...this.tasksSubject.value, newTask];
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  toggleTask(taskId: number): void {
    const updatedTasks = this.tasksSubject.value.map((task) =>
      task.id === taskId ? {...task, done: !task.done} : task
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
    this.filterSubject.next(this.filterSubject.value); // Emit the current filter value to refresh the filtered tasks
  }

  editTask(taskId: number, name: string): void {
    const updatedTasks = this.tasksSubject.value.map((task) =>
      task.id === taskId ? {...task, name} : task
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
  }

  removeTask(taskId: number): void {
    const updatedTasks = this.tasksSubject.value.filter(
      (task) => task.id !== taskId
    );
    this.tasksSubject.next(updatedTasks);
    this.saveTasks(updatedTasks);
    this.filterSubject.next(this.filterSubject.value); // Emit the current filter value to refresh the filtered tasks
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }
}
