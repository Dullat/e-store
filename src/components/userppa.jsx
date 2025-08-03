import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import AvatarUpload from '../components/AvatarUpload';

const UserPage = () => {
  const { user, userProfile, updateAvatarUrl } = useContext(AuthContext);
  const [updateMode, setUpdateMode] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  if (!user) return 'Loading...';

  return (
    <div className="max-w-[800px] m-auto p-4">
      <div className="flex flex-col gap-4 mb-4 text-sm sm:text-base p-1">
        <div className="flex gap-2 opacity-60">User ID : <p>{user.id}</p></div>
        <div className="flex gap-2 opacity-60">User email : <p>{user.email}</p></div>
        <div className="flex gap-2 opacity-60">Last log-in : <p>{user.last_sign_in_at}</p></div>
        <div className="flex gap-2 opacity-60">Email Auth ? <p className='bg-gray-700 rounded px-2'>{user.role}</p></div>
      </div>
      <div className="bg-zinc-900 rounded py-6">
        <div className="flex flex-col items-center">
          <div className="flex h-40 aspect-square bg-gray-600 rounded-full overflow-hidden">
            <img
              src={userProfile?.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="h-full w-full object-cover cursor-pointer"
              onClick={() => setShowAvatarModal(true)}
            />
          </div>
          <p className="mt-2 text-xs text-gray-400">Click avatar to change</p>
        </div>
        <p className="text-center py-8 text-2xl font-bold">
          {userProfile?.user_name ?? 'Not set yet'}
        </p>
        {/* ...other profile update logic */}
      </div>
      {showAvatarModal && (
        <AvatarUpload
          userId={user.id}
          onUpload={updateAvatarUrl}  // This will update DB & call AuthProvider refetch
          onClose={() => setShowAvatarModal(false)}
        />
      )}
    </div>
  );
};

export default UserPage;
