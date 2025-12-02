import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SuspenseWrapper from './SuspenseWrapper';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes';

interface RouterProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

export const Router = ({ children }: RouterProps) => {
  return (
   
      <QueryClientProvider client={queryClient}>
        <SuspenseWrapper>
          {children}
          <RouterProvider router={router} />
        </SuspenseWrapper>
      </QueryClientProvider>
   
  );
};
