import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AvatarUpload from "../components/AvatarUpload";
import { Link } from "react-router-dom";
import { selectProfile } from "../features/profile/profileSlice";
import { useSelector } from "react-redux";
import {
  useUpdateUserNameMutation,
  useGetProfileQuery,
  useSignOutMutation,
} from "../features/profile/profileApi";
import useAuthUserId from "../hooks/useAuthUserId";

const UserPage = () => {
  const userId = useAuthUserId();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetProfileQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });
  const [userName, setUserName] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [updateUserName, { isLoading, isError, isSuccess, error }] =
    useUpdateUserNameMutation();

  const updateAvatar = () => {
    setUpdatingAvatar(true);
  };

  const [signOut] = useSignOutMutation();

  const onClose = () => {
    setUpdatingAvatar(false);
    setUpdateMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUserName({ userName }).unwrap();
      setUpdateMode(false);
    } catch (error) {
      setUpdateMode(false);
      console.log(error);
    }
  };

  console.log(profile, userId);

  if (!profile || !userId)
    return (
      <div className="grid place-content-center w-full">
        <div className="mt-20 flex flex-col gap-6">
          <p>Bruh you need to log-in...</p>
          <Link
            to="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white  text-center font-semibold py-2 px-4 rounded-md transition-all duration-150"
          >
            Click me Bruhh..
          </Link>
        </div>
      </div>
    );
  return (
    <div className="max-w-[800px] m-auto p-1">
      <div className="bg-zinc-900 rounded py-6">
        <div className="flex flex-col items-center">
          {/* <p>Details</p> */}
          <div className="flex h-40 aspect-square bg-gray-600 rounded-full overflow-hidden">
            <img
              src={profile?.avatar}
              alt="Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar"
              className="h-full w-full object-cover"
              onClick={updateAvatar}
            />
          </div>
        </div>
        {updateMode ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 rounded-lg shadow-lg space-y-6 text-white"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                User Name
              </label>
              <input
                type="text"
                defaultValue={profile?.user_name}
                placeholder="Give a name"
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-150"
            >
              Update
            </button>
          </form>
        ) : (
          <div className="py-8 flex flex-col">
            <div className="flex gap-2 items-center m-auto">
              <p className="text-center  text-2xl font-bold">
                {profile?.user_name ?? "Not set yet"}
              </p>
              <p className="text-center bg-gray-700 rounded px-2 w-fit text-sm opacity-70">
                ${profile?.v_coins}
              </p>
            </div>
            <p className="text-center bg-gray-700 rounded px-2 w-fit m-auto text-sm opacity-70">
              {profile?.email ?? "example@mail.com"}
            </p>
          </div>
        )}

        <div className="flex flex-col align-center">
          <button
            onClick={() => setUpdateMode((prev) => !prev)}
            className="text-blue-600 text-xs md:text-sm text-center w-full cursor-pointer"
          >
            {updateMode
              ? `Changed your mind? go back to normal mode`
              : `Wanna Change ur profile ?`}
          </button>
          <button
            onClick={signOut}
            className="text-red-600 opacity-70 text-xs md:text-sm text-center cursor-pointer m-auto w-fit"
          >
            or want to log-out ?
          </button>
        </div>
      </div>

      {updatingAvatar ? (
        <AvatarUpload userId={profile.id} onClose={onClose} />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserPage;
