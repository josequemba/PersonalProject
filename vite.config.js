import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipes: resolve(__dirname, "src/recipes_pages/index.html"),
        favorite_page: resolve(__dirname, "src/favorite_page/index.html"),
        add_page: resolve(__dirname, "src/add_page/index.html"),
      },
    },
  },
});
