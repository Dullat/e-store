import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { supabase } from '../lib/supabaseClient'
import AvatarUpload from '../components/AvatarUpload'
import { Link } from 'react-router-dom'

const UserPage = () => {
  const { user, userProfile, updateAvatarUrl, signOut } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  const [updatingAvatar, setUpdatingAvatar] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userProfile === null) {
      console.log('its null')
      const { data, error } = await supabase.from('profiles').insert([{ id: user.id, user_name: userName }]).select()
      console.log(data);
    }

    if (userProfile?.user_name) {
      console.log('updating........')
      const { data, error } = await supabase.from('profiles').update({ user_name: userName }).eq('id', userProfile.id).select()
      if (!error) {
        setUpdateMode(false)
      }
    }
  }

  const updateAvatar = () => {
    setUpdatingAvatar(true)
  }

  if (!user) return (
    <div className="grid place-content-center w-full">
      <div className="mt-20 flex flex-col gap-6">
        <p>Bruh you need to log-in...</p>
        <Link to="/login" className='w-full bg-blue-600 hover:bg-blue-700 text-white  text-center font-semibold py-2 px-4 rounded-md transition-all duration-150'>Click me Bruhh..</Link>
      </div>
    </div>
  )
  return (
    <div className='max-w-[800px] m-auto p-1'>
      <div className="flex flex-col gap-4 mb-4 text-sm sm:text-base p-1">
        <div className="flex gap-2 opacity-60">User ID : <p>{user.id}</p></div>
        <div className="flex gap-2 opacity-60">User email : <p>{user.email}</p></div>
        <div className="flex gap-2 opacity-60">Last log-in : <p>{user.last_sign_in_at}</p></div>
        <div className="flex gap-2 opacity-60">Email Auth ? <p className='bg-gray-700 rounded px-2'>{user.role}</p></div>
        <div className="flex gap-2 opacity-60">V_Coins : <p className='bg-gray-700 rounded px-2'>${userProfile?.v_coins ?? 'Set Profile First'}</p></div>
      </div>
      <div className="bg-zinc-900 rounded py-6">
        <div className="flex flex-col items-center">
          {/* <p>Details</p> */}
          <div className="flex h-40 aspect-square bg-gray-600 rounded-full overflow-hidden">
            <img src={userProfile?.avatar}
              alt="Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar Avatar"
              className='h-full w-full object-cover'
              onClick={updateAvatar} />
          </div>
        </div>
        {
          updateMode ? (
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
                  defaultValue={userProfile?.user_name}
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
            <p className='text-center py-8 text-2xl font-bold'>
              {userProfile?.user_name ?? 'Not set yet'}
            </p>
          )
        }

        <button onClick={() => setUpdateMode(prev => !prev)}
          className='text-blue-600 text-xs md:text-sm text-center w-full cursor-pointer'
        >{updateMode ? `Changed your mind? go back to normal mode` : `Wanna Change ur profile ?`}</button>
      </div>

      {
        updatingAvatar ? (
          <AvatarUpload userId={user.id} onUpload={updateAvatarUrl} onClose={setUpdatingAvatar} />
        ) : ''
      }

      <button onClick={signOut}
        className='text-red-600 text-xs md:text-sm text-center cursor-pointer mr-auto w-fit'
      >Log-out</button>
    </div>
  )
}

export default UserPage