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
        favoritepage: resolve(__dirname, "src/favorite_page/index.html")
      },
    },
  },
});
