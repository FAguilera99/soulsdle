// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import nodePolyfills from "rollup-plugin-node-polyfills";
import path from "path-browserify";

export default defineConfig({
    resolve: {
        alias: {
          path: "path-browserify",
        },
      },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "game.html"),
      },
      plugins: [nodePolyfills],
    },
  },
});
