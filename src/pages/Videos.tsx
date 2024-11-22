import React, { useEffect, useRef, useState } from 'react';
import { List, HardDrive, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import ConfirmDialog from '../components/ConfirmDialog';
import BottomNav from '../components/BottomNav';
import UploadModal from '../components/UploadModal';
import ConnectModal from '../components/ConnectModal';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  size: number;
}

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

const VideosPage: React.FC<{}> = () => {
  const [videos, setVideos] = React.useState<Video[]>(SAMPLE_VIDEOS);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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

  const handleVideoUpload = (file: File) => {
    const fileSize = Number((file.size / (1024 * 1024)).toFixed(1));
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

  const handleDelete = (id: string) => {
    setVideoToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      setVideos(videos.filter(video => video.id !== videoToDelete));
      setVideoToDelete(null);
    }
  };

  const handleEdit = (id: string, newTitle: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, title: newTitle } : video
    ));
  };
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <Navbar 
          title="Schedule It"
          icon={<List className="w-8 h-8 mr-2 text-blue-500" />}
          onConnectClick={() => setIsConnectModalOpen(true)}
        />
        
        {/* Storage Usage Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <HardDrive className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium">Storage Usage</span>
            </div>
            <span className="text-sm text-gray-600">
              {(videos.reduce((acc, video) => acc + video.size, 0)).toFixed(1)} MB / {MAX_STORAGE_MB} MB
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, (videos.reduce((acc, video) => acc + video.size, 0) / MAX_STORAGE_MB) * 100)}%` 
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden group relative">
              <div className="aspect-[3/4] relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
                    <div className="flex flex-col mt-1">
                      <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                      <span className="text-xs text-gray-500">{video.size} MB</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConnectModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
      <BottomNav onUploadClick={() => setIsUploadModalOpen(true)} />
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleVideoUpload}
        selectedDate={null}
      />
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
      />
    </div>
  );
};

export default VideosPage;
