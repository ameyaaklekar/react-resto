import React from 'react'
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './navigation/Navigation';
import PermissionProvider from '../context/PermissionContext';
import SupplierProvider from '../context/SupplierContext';
import EmployeeProvider from '../context/EmployeeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PermissionProvider>
          <EmployeeProvider>
            <SupplierProvider>
              <Navigation />
            </SupplierProvider>
          </EmployeeProvider>
        </PermissionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
