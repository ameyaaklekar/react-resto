import React from 'react'
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './navigation/Navigation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </Router>
  );
}

export default App;
