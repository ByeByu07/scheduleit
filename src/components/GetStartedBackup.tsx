import React, { useState } from 'react';
import { FiCalendar, FiLock, FiUserPlus, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface GetStartedProps {
  onLoginClick: () => void;
}

const GetStarted = ({ onLoginClick }: GetStartedProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const features = [
    {
      icon: <FiCalendar className="w-16 h-16 text-blue-500" />,
      title: "Smart Scheduling",
      description: "Effortlessly plan and organize your video content",
      illustration: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23EBF4FF'/%3E%3Ccircle cx='50' cy='50' r='30' fill='%234299E1'/%3E%3C/svg%3E"
    },
    {
      icon: <FiLock className="w-16 h-16 text-blue-500" />,
      title: "Secure Storage",
      description: "Your content is safely stored and encrypted",
      illustration: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23E6FFFA'/%3E%3Cpolygon points='50,20 80,80 20,80' fill='%2338B2AC'/%3E%3C/svg%3E"
    },
    {
      icon: <FiUserPlus className="w-16 h-16 text-blue-500" />,
      title: "Collaboration",
      description: "Share and collaborate with your team seamlessly",
      illustration: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFF5F5'/%3E%3Ccircle cx='50' cy='50' r='30' fill='%23F56565'/%3E%3C/svg%3E"
    }
  ];

  const handleNext = () => {
    if (currentStep < features.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <AnimatePresence mode="wait">
        {currentStep < features.length ? (
          <motion.div
            key={`feature-${currentStep}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Schedule It</h1>
              <p className="text-gray-600">Your ultimate video content planning solution</p>
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 text-sm text-gray-500">
                Step {currentStep + 1} of {features.length}
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-center space-y-6">
                  {features[currentStep].icon}
                  <img
                    src={features[currentStep].illustration}
                    alt={features[currentStep].title}
                    className="w-48 h-48 mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">{features[currentStep].title}</h3>
                  <p className="text-gray-600">{features[currentStep].description}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <FiArrowRight />
            </button>
          </motion.div>
        ) : (
        <motion.div
          key="auth-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Join Schedule It</h2>
            <p className="text-gray-600 mt-2">Start organizing your content today</p>
          </div>

          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 text-center rounded-md transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-white text-blue-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center rounded-md transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-white text-blue-500 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
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
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default GetStarted;
