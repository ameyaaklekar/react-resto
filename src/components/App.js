import React from 'react'
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './navigation/Navigation';
import PermissionProvider from '../context/PermissionContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PermissionProvider>
          <Navigation />
        </PermissionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
