# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build and Running the app

To run the app, the following Node and NPM version were used while in development:

```
Node.js: v22.6.0
NPM: 10.8.2
```

To build the app for production, in terminal of the root directory we will just use the following command:

```
npm run build
```

After building, it will generate static files in the dist/ directory, to run the app on localhost, just run the following:

```
npm run preview
```

## Testing

Note: The app uses Shadcn/UI and the components are installed in the directory /common/ui

The tests are in the directory /**tests** and folder structure follow the same folder structure as the original components from /src

To run the tests, use the following command:

```
npm run test
```
