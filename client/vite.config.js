// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure this is imported
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  plugins: [react(), tailwindcss()], // And included in the plugins array
});