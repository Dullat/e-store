import React, { useEffect } from 'react'
import { createContext } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext()

const AuthProvider = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

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
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider