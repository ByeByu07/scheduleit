import { useState, useRef, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Capacitor } from '@capacitor/core';
import VideosPage from './pages/Videos';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import React from 'react';
import GetStarted from './components/GetStarted';
import { Browser } from '@capacitor/browser';
import { App as CapApp } from '@capacitor/app';

const MAX_STORAGE_MB = 1000; // 1GB max storage

const SAMPLE_VIDEOS = [
  {
    id: '1',
    title: 'How to Make Perfect Coffee',
    thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
    duration: '5:23',
    size: 15.7,
  },
  {
    id: '2',
    title: 'Morning Routine 2024',
    thumbnail: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2',
    duration: '8:45',
    size: 24.3,
  },
];

function App() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [videos, setVideos] = useState(SAMPLE_VIDEOS);
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Sample Event 1',
      start: new Date(2024, 2, 15, 10, 0), // March 15, 2024 10:00 AM
      end: new Date(2024, 2, 15, 11, 0), // March 15, 2024 11:00 AM
    },
    {
      id: 'event-2', 
      title: 'Sample Event 2',
      start: new Date(2024, 2, 20, 14, 0), // March 20, 2024 2:00 PM
      end: new Date(2024, 2, 20, 15, 0), // March 20, 2024 3:00 PM
    }
  ]);

  const totalSize = videos.reduce((acc, video) => acc + video.size, 0);
  const storagePercentage = (totalSize / MAX_STORAGE_MB) * 100;

  const handleDragEnd = (event: DragEndEvent) => {
    // Debug logging for Capacitor
    if (Capacitor.isNativePlatform()) {
      // Console.log({
      //   message: 'Drag End Event:',
      //   event: JSON.stringify(event),
      //   active: event.active,
      //   over: event.over
      // });
    } else {
      console.log('Drag End Event:', event); // Regular browser console
    }
    
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const video = videos.find((v) => v.id === active.id);
      if (video && selectedDate) {
        const newEvent = {
          id: `event-${video.id}`,
          title: video.title,
          start: selectedDate,
          end: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour later
        };
        setEvents([...events, newEvent]);
      }
    }
  };

  const handleVideoUpload = (file: File) => {
    const fileSize = Number((file.size / (1024 * 1024)).toFixed(1));
    if (totalSize + fileSize > MAX_STORAGE_MB) {
      alert('Storage limit exceeded! Please delete some videos first.');
      return;
    }

    const newVideo = {
      id: `video-${videos.length + 1}`,
      title: file.name,
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      duration: '0:00',
      size: fileSize,
    };
    setVideos([...videos, newVideo]);
    setIsUploadModalOpen(false);
  };

  const handleVideoDelete = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    setEvents(events.filter(event => event.id !== `event-${id}`));
  };

  const handleVideoEdit = (id: string, newTitle: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, title: newTitle } : video
    ));
    setEvents(events.map(event => 
      event.id === `event-${id}` ? { ...event, title: newTitle } : event
    ));
  };

  const handleDateSelect = (slotInfo: { start: Date; end: Date }) => {
    console.log('Date Selected:', slotInfo);
    
    // Ensure we're working with valid date objects
    if (!(slotInfo.start instanceof Date) || isNaN(slotInfo.start.getTime())) {
      console.error('Invalid date object received');
      return;
    }
    
    setSelectedDate(slotInfo.start);
    setIsUploadModalOpen(true);
  };

  const { isLoading, isAuthenticated, loginWithRedirect, handleRedirectCallback } = useAuth0();
  
  useEffect(() => {
    console.log('Loading:', isLoading);
    console.log('Authenticated:', isAuthenticated);
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.startsWith(import.meta.env.VITE_URI_APP_MOBILE)) {
        if (
          url.includes("state") &&
          (url.includes("code") || url.includes("error"))
        ) {
          await handleRedirectCallback(url);
        }

        await Browser.close();
      }
    });
  }, [handleRedirectCallback]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/profile" element={<ProfilePage/>} />
              </Routes>
            ) : (
              <GetStarted 
                onLoginClick={() => loginWithRedirect({
                  async openUrl(url) {
                    await Browser.open({
                      url,
                      windowName: "_self"
                    });
                  }
                })}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
