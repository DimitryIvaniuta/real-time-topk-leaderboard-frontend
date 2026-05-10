import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration tuned for a banking-style SPA that talks to the local backend.
 * The development proxy avoids browser CORS problems without weakening backend CORS policy.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_API_BASE_URL ?? 'http://localhost:8080';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/actuator': {
          target: backendUrl,
          changeOrigin: true
        }
      }
    },
    preview: {
      port: 4173,
      strictPort: true
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      chunkSizeWarningLimit: 750
    }
  };
});
