import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Landing from './pages/Landing';
import ProtectedRoute from './routes/ProtectedRoute';
import Register from './pages/Register';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Category from './pages/Category';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Not Found</div>} />
      <Route path="incomes" element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        } />
      <Route path="expenses" element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        } />
      <Route path="categories" element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        } />
      {/* <Route path="expense" element={<Expense />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
