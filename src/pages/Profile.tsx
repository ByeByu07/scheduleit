import React from 'react';
import { User, MailPlus, Lock, Calendar, HardDrive, Mail, ChevronLeft, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';

const MAX_STORAGE_MB = 1000;

export default function ProfilePage() {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const usedStorage = 40.0; // This should be calculated from actual video sizes

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900 active:text-gray-700 touch-manipulation"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>
      <Navbar 
        title="Profile"
        icon={<User className="w-8 h-8 mr-2 text-blue-500" />}
        onConnectClick={() => {}}
      />

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-blue-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Email Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <button 
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2" 
              title="Change Email"
            >
              <MailPlus className="w-4 h-4 text-gray-600" />
              {/* <span>Change</span> */}
            </button>
          </div>

          {/* Storage Usage */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <HardDrive className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Storage Used</p>
                <p className="font-medium">{usedStorage} MB / {MAX_STORAGE_MB} MB</p>
              </div>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${(usedStorage / MAX_STORAGE_MB) * 100}%` }}
              />
            </div>
          </div>

          {/* Scheduled Videos */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-blue-500 mr-3" />
              <h3 className="font-medium">Upcoming Scheduled Videos</h3>
            </div>
            <div className="space-y-2">
              {/* Replace with actual scheduled videos */}
              <p className="text-sm text-gray-500">No videos scheduled</p>
            </div>
          </div>

          {/* Subscription Type */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Crown className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Subscription Type</p>
                <p className="font-medium">Free Plan</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 touch-manipulation">
              Upgrade Plan
            </button>
          </div>

          {/* Password Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-medium">••••••••</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
