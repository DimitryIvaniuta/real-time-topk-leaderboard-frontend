import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { App } from '@/App';
import { AppErrorBoundary } from '@/shared/components/AppErrorBoundary';
import '@/styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryProvider>
    </AppErrorBoundary>
  </StrictMode>
);
