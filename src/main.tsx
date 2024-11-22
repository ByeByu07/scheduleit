import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';
import { Capacitor } from '@capacitor/core';
import { AuthProvider } from './context/auth-context.tsx';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

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
      navigate={(to) => window.location.href = to}
      allowedRedirectOrigins={['capacitor://*', 'http://*', 'https://*']}
      >
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
