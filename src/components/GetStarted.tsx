import React, { useState } from 'react';
import { FiCalendar, FiLock, FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface GetStartedProps {
  onLoginClick: () => void;
}

const GetStarted = ({ onLoginClick }: GetStartedProps) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'login' | 'signup'>('welcome');

  const features = [
    {
      icon: <FiCalendar className="w-8 h-8 text-blue-500" />,
      title: "Smart Scheduling",
      description: "Effortlessly plan and organize your video content"
    },
    {
      icon: <FiLock className="w-8 h-8 text-blue-500" />,
      title: "Secure Storage",
      description: "Your content is safely stored and encrypted"
    },
    {
      icon: <FiUserPlus className="w-8 h-8 text-blue-500" />,
      title: "Collaboration",
      description: "Share and collaborate with your team seamlessly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      {activeTab === 'welcome' && (
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Schedule It</h1>
            <p className="text-gray-600">Your ultimate video content planning solution</p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('login')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      )}

      {(activeTab === 'login' || activeTab === 'signup') && (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'login' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'signup' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {activeTab === 'login' && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot Password?</a>
              </div>
            )}

            <button
              type="button"
              onClick={onLoginClick}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={onLoginClick}
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={onLoginClick}
              >
                <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
                Facebook
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
