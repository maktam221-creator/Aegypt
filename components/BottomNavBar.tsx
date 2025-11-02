import React from 'react';
import { HomeIcon, PlusIcon, UserIcon, BellIcon } from './Icons';
import { useTranslations } from '../hooks/useTranslations';

interface BottomNavBarProps {
  currentView: 'home' | 'profile' | 'notifications';
  onGoHome: () => void;
  onNewPost: () => void;
  onGoToProfile: () => void;
  onGoToNotifications: () => void;
  unreadNotificationsCount: number;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  currentView,
  onGoHome, 
  onNewPost, 
  onGoToProfile,
  onGoToNotifications,
  unreadNotificationsCount,
}) => {
  const { t } = useTranslations();

  const navItems = [
    { view: 'home', label: t('home'), icon: HomeIcon, action: onGoHome },
    { view: 'notifications', label: t('notifications'), icon: BellIcon, action: onGoToNotifications, badgeCount: unreadNotificationsCount },
    { view: 'profile', label: t('myProfile'), icon: UserIcon, action: onGoToProfile },
  ];

  const navItemsBefore = navItems.slice(0, 1);
  const navItemsAfter = navItems.slice(1);

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        {navItemsBefore.map(item => (
            <NavItem key={item.view} {...item} currentView={currentView} />
        ))}

        <button
          onClick={onNewPost}
          className="flex items-center justify-center bg-blue-600 text-white rounded-full w-14 h-14 -mt-6 shadow-lg focus:outline-none"
          aria-label={t('newPostAria')}
        >
          <PlusIcon className="w-8 h-8" />
        </button>

        {navItemsAfter.map(item => (
            <NavItem key={item.view} {...item} currentView={currentView} />
        ))}
      </div>
    </nav>
  );
};

interface NavItemProps {
    view: string;
    label: string;
    icon: React.FC<{className?: string}>;
    action: () => void;
    currentView: string;
    badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ view, label, icon: Icon, action, currentView, badgeCount }) => {
    const isActive = view === currentView;
    return (
        <button
          onClick={action}
          className={`flex-1 flex flex-col items-center justify-center relative ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
          aria-label={label}
        >
          <Icon className="w-7 h-7" />
          <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>{label}</span>
          {badgeCount && badgeCount > 0 && (
            <span className="absolute top-0 end-1/2 translate-x-[22px] block w-4 h-4 text-[10px] leading-4 text-center text-white bg-red-500 rounded-full">
                {badgeCount}
            </span>
          )}
        </button>
    );
};

export default BottomNavBar;