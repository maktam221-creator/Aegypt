import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightOnRectangleIcon, HomeIcon, GlobeAltIcon, BellIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';
import { Notification } from '../types';
import NotificationsPanel from './NotificationsPanel';

interface HeaderProps {
  onGoHome: () => void;
  onGoToProfile: () => void;
  onLogout: () => void;
  myAvatarUrl: string;
  unreadCount: number;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllRead: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onGoHome, 
  onGoToProfile, 
  onLogout, 
  myAvatarUrl,
  unreadCount,
  notifications,
  onNotificationClick,
  onMarkAllRead
}) => {
  const { t, setLanguage, language } = useTranslations();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const languages = {
    en: 'English',
    ar: 'العربية',
    es: 'Español',
    fr: 'Français'
  };

  const handleSetLanguage = (lang: 'en' | 'ar' | 'es' | 'fr') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };
  
  const handleToggleNotifications = () => {
    setIsNotificationsPanelOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto max-w-5xl px-4 py-3 flex justify-between items-center gap-4">
        <button onClick={onGoHome} className="text-start flex-shrink-0">
          <h1 className="text-2xl font-bold text-blue-600">
            Aegypt
          </h1>
        </button>
        
        <div className="flex-grow"></div>

        <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse flex-shrink-0">
           <div className="relative" ref={langDropdownRef}>
            <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="text-gray-600 p-2 rounded-full"
                aria-label={t('changeLanguage')}
            >
                <GlobeAltIcon className="w-7 h-7" />
            </button>
            {isLangDropdownOpen && (
                <div className="absolute start-0 mt-2 w-36 bg-white rounded-md shadow-lg z-20 border border-gray-100">
                    {Object.entries(languages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => handleSetLanguage(code as 'en' | 'ar' | 'es' | 'fr')}
                            className={`block w-full text-start px-4 py-2 text-sm ${language === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
           </div>
           
           <button
              onClick={onGoHome}
              className="text-gray-600 p-2 rounded-full"
              aria-label={t('homeAria')}
          >
              <HomeIcon className="w-7 h-7" />
          </button>
          
          <div className="relative" ref={notificationsRef}>
             <button
                onClick={handleToggleNotifications}
                className="text-gray-600 p-2 rounded-full relative"
                aria-label={t('notifications')}
            >
                <BellIcon className="w-7 h-7" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 end-1 block w-4 h-4 text-[10px] leading-4 text-center text-white bg-red-500 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>
            {isNotificationsPanelOpen && (
                <NotificationsPanel 
                    notifications={notifications}
                    onNotificationClick={(n) => {
                        onNotificationClick(n);
                        setIsNotificationsPanelOpen(false);
                    }}
                    onMarkAllRead={onMarkAllRead}
                />
            )}
          </div>
           <button
              onClick={onGoToProfile}
              className="block rounded-full"
              aria-label={t('profileAria')}
          >
              <img src={myAvatarUrl} alt={t('profileAria')} className="w-10 h-10 rounded-full object-cover" />
          </button>
          <button
              onClick={onLogout}
              className="text-gray-600 p-2 rounded-full"
              aria-label={t('logoutAria')}
          >
              <ArrowRightOnRectangleIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;