import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AvatarUpload = ({ userId, onUpload, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    // Get the public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    if (onUpload) {
      await onUpload(data.publicUrl); // Call the handler to update DB and refetch profile
    }

    setUploading(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Update Your Avatar</h3>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleFileChange}
          className="text-white"
        />
        {uploading && <div className="mt-2 text-blue-300">Uploading...</div>}
        {error && <div className="mt-2 text-red-400">{error}</div>}
        <button
          onClick={onClose}
          className="mt-4 text-blue-400 hover:underline"
          disabled={uploading}
        >Cancel</button>
      </div>
    </div>
  );
};

export default AvatarUpload;
