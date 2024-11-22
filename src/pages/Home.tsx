import { useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Calendar as CalendarIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import ConnectModal from '../components/ConnectModal';
import UploadModal from '../components/UploadModal';
import BottomNav from '../components/BottomNav';
import { useAuthContext } from '../context/auth-context';
import React from 'react';

const MAX_STORAGE_MB = 1000;

export default function HomePage() {
  const { user } = useAuthContext();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Sample Event 1',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 0),
    },
    {
      id: 'event-2',
      title: 'Sample Event 2',
      start: new Date(2024, 2, 20, 14, 0),
      end: new Date(2024, 2, 20, 15, 0),
    }
  ]);

  const handleDateSelect = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setIsUploadModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-4 sm:px-4 sm:py-8">
      <Navbar 
        title={`Welcome, ${user?.firstName || 'User'}`}
        icon={<CalendarIcon className="w-8 h-8 mr-2 text-blue-500" />}
      />

      <div className="grid grid-cols-1 gap-8">
        <div className="w-full">
          <Calendar
            events={events}
            onSelectSlot={handleDateSelect}
            selectable={true}
          />
        </div>
        <p className='text-white'>hah</p>
      </div>

      <ConnectModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        selectedDate={selectedDate}
      />
      <BottomNav onUploadClick={() => setIsUploadModalOpen(true)} />
    </div>
  );
}
