import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2700); // A bit shorter than the timeout in App.tsx to allow for fade-out
      return () => clearTimeout(timer);
    } else {
        setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
