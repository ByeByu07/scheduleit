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
      description: "Effortlessly plan and organize your video content with our intuitive calendar interface",
      illustration: "https://illustrations.popsy.co/amber/calendar.svg"
    },
    {
      icon: <FiLock className="w-16 h-16 text-blue-500" />,
      title: "Secure Storage",
      description: "Your content is safely stored with enterprise-grade encryption and backup",
      illustration: "https://illustrations.popsy.co/amber/security.svg"
    },
    {
      icon: <FiUserPlus className="w-16 h-16 text-blue-500" />,
      title: "Collaboration",
      description: "Work together with your team in real-time, share content, and manage permissions",
      illustration: "https://illustrations.popsy.co/amber/team.svg"
    }
  ];

  const handleNext = () => {
    if (currentStep < features.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex items-center justify-center">
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

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {activeTab === 'login' ? 'Welcome back!' : 'Join our community'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'login' 
                  ? 'Sign in to access your scheduled content and continue your journey'
                  : 'Create an account to start organizing your video content effectively'}
              </p>
            </div>

            <button
              type="button"
              onClick={onLoginClick}
              className="w-full flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FcGoogle className="w-6 h-6 mr-3" />
              <span className="text-gray-700 font-medium">
                {activeTab === 'login' ? 'Continue with Google' : 'Sign up with Google'}
              </span>
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>
                {activeTab === 'login' 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button 
                  onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {activeTab === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default GetStarted;
