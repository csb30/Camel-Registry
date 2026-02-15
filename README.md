# Camel Registry

A full-stack Camel Registry system designed to manage camel records efficiently.

## Project Overview

This project consists of two main components:

*   **Backend**: An ASP.NET Core Minimal API utilizing SQLite and Entity Framework Core for data persistence.
*   **Frontend**: An Angular 17+ single-page application built with Bootstrap and Reactive Forms for a responsive and interactive user interface.

## Prerequisites

Before getting started, ensure you have the following tools installed on your machine:

*   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

## Getting Started

Follow these steps to set up and run the application locally.

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd CamelRegistry
    ```

2.  Restore dependencies and run the application:
    ```bash
    dotnet run
    ```
    *   **Note**: The SQLite database will be automatically created on startup if it does not exist.

3.  Access the API documentation via Swagger UI:
    *   [http://localhost:5020/swagger](http://localhost:5020/swagger)

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd camel-frontend
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    ng serve
    ```

4.  Open your browser and navigate to the application:
    *   [http://localhost:4200](http://localhost:4200)

## Features

### API (Backend)
The backend provides 5 standard CRUD endpoints for managing camel records:

*   `GET /api/camels`: Retrieve a list of all camels.
*   `GET /api/camels/{id}`: Retrieve details of a specific camel by ID.
*   `POST /api/camels`: Create a new camel record.
*   `PUT /api/camels/{id}`: Update an existing camel record.
*   `DELETE /api/camels/{id}`: Delete a camel record.

### UI (Frontend)
The frontend offers a user-friendly interface for interacting with the registry:

*   **Camel List**: Displays a list of all camels with options to edit each entry.
*   **Camel Form**: A reactive form for creating and editing camel records.
    *   **Validation**:
        *   Name: Required, minimum 2 characters.
        *   Hump Count: Required, must be 1 or 2.
    *   **Feedback**: Visual indicators and error messages highlight invalid fields.

## Testing

To ensure the reliability of the application, unit tests are available for both the backend and frontend.

### Backend Tests
Run the backend unit tests using the .NET CLI:
```bash
dotnet test
```

### Frontend Tests
Run the frontend unit tests using the Angular CLI:
```bash
ng test
```
