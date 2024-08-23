/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        globals: true, // won't need to import describe, it and etc.
        environment: "jsdom",
        css: true,
        setupFiles: "./src/test/setup.ts",
    },
});
