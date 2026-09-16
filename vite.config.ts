import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

/**
 * Ruta base del build de producción.
 *
 * En GitHub Pages el sitio vive bajo `/<nombre-del-repositorio>/`, así que el
 * `base` tiene que coincidir con ese nombre. Se toma de `GITHUB_REPOSITORY`,
 * que Actions define solo durante el despliegue, para que renombrar el
 * repositorio no vuelva a romper la página: con el nombre viejo escrito a mano,
 * el navegador pide los assets a una ruta que ya no existe, recibe 404 y la
 * página queda en blanco sin ningún error visible.
 *
 * El valor de reserva es para compilar en local, donde esa variable no existe.
 */
const REPO_BASE = `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'flora-del-atlantico'}/`;

export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
}));
