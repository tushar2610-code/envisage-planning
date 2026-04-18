import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from './components/Landing';
import AdminLayout from './components/admin/AdminLayout';
import AdminProjects from './components/admin/AdminProjects';
import MediaModal from './components/MediaModal';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MediaModal />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProjects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
