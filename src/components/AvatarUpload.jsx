import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUpdateAvatarMutation } from "../features/profile/profileApi";

const AvatarUpload = ({ userId, onClose }) => {
  const [updateAvatar, { isLoading, isError, error }] =
    useUpdateAvatarMutation();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    const { error: uploadError } = updateAvatar({
      userId,
      file,
      filePath,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Update Your Avatar</h3>
        <input
          type="file"
          accept="image/*"
          disabled={isLoading}
          onChange={handleFileChange}
          className="text-blue-600 cursor-pointer"
        />
        {isLoading && <div className="mt-2 text-blue-300">Uploading...</div>}
        {error && <div className="mt-2 text-red-400">{error}</div>}
        <button
          onClick={onClose}
          className="mt-4 text-blue-400 hover:underline"
          disabled={isLoading}
          className={`cursor-pointer text-red-600`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;
