// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       input: {
//         "@shared": path.resolve(__dirname, "src/shared"),
//       "@admin": path.resolve(__dirname, "src/adminside"),
//       "@customer": path.resolve(__dirname, "src/customerside"),
//       },
//       output: {
//         dir: "dist",
//         format: "es",
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@shared": path.resolve(__dirname, "src/shared"),
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@admin": path.resolve(__dirname, "src/adminside"),
      "@customer": path.resolve(__dirname, "src/customerside"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});
