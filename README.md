# Minimal Todo List Application

This is a minimal todo list application built with Angular 10, RxJS, and Angular Material. The application allows users to manage their tasks, filter them based on completion status, and persist them in the browser's local storage. A confirmation dialog is also provided before deleting tasks to prevent accidental deletions.

## Features

- Add, edit, toggle, and delete tasks.
- Filter tasks by "All", "Completed", or "Incomplete".
- Persist tasks in the browser's local storage.
- Confirmation dialog before deleting tasks.
- Styled with Tailwind CSS and Angular Material.

## Installation and Running Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12.x or higher recommended)
- [Angular CLI](https://angular.io/cli) (version 10.x or higher)

### Clone the Repository

```bash
git clone https://github.com/your-username/minimal-todo-list.git
cd minimal-todo-list
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
ng serve
```

Open your browser and navigate to http://localhost:4200/ to see the application in action.

### Project Structure

```
minimal-todo-list/
├── src/
│   ├── app/
│   │   ├── task-list/
│   │   │   ├── task-list.component.ts
│   │   │   ├── task-list.component.html
│   │   │   ├── task-list.component.css
│   │   ├── confirm-dialog/
│   │   │   ├── confirm-dialog.component.ts
│   │   │   ├── confirm-dialog.component.html
│   │   │   ├── confirm-dialog.component.css
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.module.ts
│   │   ├── task.service.ts
│   ├── assets/
│   ├── environments/
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
├── angular.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── karma.conf.js
```
