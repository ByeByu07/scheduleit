import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Capacitor } from '@capacitor/core';
import { AuthProvider } from './context/auth-context.tsx';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Platform-specific configurations
const webOrigin = window.location.origin;
const capacitorOrigin = 'capacitor://localhost';

const getNavigateFunction = () => {
  if (Capacitor.isNativePlatform()) {
    return (to: string) => {
      // Handle capacitor navigation
      const newTo = to.startsWith('/') 
        ? `${capacitorOrigin}${to}`
        : to.replace('http://', 'capacitor://').replace('https://', 'capacitor://');
      window.location.href = newTo;
    };
  }
  return (to: string) => {
    window.location.href = to;
  };
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: undefined,
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          helpPageUrl: "https://clerk.com/support",
          logoPlacement: "inside",
          logoImageUrl: "",
        },
      }}
      navigate={getNavigateFunction()}
      allowedRedirectOrigins={[
        'capacitor://localhost/*',
        'http://localhost:5173/*',
        'http://localhost/*',
        'https://*/*',
        capacitorOrigin + '/*',
        webOrigin + '/*'
      ]}
    >
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);