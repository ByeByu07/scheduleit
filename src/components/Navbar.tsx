import { useRef, useEffect, useState } from 'react';
import { User, LogOut, Link as LinkLucide } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Browser } from '@capacitor/browser';

interface NavbarProps {
  title: string;
  icon: React.ReactNode;
  onConnectClick: () => void;
}

export default function Navbar({ title, icon, onConnectClick }: NavbarProps) {
  const { loginWithRedirect, logout } = useAuth0();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        {icon}
        {title}
      </h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
        >
          <User className="w-6 h-6" />
        </button>
        
        {isProfileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={() => {
                onConnectClick();
                setIsProfileDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
            >
              <LinkLucide className="w-4 h-4 mr-2" />
              Connect Accounts
            </button>
            <button
              onClick={() => {
                window.location.href = '/profile';
                setIsProfileDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </button>
              <button
                onClick={() => {
                  // Handle logout
                  logout({
                    logoutParams: {
                      returnTo: import.meta.env.VITE_URI_APP_MOBILE,
                    },
                    async openUrl(url) {
                       // Redirect using Capacitor's Browser plugin
                      await Browser.open({
                        url,
                        windowName: "_self"
                      });
                    }
                  });
                  setIsProfileDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
