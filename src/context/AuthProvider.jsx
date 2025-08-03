import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // fetch user on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener?.subscription?.unsubscribe();
  }, []);

  // fetch user profile from DB when user.id changes (on login, logout, or reload)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setUserProfile(null);
        return;
      }
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (error) {
        setUserProfile(null);
      } else {
        setUserProfile(data);
      }
    };
    fetchProfile();
  }, [user?.id]);

  // call after avatar uploaded to update in db and re-fetch profile data
  const updateAvatarUrl = async (avatarUrl) => {
    if (!user?.id) return;
    const { error } = await supabase.from('profiles').update({ avatar: avatarUrl }).eq('id', user.id);
    if (!error) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setUserProfile(data);
    }
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      signIn,
      signUp,
      signOut,
      updateAvatarUrl,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
