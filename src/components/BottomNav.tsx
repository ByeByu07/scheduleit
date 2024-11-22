import { Home, Upload, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react'

interface BottomNavProps {
  onUploadClick: () => void;
}

export default function BottomNav({ onUploadClick }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-4 md:hidden safe-area-bottom">
      <Link to="/" className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-500">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <button 
        onClick={onUploadClick}
        className="flex flex-col items-center justify-center -mt-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
      >
        <Upload className="w-6 h-6" />
        <span className="text-xs mt-1">Upload</span>
      </button>
      
      <Link to="/videos" className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-500">
        <List className="w-6 h-6" />
        <span className="text-xs mt-1">Videos</span>
      </Link>
    </div>
  );
}
