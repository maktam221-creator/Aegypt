import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import { ArrowRightIcon } from './Icons';

interface ProfilePageProps {
  userId: string;
  posts: Post[];
  onSelectUser: (userId: string) => void;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, posts, onSelectUser, onBack }) => {
  const userPosts = posts.filter(p => p.userId === userId);
  const user = userPosts.length > 0 ? userPosts[0] : posts.find(p => p.userId === userId);

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">لم يتم العثور على المستخدم.</p>
        <button onClick={onBack} className="text-blue-600 hover:underline mt-4 font-semibold">
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div>
        <div className="mb-6">
            <button onClick={onBack} className="inline-flex items-center text-blue-600 hover:underline font-semibold">
                <ArrowRightIcon className="w-5 h-5 ml-2" />
                <span>العودة</span>
            </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8 text-center">
            <img 
                src={user.avatarUrl.replace('/48', '/128')} // Get a larger image
                alt={user.username}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
            />
            <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
            <p className="text-gray-500 mt-1">@{user.userId}</p>
            <button className="mt-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                متابعة
            </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">المنشورات</h3>
        <div className="space-y-6">
            {userPosts.length > 0 ? (
                userPosts.map(post => (
                    <PostCard key={post.id} post={post} onSelectUser={onSelectUser} />
                ))
            ) : (
                <div className="text-center text-gray-500 py-10 bg-gray-100 rounded-lg">
                    <p>لا توجد منشورات من هذا المستخدم بعد.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ProfilePage;
