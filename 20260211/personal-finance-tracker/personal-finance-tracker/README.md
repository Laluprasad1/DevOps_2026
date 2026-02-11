# PersonalFinanceTracker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend API

This project includes a Node.js + Express + MongoDB API in [api/](api/).

1. Copy the environment file and set your secrets:

```bash
copy api\.env.example api\.env
```

2. Install dependencies and start the API:

```bash
cd api
npm install
npm start
```

The API runs on `http://localhost:4000` and exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST /api/categories`
- `GET/POST /api/transactions`
- `GET/POST /api/budgets`
- `GET /api/reports/summary`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
