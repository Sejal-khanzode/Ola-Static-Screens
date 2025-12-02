# Ola health portal

## 🔎 Technologies used:

- VITE with TypeScript
- React 19: [https://react.dev/blog/2024/12/05/react-19](https://react.dev/blog/2024/12/05/react-19)
- MUI: [https://mui.com/material-ui/all-components/](https://mui.com/material-ui/all-components/)
- Tanstack Query: [https://tanstack.com/query/latest/docs/framework/react/quick-start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- Axios: [https://axios-http.com/docs/instance](https://axios-http.com/docs/instance)
- Keycloak-js: [https://www.keycloak.org/securing-apps/javascript-adapter](https://www.keycloak.org/securing-apps/javascript-adapter)
- Redux Toolkit: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
- React router dom: [https://reactrouter.com/home](https://reactrouter.com/home)

## 💻 Setup and Local Development

To set up the project and run it locally, follow these steps:

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Run Locally:**

    ```bash
    npm run dev
    ```

3.  **To view on browser:**
    ```bash
    localhost:3000/<subdomain>
    ```

## Build Commands

Here are the commands to build the project for different environments:

### 🚀 Build for Development, QA, UAT and Production

```bash
npm run build:development

npm run build:qa

npm run build:uat

npm run build:production
```

## Folder Structure

Here's a brief overview of the main folders and files:

- `src/`: Contains the main application source code, organized into the following subdirectories:
  - `components/`: Reusable UI components.
    - `core/`: Core reusable components used throughout the application.
  - `context/`: React context providers and consumers.
  - `hooks/`: Custom React hooks.
  - `layouts/`: Application layout components.
  - `redux/`: Redux store, reducers, and actions.
  - `routes/`: Application routing configuration.
  - `service/`: API service calls and logic.
  - `theme.ts`: Centralized theme and style definitions.
- `public/`: Contains static assets that are served directly.
- `dist/`: Contains the build output.
- `node_modules/`: Contains project dependencies installed by npm.
- `package.json`: Manages project dependencies and scripts.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration files.
- `vite.config.ts`: Vite build configuration.
- `index.html`: The main HTML file.
- `.env*` files: Environment configuration files.

---

## 🔨 Debugging Tools

This project includes several debugging utilities to assist with development and testing.

### 🛂 Authentication Toggles

You can enable or disable the authentication mechanism globally from the browser console:

- `enableAuthInOlaHealth()`  
  Enables the standard authentication flow. Useful for testing login-protected routes.

- `disableAuthInOlaHealth()`  
  Disables the authentication flow and allows access to protected routes without logging in. Useful for developing static screens.

> 📍 **Location:**  
> [`src/contexts/AuthContext.tsx`](src/contexts/AuthContext.tsx)


### 🧪 DOM Element Manipulation via `data-testid`

This project exposes a global utility `window.F` that allows manipulation of form elements such as text fields, dropdowns, and calendars using their `data-testid` attributes.

#### ✅ Supported Methods:
```js
F["sample-test-id"].makeRequired();     // Make the element required
F["sample-test-id"].makeNotRequired();  // Remove required validation
F["sample-test-id"].focus();            // Focus the element
F["sample-test-id"].disable();          // Disable the element
F["sample-test-id"].setValue("Hello");  // Set the value of the element
```
> 📍 **Location:**  
> [`src/hooks/useTestFileControl.ts`](src/hooks/useTestFileControl.ts)