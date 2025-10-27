import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const useAuthUserId = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log("Can't get user form session");
        return;
      }
      setUserId(user.id);
    };
    fetchUserId();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
  return userId;
};

export default useAuthUserId;
