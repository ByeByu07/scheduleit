import React from 'react';
import { Dialog } from '@headlessui/react';
import { Youtube, Instagram, Twitch, Twitter } from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const platforms = [
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { name: 'Twitch', icon: Twitch, color: 'bg-purple-500' },
    { name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-2xl font-bold text-gray-800 mb-6">
            Connect Your Accounts
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                className={`${platform.color} text-white p-4 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity`}
              >
                <platform.icon className="w-5 h-5" />
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
