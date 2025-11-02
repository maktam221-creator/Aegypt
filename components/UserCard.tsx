
import React from 'react';
import { Profile } from '../types';

interface UserCardProps {
  userProfile: Profile & { id: string };
  onSelectUser: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ userProfile, onSelectUser }) => {
  return (
    <button 
      onClick={() => onSelectUser(userProfile.id)}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full text-right transition-shadow hover:shadow-md flex items-center group"
    >
        <img
          src={userProfile.avatarUrl}
          alt={userProfile.username}
          className="w-14 h-14 rounded-full object-cover mr-4 ml-0"
        />
        <div>
          <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{userProfile.username}</p>
          <p className="text-sm text-gray-500">@{userProfile.id.substring(0, 12)}...</p>
        </div>
    </button>
  );
};

export default UserCard;
